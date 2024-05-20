<template>
  <a-cascader style="width: 100%" :value="echoCascadeValue" :options="options" :changeOnSelect="changeOnSelect" placeholder="请选择" @change="onChange"></a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'

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
  let interfaceDataConfig = props.paramItem

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
    let childItem = {
      label: componentItem.options.commonConfigAssignName,
      value: componentItem.uuid,
      children: []
    } as any
    optionsComponent.children.push(childItem)
    //多输出组件
    if (componentItem.type === 'van-design-tree' || componentItem.type === 'van-design-tree-select') {
      childItem.children.push({
        label: '选中数值',
        value: 'value'
      })
      childItem.children.push({
        label: '选中名称',
        value: 'label'
      })
    } else if (componentItem.type === 'van-design-table') {
      childItem.children.push({
        label: '选定行数据',
        value: 'rowdata'
      })
      childItem.children.push({
        label: '每页行数',
        value: 'rownum'
      })
      childItem.children.push({
        label: '当前页号',
        value: 'pagenum'
      })
    } else if (componentItem.type === 'van-design-workflow') {
      childItem.children.push({
        label: '待审批人',
        value: 'pendingUser'
      })
      childItem.children.push({
        label: '审核人（上个节点）',
        value: 'approvedUser'
      })
      childItem.children.push({
        label: '审核意见（上个节点）',
        value: 'approvedAdvice'
      })
      childItem.children.push({
        label: '发起人ID',
        value: 'startUser'
      })
    } else if (componentItem.type === 'van-design-calendar-range') {
      childItem.children.push({
        label: '日期范围',
        value: 'value'
      })
      childItem.children.push({
        label: '开始日期',
        value: 'startDate'
      })
      childItem.children.push({
        label: '结束日期',
        value: 'endDate'
      })
    } else if (componentItem.type === 'van-design-wechat-login') {
      childItem.children.push({
        label: '手机号,openid,unionid',
        value: 'value'
      })
      childItem.children.push({
        label: '手机号',
        value: 'phoneNumber'
      })
      childItem.children.push({
        label: 'openid',
        value: 'openid'
      })
      childItem.children.push({
        label: 'unionid',
        value: 'unionid'
      })
    }
  })

  //接口
  if (!props.hideInterface) {
    let interfaceList: any[] = store.interfaceList
    for (const interfaceItem of interfaceList) {
      const childrenData = []
      const responseData = interfaceItem.data.responseData || {}
      for (const key in responseData) {
        if (Object.prototype.hasOwnProperty.call(responseData, key)) {
          childrenData.push({
            label: key,
            value: key
          })
          // const responseDataItem = responseData[key]
          // childrenData.push({
          //   label: key,
          //   value: responseDataItem
          // })
        }
      }
      const optionsInterface = {
        type: DataSourceType.INTERFACE,
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
 * 组件数据两到三层
 * 后端服务三到四层
 * 函数脚本四到五层
 */
function onChange(values: any, selectedOptions: any) {
  // console.log('---values---', values)
  // console.log('---selectedOptions---', selectedOptions)
  props.paramItem.echoValues = values

  //先删除,避免带出上次的无用属性
  delete props.paramItem.type
  delete props.paramItem.id
  delete props.paramItem.name
  delete props.paramItem.value
  delete props.paramItem.uuid
  delete props.paramItem.scope
  delete props.paramItem.key
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
    } else if (dataSourceType === DataSourceType.INTERFACE || dataSourceType === DataSourceType.CONNECT) {
      //接口
      props.paramItem.id = selectedOptions[0].data.id
      props.paramItem.uuid = selectedOptions[0].value
      props.paramItem.name = selectedOptions[0].label
      props.paramItem.paramsConfigs = selectedOptions[0].data.paramsConfigs
      if (selectedOptions.length > 1) {
        props.paramItem.key = selectedOptions[1].label
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
