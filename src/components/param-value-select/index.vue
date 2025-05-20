<template>
  <a-cascader :value="echoCascadeValue" style="width: 100%" :options="options" placeholder="请选择" @change="onChange"></a-cascader>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'
import { multiOutputValues } from '@/utils/multi-output-component'
import { message } from 'ant-design-vue'

const props = withDefaults(
  defineProps<{
    paramItem: any
    needReturnValue?: boolean
  }>(),
  {
    paramItem: {},
    needReturnValue: true
  }
)

const emit = defineEmits(['onChange'])

const store = useDataStore()

const echoCascadeValue = computed(() => {
  if (props.paramItem.echoValues) {
    return props.paramItem.echoValues
  }

  //以下都是为了兼容老配置,新增的配置(例如页面变量)可以不用写
  let echoValues: any[] = []
  if (props.paramItem.param_value_type === 'T') {
    //组件
    //处理下多输出的组件
    let comp = store.componentConfigByUuid(props.paramItem.relevanceComponentUuid)
    if (comp && comp.isMultiOutputComponent) {
      if (props.paramItem.param_v_key) {
        echoValues = [DataSourceType.COMPONENT, props.paramItem.relevanceComponentUuid, props.paramItem.param_v_key]
      } else {
        echoValues = [DataSourceType.COMPONENT, props.paramItem.relevanceComponentUuid]
      }
    } else {
      echoValues = [DataSourceType.COMPONENT, props.paramItem.relevanceComponentUuid]
    }
    // Table 行选择配置回显
    if (props.paramItem.param_v_key === 'rowdata') {
    }
  } else if (props.paramItem.param_value_type === 'V') {
    //变量
    if (props.paramItem.type == 'customInterface') {
    } else {
      //页面入参
      echoValues = [DataSourceType.CUSTOM, props.paramItem.param_v_key]
    }
  } else if (props.paramItem.param_value_type === 'G') {
    echoValues = [DataSourceType.GLOBAL, props.paramItem.middle, props.paramItem.param_v_key]
  } else if (props.paramItem.param_value_type === 'F') {
    if (props.paramItem.middle && props.paramItem.middle.length > 0) {
      //有middle代表在分组中
      echoValues = [DataSourceType.FUNCTION, props.paramItem.type, props.paramItem.middle, props.paramItem.operateApiId, props.paramItem.param_v_key]
    } else {
      echoValues = [DataSourceType.FUNCTION, props.paramItem.type, props.paramItem.operateApiId, props.paramItem.param_v_key]
    }
  }
  return echoValues
})

const options = computed(() => {
  const optionsCustom = {
    type: DataSourceType.CUSTOM,
    label: '页面入参',
    value: DataSourceType.CUSTOM,
    children: []
  } as any
  const optionsVariable = {
    type: DataSourceType.VARIABLE,
    label: '页面变量',
    value: DataSourceType.VARIABLE,
    children: []
  } as any
  const optionsComponent = {
    type: DataSourceType.COMPONENT,
    label: '组件',
    value: DataSourceType.COMPONENT,
    children: []
  } as any
  const optionsGlobal = {
    type: DataSourceType.GLOBAL,
    label: '全局变量',
    value: DataSourceType.GLOBAL,
    children: []
  } as any
  const optionsFunction = {
    type: DataSourceType.FUNCTION,
    label: '函数脚本',
    value: DataSourceType.FUNCTION,
    children: [
      {
        value: 'function',
        label: '函数',
        children: []
      },
      {
        value: 'script',
        label: '脚本',
        children: []
      }
    ]
  } as any

  let options = [optionsCustom, optionsVariable, optionsComponent, optionsGlobal, optionsFunction]

  //页面入参
  if (store.isPageDesigner) {
    let pageParams = store.pageConfig.config.pageParamsList
    pageParams &&
      pageParams.forEach((param: any) => {
        optionsCustom.children.push({
          label: param.operateHrefPageParamName,
          value: param.operateHrefPageParamName
        })
      })
  } else {
    let pageParams = store.currentModalConfig.config.pageParamsList
    pageParams &&
      pageParams.forEach((param: any) => {
        optionsCustom.children.push({
          label: param.operateHrefPageParamName,
          value: param.operateHrefPageParamName
        })
      })
  }

  //页面变量
  let pageVariables = store.pageConfig.config.pageVariableList
  pageVariables &&
    pageVariables.forEach((param: any) => {
      optionsVariable.children.push({
        label: param.variableName,
        value: param.variableName
      })
    })

  //组件
  if (store.isPageDesigner) {
    store.allInputComponentList.forEach((componentItem: any) => {
      let childItem = {
        label: componentItem.options.commonConfigAssignName,
        value: componentItem.uuid,
        children: []
      } as any
      optionsComponent.children.push(childItem)
      //多输出组件
      childItem.children = multiOutputValues(componentItem)
    })
  } else {
    //弹窗里面,只允许选择本弹窗和父页面的组件
    let modalInputComps = store.currentInputComponentList
    modalInputComps.forEach((componentItem: any) => {
      let childItem = {
        label: componentItem.options.commonConfigAssignName,
        value: componentItem.uuid,
        children: []
      } as any
      optionsComponent.children.push(childItem)
      //多输出组件
      childItem.children = multiOutputValues(componentItem)
    })
  }

  //全局变量
  let globalList = store.globalVariableList
  globalList &&
    globalList.forEach((group: any) => {
      let groupOption = {
        type: DataSourceType.GLOBAL,
        label: group.scopeName,
        value: group.scopeId,
        children: [] as any[]
      }
      group.children.forEach((variable: any) => {
        groupOption.children.push({
          type: DataSourceType.GLOBAL,
          label: variable.variableKey,
          value: variable.variableKey
        })
      })
      optionsGlobal.children.push(groupOption)
    })

  //函数脚本
  optionsFunction.children[0].children = renameFunctionItem(store.functionList)
  optionsFunction.children[1].children = renameFunctionItem(store.scriptList)

  return options
})

