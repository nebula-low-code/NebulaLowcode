<template>
  <a-cascader :value="echoCascadeValue" style="width: 100%" :options="options" :placeholder="placeholder || '请选择'" @change="onChange"></a-cascader>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'

const props = defineProps<{
  paramItem: any
  placeholder?: string
  echoConfig?: boolean
  hidePageParam?: boolean
  hidePageVariable?: boolean
  hideComponent?: boolean
  hideGlobal?: boolean
  hideInterface?: boolean
  hideFunction?: boolean
  hideEventInterface?: boolean
  hideMobileEvent?: boolean
}>()

const emit = defineEmits(['onChange'])

const store = useDataStore()

const echoCascadeValue = computed(() => {
  if (props.paramItem.echoValues) {
    // console.log('echoValues***==', props.paramItem.echoValues)
    return props.paramItem.echoValues
  }
  let echoValues = [] as any
  let interfaceDataConfig = props.paramItem
  if (props.paramItem.param_value_type === 'T') {
    //处理下多输出的组件
    let comp = store.componentConfigByUuid(interfaceDataConfig.relevanceComponentUuid)
    if (comp && comp.isMultiOutputComponent) {
      if (props.paramItem.param_v_key) {
        echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid, interfaceDataConfig.param_v_key]
      } else {
        echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid]
      }
    } else {
      echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid]
    }
  } else if (props.paramItem.param_value_type === 'V') {
    if (props.paramItem.type == DataSourceType.CUSTOM_INTERFACE) {
      echoValues = [props.paramItem.operateApiId, props.paramItem.param_v_key]
    } else {
      echoValues = [DataSourceType.CUSTOM, props.paramItem.param_v_key]
    }
  } else if (props.paramItem.param_value_type === 'B') {
    if (props.paramItem.type == DataSourceType.INTERFACE || props.paramItem.type == DataSourceType.CONNECT) {
      //若有param_v_key,代表绑定了数组类接口里的值,若无,则代表绑定了对象类接口里的值
      if (props.paramItem.param_v_key && props.paramItem.param_v_key.length > 0) {
        echoValues = [props.paramItem.param_v_name, props.paramItem.middle, props.paramItem.param_v_key]
      } else {
        echoValues = [props.paramItem.param_v_name, props.paramItem.middle]
      }
    }
  } else if (props.paramItem.param_value_type === 'F') {
    if (props.paramItem.middle && props.paramItem.middle.length > 0) {
      //有middle代表在分组中
      echoValues = [DataSourceType.FUNCTION, props.paramItem.type, props.paramItem.middle, props.paramItem.operateApiId, props.paramItem.param_v_key]
    } else {
      echoValues = [DataSourceType.FUNCTION, props.paramItem.type, props.paramItem.operateApiId, props.paramItem.param_v_key]
    }
  } else if (props.paramItem.param_value_type === 'G') {
    echoValues = [DataSourceType.GLOBAL, interfaceDataConfig.middle, interfaceDataConfig.param_v_key]
  } else if (props.paramItem.param_value_type === 'E') {
    //扫码/微信登录/企微登录
    echoValues = [props.paramItem.operateApiId, props.paramItem.param_v_key]
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
          const responseDataItem = responseData[key]
          let childObj = {
            label: key,
            value: key,
            children: [] as any[]
          }
          childrenData.push(childObj)
          if (Array.isArray(responseDataItem) && responseDataItem.length > 0) {
            let item = responseDataItem[0]
            for (const itemKey in item) {
              if (Object.prototype.hasOwnProperty.call(item, itemKey)) {
                childObj.children.push({
                  label: itemKey,
                  value: itemKey
                })
              }
            }
          }
        }
      }
      const optionsInterface = {
        type: DataSourceType.INTERFACE,
        label: interfaceItem.data.name,
        value: interfaceItem.data.name,
        id: interfaceItem.id,
        children: childrenData
      }

      options.push(optionsInterface)
    }
  }
  if (!props.hideEventInterface) {
    //事件中调用的接口
    for (const interfaceElement of store.eventInterfaceList) {
      let childObj = {
        type: DataSourceType.CUSTOM_INTERFACE,
        label: interfaceElement.name,
        value: interfaceElement.id,
        id: interfaceElement.id,
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

  //移动端事件,包括微信登录/企微登录/扫码
  if (!props.hideMobileEvent) {
    if (store.containScanEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: '扫码',
        value: '扫码',
        children: [
          {
            type: DataSourceType.EVENT,
            label: '扫码结果',
            value: 'value'
          }
        ]
      })
    }
    if (store.containWechatEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: '微信登录',
        value: '微信登录',
        children: [
          {
            type: DataSourceType.EVENT,
            label: '昵称',
            value: 'nickName'
          },
          {
            type: DataSourceType.EVENT,
            label: '头像',
            value: 'avatar'
          },
          {
            type: DataSourceType.EVENT,
            label: 'openId',
            value: 'openId'
          }
        ]
      })
    }
    if (store.containQyWechatEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: '企微登录',
        value: '企微登录',
        children: [
          {
            type: DataSourceType.EVENT,
            label: 'userId',
            value: 'userId'
          }
        ]
      })
    }
    if (store.containOpenIdEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: '获取openid',
        value: '获取openid',
        children: [
          {
            type: DataSourceType.EVENT,
            label: 'openid',
            value: 'openid'
          },
          {
            type: DataSourceType.EVENT,
            label: 'unionid',
            value: 'unionid'
          }
        ]
      })
    }
    if (store.containGetTokenEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: '获取令牌',
        value: '获取令牌',
        children: [
          {
            type: DataSourceType.EVENT,
            label: 'token',
            value: 'token'
          }
        ]
      })
    }
    if (store.containMap) {
      options.push({
        type: DataSourceType.EVENT,
        label: '地图定位',
        value: '地图定位',
        children: [
          {
            type: DataSourceType.EVENT,
            label: '省',
            value: '省'
          },
          {
            type: DataSourceType.EVENT,
            label: '市',
            value: '市'
          },
          {
            type: DataSourceType.EVENT,
            label: '区',
            value: '区'
          },
          {
            type: DataSourceType.EVENT,
            label: '详细地址',
            value: '详细地址'
          },
          {
            type: DataSourceType.EVENT,
            label: '经度',
            value: '经度'
          },
          {
            type: DataSourceType.EVENT,
            label: '纬度',
            value: '纬度'
          },
          {
            type: DataSourceType.EVENT,
            label: '经纬度',
            value: '经纬度'
          }
        ]
      })
    }
  }
  // console.log('options=', options)

  return options
})
function renameFunctionItem(list: any[]) {
  let renamedList = []
  for (const scriptListElement of list) {
    // console.log('scriptListElement=', scriptListElement)

    let renamedItem = {
      value: scriptListElement.queryId,
      label: scriptListElement.name,
      id: scriptListElement.queryId,
      type: scriptListElement.dataType,
      children: [] as any[]
    }
    if (scriptListElement.children != undefined && scriptListElement.children.length > 0) {
      for (const scriptListElementElement of scriptListElement.children) {
        renamedItem.children.push({
          value: scriptListElementElement.queryId,
          label: scriptListElementElement.name,
          id: scriptListElementElement.queryId,
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
        id: prop,
        type: 'returnValue',
        children: undefined
      })
    }
  }
  return returnParams
}
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
      if (selectedOptions.length === 3) {
        // 处理多输出组件
        props.paramItem.param_v_key = selectedOptions[2].value
      }
    } else if (dataSourceType === DataSourceType.INTERFACE || dataSourceType === dataSourceType.CONNECT) {
      //接口
      props.paramItem.param_value_type = 'B'
      props.paramItem.type = selectedOptions[0].type
      props.paramItem.param_v_name = selectedOptions[0].label
      props.paramItem.middle = selectedOptions[1].label
      props.paramItem.operateApiId = selectedOptions[0].id

      if (selectedOptions.length > 2) {
        props.paramItem.param_v_key = selectedOptions[2].label
      } else {
        // props.paramItem.operateApiId = selectedOptions[0].data.id
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
    } else if (dataSourceType === DataSourceType.CUSTOM_INTERFACE) {
      props.paramItem.param_value_type = 'V'
      props.paramItem.type = selectedOptions[0].type
      props.paramItem.operateApiId = selectedOptions[0].id
      if (selectedOptions.length > 1) {
        props.paramItem.param_v_key = selectedOptions[1].value
      } else {
      }
    } else if (dataSourceType === DataSourceType.EVENT) {
      props.paramItem.param_value_type = 'E'
      props.paramItem.operateApiId = selectedOptions[0].value
      props.paramItem.param_v_key = selectedOptions[1].value
      props.paramItem.type = DataSourceType.EVENT
    }
  }

  emit('onChange', selectedOptions)
}
</script>
