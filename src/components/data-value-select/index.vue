<template>
  <a-cascader style="width: 100%" :value="echoCascadeValue" :options="options" :changeOnSelect="changeOnSelect" placeholder="请选择" @change="onChange"></a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'
import { multiOutputValues } from '@/utils/multi-output-component'
import { isPlainObject } from 'lodash'
import { isNetworkDatasource } from '@/utils/string-utils'

const props = defineProps<{
  componentOptions: any
  paramItem: any
  echoConfig?: boolean
  hidePageParam?: boolean
  hidePageVariable?: boolean
  hideComponent?: boolean
  hideGlobal?: boolean
  hideInterface?: boolean
  changeOnSelect?: boolean //是否允许只选中父级
}>()

const emit = defineEmits(['onChange'])

const store = useDataStore()

const echoCascadeValue = computed(() => {
  if (props.paramItem && props.paramItem.echoValues) {
    return props.paramItem.echoValues
  }
  let echoValues: any[] = []
  let interfaceDataConfig = props.paramItem || { versions: '1.0.0' }

  let contentDataSource = props.componentOptions.contentDataSource
  if (props.echoConfig) {
    interfaceDataConfig = props.componentOptions.interfaceDataEchoConfig
    contentDataSource = props.componentOptions.contentDataEcho
  }
  // 这里处理下 值的回显
  if (contentDataSource == DataSourceType.INTERFACE || contentDataSource == DataSourceType.CONNECT) {
    let uuid = interfaceDataConfig.uuid || interfaceDataConfig.id
    if (interfaceDataConfig.key) {
      echoValues = [uuid, interfaceDataConfig.key]
    } else {
      echoValues = [uuid]
    }
    // let interfaceData = store.interfaceDataById(uuid)
    // if (interfaceData) {
    //   let responseData = interfaceData.data.responseData
    //   if (interfaceDataConfig.key) {
    //     echoValues = [uuid, responseData[interfaceDataConfig.key]]
    //   } else {
    //     echoValues = [uuid]
    //   }
    // }
  } else if (contentDataSource === DataSourceType.CUSTOM) {
    // 页面入参
    echoValues = [interfaceDataConfig.uuid, interfaceDataConfig.key]
  } else if (contentDataSource === DataSourceType.COMPONENT) {
    //组件
    //处理下多输出的组件
    let comp = store.componentConfigByUuid(props.paramItem.key)
    if (comp && comp.isMultiOutputComponent) {
      if (props.paramItem.output) {
        echoValues = [interfaceDataConfig.uuid, interfaceDataConfig.key, interfaceDataConfig.output]
      } else {
        echoValues = [interfaceDataConfig.uuid, interfaceDataConfig.key]
      }
    } else {
      echoValues = [interfaceDataConfig.uuid, interfaceDataConfig.key]
    }
  } else if (contentDataSource === DataSourceType.GLOBAL) {
    //全局变量
    echoValues = [interfaceDataConfig.uuid, interfaceDataConfig.scope, interfaceDataConfig.key]
  }
  // console.log('echoValues==', echoValues)

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
  let options = []
  if (!props.hidePageParam) {
    options.push(optionsCustom)
  }
  if (!props.hidePageVariable) {
    options.push(optionsVariable)
  }
  if (!props.hideComponent) {
    options.push(optionsComponent)
  }
  if (!props.hideGlobal) {
    options.push(optionsGlobal)
  }

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

  //接口
  if (!props.hideInterface) {
    let interfaceList = store.interfaceList
    for (const interfaceItem of interfaceList) {
      const childrenData = []
      const responseData = interfaceItem.data.responseData || {}
      for (const key in responseData) {
        if (Object.prototype.hasOwnProperty.call(responseData, key)) {
          let childrenDataItem = {
            label: key,
            value: key
          } as any
          childrenData.push(childrenDataItem)

          //如果字段是对象,继续解析里面的字段
          const responseDataItem = responseData[key]
          if (isPlainObject(responseDataItem)) {
            const childrenData2 = []
            for (const key2 in responseDataItem) {
              if (Object.prototype.hasOwnProperty.call(responseDataItem, key2)) {
                childrenData2.push({
                  label: key2,
                  value: key2
                })
              }
            }
            childrenDataItem.children = childrenData2
          }
        }
      }
      const optionsInterface = {
        type: interfaceItem.type,
        label: interfaceItem.data.name,
        value: interfaceItem.id,
        data: interfaceItem.data,
        children: childrenData
      }
      options.push(optionsInterface)
    }
  }
  //   console.log('options=', options)

  return options
})

/**
 * 级联选择各组件的层级判断
 *
 * 页面入参数据最多两层
 * 组件数据两到三层(三层为多输出组件)
 * 后端服务两到三层(三层代表字段为object)
 * 函数脚本四到五层
 */
function onChange(values: any, selectedOptions: any) {
  console.log('---values---', values)
  console.log('---selectedOptions---', selectedOptions)
  if (!props.paramItem) {
    return
  }
  props.paramItem.echoValues = values

  //先删除,避免带出上次的无用属性
  delete props.paramItem.type
  delete props.paramItem.id
  delete props.paramItem.name
  delete props.paramItem.value
  delete props.paramItem.uuid
  delete props.paramItem.scope
  delete props.paramItem.key
  delete props.paramItem.middle
  delete props.paramItem.paramsConfigs
  if (selectedOptions && selectedOptions.length > 0) {
    const dataSourceType = selectedOptions[0].type
    if (props.echoConfig) {
      props.componentOptions.contentDataEcho = dataSourceType
    } else {
      props.componentOptions.contentDataSource = dataSourceType
    }
    if (dataSourceType === DataSourceType.COMPONENT) {
      //组件
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.key = selectedOptions[1].value
      if (selectedOptions.length === 3) {
        // 处理多输出组件
        props.paramItem.uuid = selectedOptions[0].value
        props.paramItem.key = selectedOptions[1].value
        props.paramItem.output = selectedOptions[2].value
      }
    } else if (isNetworkDatasource(dataSourceType)) {
      //接口
      props.paramItem.id = selectedOptions[0].data.id
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.name = selectedOptions[0].label
      props.paramItem.paramsConfigs = selectedOptions[0].data.paramsConfigs
      if (selectedOptions.length === 2) {
        props.paramItem.key = selectedOptions[1].label
      }
      if (selectedOptions.length === 3) {
        props.paramItem.middle = selectedOptions[1].label
        props.paramItem.key = selectedOptions[2].label
      }
      // props.paramItem.value = selectedOptions[1].value
    } else if (dataSourceType === DataSourceType.CUSTOM) {
      //入参
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.key = selectedOptions[1].value
    } else if (dataSourceType === DataSourceType.VARIABLE) {
      //页面变量
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.key = selectedOptions[1].value
    } else if (dataSourceType === DataSourceType.GLOBAL) {
      //全局变量
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.scope = selectedOptions[1].value
      props.paramItem.key = selectedOptions[2].value
    }
  } else {
    props.componentOptions.contentDataSource = DataSourceType.DEFAULT
    props.componentOptions.contentDataEcho = DataSourceType.DEFAULT
    props.paramItem.id = ''
    props.paramItem.uuid = ''
  }

  console.log('paramItem=', JSON.stringify(props.paramItem))

  emit('onChange', selectedOptions)
}
</script>