/**
 * 级联选择各组件的层级判断
 *
 * 页面入参数据最多两层
 * 组件数据两到三层
 * 后端服务三到四层
 * 函数脚本四到五层
 */
function onChange(values: any, selectedOptions: any) {
  console.log('---values---', values)
  console.log('---selectedOptions---', selectedOptions)
  props.paramItem.echoValues = values

  //先删除,避免带出上次的无用属性
  delete props.paramItem.param_value_type
  delete props.paramItem.type
  delete props.paramItem.relevanceComponentUuid
  delete props.paramItem.param_value
  delete props.paramItem.middle
  delete props.paramItem.param_v_key
  if (selectedOptions && selectedOptions.length > 0) {
    let type = selectedOptions[0].type
    props.paramItem.type = type
    if (type === DataSourceType.COMPONENT) {
      props.paramItem.param_value_type = 'T'
      props.paramItem.relevanceComponentUuid = selectedOptions[1].value
      if (selectedOptions.length === 3) {
        // 处理多输出组件
        props.paramItem.param_v_key = selectedOptions[2].value
      }
    } else if (type === DataSourceType.CUSTOM) {
      //页面入参
      props.paramItem.param_value_type = 'V'
      props.paramItem.param_v_key = selectedOptions[1].value
    } else if (type === DataSourceType.VARIABLE) {
      //页面变量
      props.paramItem.param_value_type = 'V'
      props.paramItem.param_v_key = selectedOptions[1].value
    } else if (type === DataSourceType.GLOBAL) {
      //全局变量
      if (selectedOptions.length > 2) {
        props.paramItem.param_value_type = 'G'
        props.paramItem.middle = selectedOptions[1].value
        props.paramItem.param_v_key = selectedOptions[2].value
      }
    } else if (type === DataSourceType.FUNCTION) {
      if (selectedOptions[selectedOptions.length - 1].type === 'scope') {
        message.info('请选择函数脚本')
        return
      }
      if (props.needReturnValue) {
        if (selectedOptions[1].value === 'function') {
          message.info('请选择脚本返回值')
        } else if (selectedOptions[selectedOptions.length - 1].type === 'report') {
          message.info('请选择脚本返回值')
        } else {
          if (selectedOptions.length === 4) {
            //不在分组中
            props.paramItem.param_value_type = 'F'
            props.paramItem.type = selectedOptions[1].value
            props.paramItem.operateApiId = selectedOptions[2].value
            props.paramItem.param_v_key = selectedOptions[3].value
          } else if (selectedOptions.length === 5) {
            //在分组中
            props.paramItem.param_value_type = 'F'
            props.paramItem.type = selectedOptions[1].value
            props.paramItem.middle = selectedOptions[2].value
            props.paramItem.operateApiId = selectedOptions[3].value
            props.paramItem.param_v_key = selectedOptions[4].value
          }
        }
      }
    }
  }

  console.log('paramItem=', JSON.stringify(props.paramItem))

  //   emit('onChange', selectedOptions)
}

//把函数脚本列表格式化
function renameFunctionItem(list: any[]) {
  let renamedList = []
  for (const scriptListElement of list) {
    // console.log('scriptListElement=', scriptListElement)

    let renamedItem = {
      value: scriptListElement.queryId,
      label: scriptListElement.name,
      type: scriptListElement.dataType,
      children: [] as any[]
    }
    if (scriptListElement.children != undefined && scriptListElement.children.length > 0) {
      for (const scriptListElementElement of scriptListElement.children) {
        renamedItem.children.push({
          value: scriptListElementElement.queryId,
          label: scriptListElementElement.name,
          type: scriptListElement.dataType,
          children: parseFunctionReturnValue(scriptListElementElement.functionOutput)
        })
      }
    } else if (scriptListElement.dataType === 'report') {
      //dataType === 'report'代表是函数脚本,'scope'代表分组
      renamedItem.children = parseFunctionReturnValue(scriptListElement.functionOutput) || []
    }
    renamedList.push(renamedItem)
  }
  return renamedList
}

function parseFunctionReturnValue(value: any) {
  if (value === undefined || value === null) {
    return undefined
  }
  let returnObj = JSON.parse(value)
  let returnParams = []
  for (let prop in returnObj) {
    if (returnObj.hasOwnProperty(prop)) {
      returnParams.push({
        value: prop,
        label: prop,
        type: 'returnValue',
        children: undefined
      })
    }
  }
  return returnParams
}
</script>
