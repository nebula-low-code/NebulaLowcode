<template>
  <a-cascader :value="echoCascadeValue" style="width: 227px" :options="options" :placeholder="placeholder || '请选择'" @change="onChange"></a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'

const props = defineProps<{
  paramItem: any
  placeholder?: string
  echoConfig?: boolean
  echoValue: any
  hidePageParam?: boolean
  hidePageVariable?: boolean
  hideComponent?: boolean
  hideGlobal?: boolean
  hideInterface?: boolean
  hideFunction?: boolean
  hideEventInterface?: boolean
}>()

const emit = defineEmits(['onChange'])

const store = useDataStore()

const echoCascadeValue = computed(() => {
  let echoValues = [] as any
  let interfaceDataConfig = props.paramItem

  return props.echoValue
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

  //页面入参
  let pageParams = store.pageConfig.config.pageParamsList
  pageParams &&
    pageParams.forEach((param: any) => {
      optionsCustom.children.push({
        label: param.operateHrefPageParamName,
        value: param.operateHrefPageParamName
      })
    })

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
  store.inputComponentList.forEach((componentItem: any) => {
    optionsComponent.children.push({
      label: componentItem.options.commonConfigAssignName,
      value: componentItem.uuid
    })
  })

  //接口
  if (!props.hideInterface) {
    let interfaceList: any[] = store.interfaceList
    for (const interfaceItem of interfaceList) {
      const childrenData = []
      const responseData = interfaceItem.data.responseData || {}
      for (const key in responseData) {
        if (Object.prototype.hasOwnProperty.call(responseData, key)) {
          const responseDataItem = responseData[key]
          let childObj = {
            label: key,
            value: key,
            children: [] as any[]
          }
          childrenData.push(childObj)
        }
      }
      const optionsInterface = {
        type: DataSourceType.INTERFACE,
        label: interfaceItem.data.name,
        value: interfaceItem.id,
        children: childrenData
      }
      options.push(optionsInterface)
    }
  }
  if (!props.hideEventInterface) {
    //事件中调用的接口
    for (const interfaceElement of store.eventInterfaceList) {
      let childObj = {
        type: DataSourceType.INTERFACE,
        label: interfaceElement.name,
        value: interfaceElement.id,
        children: [] as any[]
      }
      if (interfaceElement.res && interfaceElement.res.length > 0) {
        for (const resElement of interfaceElement.res) {
          childObj.children.push({
            label: resElement.name,
            value: resElement.name
          })
        }
      }
      options.push(childObj)
    }
  }
  // console.log('options=', options)

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
  // console.log('---values---', values)
  console.log('---selectedOptions---', selectedOptions)

  //先删除,避免带出上次的无用属性
  delete props.paramItem.operateApiId
  delete props.paramItem.param_value_type
  delete props.paramItem.type
  delete props.paramItem.param_v_key
  delete props.paramItem.middle
  delete props.paramItem.relevanceComponentUuid
  delete props.paramItem.param_v_name
  delete props.paramItem.param_value
  if (selectedOptions && selectedOptions.length > 0) {
    const dataSourceType = selectedOptions[0].type
    console.log('dataSourceType=', dataSourceType)
    if (dataSourceType === DataSourceType.COMPONENT) {
      //组件
      props.paramItem.param_value_type = 'T'
      props.paramItem.relevanceComponentUuid = selectedOptions[1].value
    } else if (dataSourceType === DataSourceType.INTERFACE || dataSourceType === dataSourceType.CONNECT) {
      //接口
      props.paramItem.param_value_type = 'B'
      props.paramItem.type = selectedOptions[0].type
      props.paramItem.param_v_name = selectedOptions[0].label
      props.paramItem.middle = selectedOptions[1].label

      if (selectedOptions.length > 2) {
        props.paramItem.param_v_key = selectedOptions[2].label
      } else {
        props.paramItem.operateApiId = selectedOptions[0].value
      }
    } else if (dataSourceType === DataSourceType.CUSTOM) {
      //入参
      props.paramItem.param_value_type = 'V'
      props.paramItem.param_v_key = selectedOptions[1].value
      props.paramItem.type = DataSourceType.CUSTOM
    } else if (dataSourceType === DataSourceType.VARIABLE) {
      //页面变量
      props.paramItem.param_value_type = 'V'
      props.paramItem.param_v_key = selectedOptions[1].value
      props.paramItem.type = DataSourceType.VARIABLE
    } else if (dataSourceType === DataSourceType.GLOBAL) {
      //全局变量
      props.paramItem.type = 'custom'
      props.paramItem.param_value_type = 'G'
      props.paramItem.middle = selectedOptions[1].value
      props.paramItem.param_v_key = selectedOptions[2].value
    } else if (dataSourceType === DataSourceType.FUNCTION) {
      props.paramItem.param_value_type = 'F'
      props.paramItem.type = selectedOptions[1].value
      let type = selectedOptions[1].value
      if (type === 'script') {
        //脚本函数
        if (selectedOptions.length === 5) {
          //如果有5层,代表函数脚本在分组中
          props.paramItem.middle = selectedOptions[selectedOptions.length - 3].id
        } else {
          props.paramItem.middle = undefined
        }
        props.paramItem.operateApiId = selectedOptions[selectedOptions.length - 2].id
        props.paramItem.param_v_key = selectedOptions[selectedOptions.length - 1].id
      } else {
        if (selectedOptions.length === 4) {
          //如果有4层,代表函数脚本在分组中
          props.paramItem.middle = selectedOptions[selectedOptions.length - 2].id
        } else {
          props.paramItem.middle = undefined
        }
        props.paramItem.operateApiId = selectedOptions[selectedOptions.length - 1].id
        props.paramItem.param_v_key = selectedOptions[selectedOptions.length - 1].id
      }
    }
  }

  console.log('paramItem=', JSON.stringify(props.paramItem))

  emit('onChange', selectedOptions)
}
</script>
