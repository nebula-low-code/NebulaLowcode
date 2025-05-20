<template>
  <div>
    <div style="display: flex">
      <a-cascader :value="echoCascadeValue" :multiple="isMulti" style="width: 100%" :options="options" :placeholder="placeholder || '请选择'" @change="onChange"></a-cascader>
      <a-button type="link" v-if="isNeedMultiSwitch" @click="switchMulti">{{ isMulti ? '单选' : '多选' }}</a-button>
      <!-- TODO 2025-02-08 暂时先注释了，展现形式应该是怎么样的，还没想好，多少地方需要变动也没想好  -->
      <div class="value-select-split" v-if="props.isFilter" @click="changeFilterValueType"><a-button type="link">切换</a-button></div>
    </div>
    <div v-if="props.isFilter && props.paramItem.valueSelectFilter" style="display: flex; margin-top: 10px">
      <a-input placeholder="解析字段通过'.'分割" v-model:value="props.paramItem.filterValue" />
      <a-tooltip>
        <template #title>
          <span>用于处理复杂数据解析，解析字段通过'.'分割</span>
        </template>
        <exclamation-circle-filled style="position: absolute; right: -10px; top: 50px" />
      </a-tooltip>
    </div>
    <!-- <div class="switch">{{ isMulti ? '单选' : '多选' }}</div> -->
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import { DataSourceType } from '@/utils/constants'
import { multiOutputValues } from '@/utils/multi-output-component'
import { isPlainObject } from 'lodash'
import { isNetworkDatasource } from '@/utils/string-utils'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
const props = withDefaults(
  defineProps<{
    paramItem: any
    placeholder?: string
    echoConfig?: boolean
    hidePageParam?: boolean
    hidePageVariable?: boolean
    hideComponent?: boolean
    hideComponentObject?: boolean
    hideGlobal?: boolean
    hideInterface?: boolean
    hideFunction?: boolean
    hideEventInterface?: boolean
    hideMobileEvent?: boolean
    isMultiple?: boolean
    isNeedMultiSwitch?: boolean
    isFilter?: boolean
  }>(),
  {
    isMultiple: false
  }
)
const isMulti = ref(false)
const emit = defineEmits(['onChange'])

const store = useDataStore()

const echoCascadeValue = computed(() => {
  if (isMulti.value && props.paramItem.paramList && props.paramItem.paramList.length > 0) {
    return props.paramItem.echoValues
  } else {
    return handleSingleEcho(props.paramItem)
  }
})
function handleSingleEcho(paramItem: any) {
  if (paramItem.echoValues) {
    // console.log('echoValues***==', props.paramItem.echoValues)
    return props.paramItem.echoValues
  }
  let echoValues = [] as any
  let interfaceDataConfig = paramItem
  if (paramItem.param_value_type === 'T') {
    //处理下多输出的组件
    let comp = store.componentConfigByUuid(interfaceDataConfig.relevanceComponentUuid)
    if (comp && comp.isMultiOutputComponent) {
      if (paramItem.param_v_key) {
        echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid, interfaceDataConfig.param_v_key]
      } else {
        echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid]
      }
    } else {
      echoValues = [DataSourceType.COMPONENT, interfaceDataConfig.relevanceComponentUuid]
    }
  } else if (paramItem.param_value_type === 'V') {
    if (paramItem.type == DataSourceType.CUSTOM_INTERFACE) {
      echoValues = [paramItem.operateApiId, paramItem.param_v_key]
    } else {
      echoValues = [DataSourceType.CUSTOM, paramItem.param_v_key]
    }
  } else if (paramItem.param_value_type === 'B') {
    if (paramItem.type == DataSourceType.INTERFACE || paramItem.type == DataSourceType.CONNECT) {
      //若有param_v_key,代表绑定了数组类接口里的值,若无,则代表绑定了对象类接口里的值
      if (paramItem.param_v_key && paramItem.param_v_key.length > 0) {
        echoValues = [paramItem.param_v_name, paramItem.middle, paramItem.param_v_key]
      } else {
        echoValues = [paramItem.param_v_name, paramItem.middle]
      }
    }
  } else if (paramItem.param_value_type === 'F') {
    if (paramItem.middle && paramItem.middle.length > 0) {
      //有middle代表在分组中
      echoValues = [DataSourceType.FUNCTION, paramItem.type, paramItem.middle, paramItem.operateApiId, paramItem.param_v_key]
    } else {
      echoValues = [DataSourceType.FUNCTION, paramItem.type, paramItem.operateApiId, paramItem.param_v_key]
    }
  } else if (paramItem.param_value_type === 'G') {
    echoValues = [DataSourceType.GLOBAL, interfaceDataConfig.middle, interfaceDataConfig.param_v_key]
  } else if (paramItem.param_value_type === 'E') {
    //扫码/微信登录/企微登录
    echoValues = [paramItem.operateApiId, paramItem.param_v_key]
  }
  return echoValues
}
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
  const optionsComponentObject = {
    type: DataSourceType.COMPONENT_OBJECT,
    label: '对象',
    value: DataSourceType.COMPONENT_OBJECT,
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
    children:
      store.deviceType === 'pc'
        ? [
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
        : [
            {
              value: 'script',
              label: '脚本',
              children: []
            }
          ]
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
  if (!props.hideComponentObject) {
    options.push(optionsComponentObject)
  }
  if (!props.hideGlobal) {
    options.push(optionsGlobal)
  }
  if (!props.hideFunction) {
    options.push(optionsFunction)
  }

  //页面入参(弹窗和页面隔离)
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
    // console.log('--------store.pageConfig.config',store.pageConfig,store.currentInputComponentList)
    // let modalName = "";
    // store.pageConfig.modalList.forEach((modalItem: any) => {
    //     if(modalItem.uuid==store.currentModalUuid){
    //         modalName=modalItem.config.reportName
    //     }
    // })
    // if(modalName){
    //     modalName+="-"
    // }
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
  if (store.currentEvent) {
    //组件对象
    let event = store.currentEvent.variableMap
    for (const key in event) {
      if (Object.prototype.hasOwnProperty.call(event, key)) {
        const element = event[key]
        let childItem = {
          label: element.relevanceComponentName,
          value: key,
          children: []
        } as any
        for (const key1 in element) {
          if (Object.prototype.hasOwnProperty.call(element, key1)) {
            if (key1 !== 'relevanceComponentName') {
              const element1 = element[key1]
              let temp = {
                label: element1.outputValueName,
                value: key1
              }
              if (key1 == 'currentRow') {
                temp.children = element1.variableList
              }
              childItem.children.push(temp)
            }
          }
        }
        console.log('childItem---', childItem)

        optionsComponentObject.children.push(childItem)
      }
    }
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

  // 函数脚本
  if (store.deviceType === 'pc') {
    optionsFunction.children[0].children = renameFunctionItem(store.functionList)
    optionsFunction.children[1].children = renameFunctionItem(store.scriptList)
  } else {
    optionsFunction.children[0].children = renameFunctionItem(store.scriptList)
  }

  //接口
  if (!props.hideInterface) {
    let interfaceList = store.interfaceList
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
          //数组用于列表中组件设值事件
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
          //解析对象中的字段
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
            childObj.children = childrenData2
          }
        }
      }
      const optionsInterface = {
        type: DataSourceType.INTERFACE,
        label: interfaceItem.data.name,
        value: interfaceItem.id,
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

  if (store.containGetLanguageEvent) {
    options.push({
      type: DataSourceType.EVENT,
      label: '获取语言',
      value: '获取语言',
      children: [
        {
          type: DataSourceType.EVENT,
          label: '语言名称',
          value: 'language'
        }
      ]
    })
  }
  if (store.containDataInsertEvent) {
    options.push({
      type: DataSourceType.EVENT,
      label: '数据新增',
      value: '数据新增',
      children: [
        {
          type: DataSourceType.EVENT,
          label: 'id',
          value: 'id'
        }
      ]
    })
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

    if (store.containIAMTokenEvent) {
      options.push({
        type: DataSourceType.EVENT,
        label: 'IAMToken',
        value: 'IAMToken',
        children: [
          {
            type: DataSourceType.EVENT,
            label: 'accessToken',
            value: 'accessToken'
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
  if (isMulti.value) {
    props.paramItem.echoValues = values
    props.paramItem.paramList = []
    values &&
      values.forEach((item: any, index: number) => {
        let tempParam = {}
        handleSingleChange(tempParam, item, selectedOptions[index])
        props.paramItem.paramList.push(tempParam)
      })
  } else {
    props.paramItem.echoValues = values
    handleSingleChange(props.paramItem, values, selectedOptions)
  }
  console.log('paramItem=', JSON.stringify(props.paramItem))
  emit('onChange', selectedOptions)
}
function handleSingleChange(paramItem: any, values: any, selectedOptions: any) {
  //先删除,避免带出上次的无用属性
  delete paramItem.operateApiId
  delete paramItem.param_value_type
  delete paramItem.type
  delete paramItem.param_v_key
  delete paramItem.middle
  delete paramItem.relevanceComponentUuid
  delete paramItem.param_v_name
  delete paramItem.param_value
  if (selectedOptions && selectedOptions.length > 0) {
    const dataSourceType = selectedOptions[0].type
    if (dataSourceType === DataSourceType.COMPONENT) {
      //组件
      paramItem.param_value_type = 'T'
      paramItem.relevanceComponentUuid = selectedOptions[1].value
      if (selectedOptions.length === 3) {
        // 处理多输出组件
        paramItem.param_v_key = selectedOptions[2].value
      }
    } else if (dataSourceType === DataSourceType.COMPONENT_OBJECT) {
      console.log('---selectedOptions---', selectedOptions)
      let oValue = selectedOptions[2].value
      paramItem.param_value_type = 'O'
      paramItem.relevanceComponentUuid = selectedOptions[1].value
      if (oValue == 'currentRow' && selectedOptions.length == 4) {
        paramItem.middle = selectedOptions[2].value
        paramItem.param_v_key = selectedOptions[3].value
      } else {
        paramItem.param_v_key = selectedOptions[2].value
      }
    } else if (isNetworkDatasource(dataSourceType)) {
      //接口
      paramItem.param_value_type = 'B'
      paramItem.type = selectedOptions[0].type
      paramItem.param_v_name = selectedOptions[0].label
      paramItem.middle = selectedOptions[1].label
      paramItem.operateApiId = selectedOptions[0].id

      if (selectedOptions.length > 2) {
        paramItem.param_v_key = selectedOptions[2].label
      } else {
        // paramItem.operateApiId = selectedOptions[0].data.id
      }
    } else if (dataSourceType === DataSourceType.CUSTOM) {
      //入参
      paramItem.param_value_type = 'V'
      paramItem.param_v_key = selectedOptions[1].value
      paramItem.type = DataSourceType.CUSTOM
    } else if (dataSourceType === DataSourceType.VARIABLE) {
      //页面变量
      paramItem.param_value_type = 'V'
      paramItem.param_v_key = selectedOptions[1].value
      paramItem.type = DataSourceType.VARIABLE
    } else if (dataSourceType === DataSourceType.GLOBAL) {
      //全局变量
      paramItem.type = 'custom'
      paramItem.param_value_type = 'G'
      paramItem.middle = selectedOptions[1].value
      paramItem.param_v_key = selectedOptions[2].value
    } else if (dataSourceType === DataSourceType.FUNCTION) {
      paramItem.param_value_type = 'F'
      paramItem.type = selectedOptions[1].value
      let type = selectedOptions[1].value
      if (type === 'script') {
        //脚本函数
        if (selectedOptions.length === 5) {
          //如果有5层,代表函数脚本在分组中
          paramItem.middle = selectedOptions[selectedOptions.length - 3].id
        } else {
          paramItem.middle = undefined
        }
        paramItem.operateApiId = selectedOptions[selectedOptions.length - 2].id
        paramItem.param_v_key = selectedOptions[selectedOptions.length - 1].id
      } else {
        if (selectedOptions.length === 4) {
          //如果有4层,代表函数脚本在分组中
          paramItem.middle = selectedOptions[selectedOptions.length - 2].id
        } else {
          paramItem.middle = undefined
        }
        paramItem.operateApiId = selectedOptions[selectedOptions.length - 1].id
        paramItem.param_v_key = selectedOptions[selectedOptions.length - 1].id
      }
    } else if (dataSourceType === DataSourceType.CUSTOM_INTERFACE) {
      paramItem.param_value_type = 'V'
      paramItem.type = selectedOptions[0].type
      paramItem.operateApiId = selectedOptions[0].id
      if (selectedOptions.length > 1) {
        paramItem.param_v_key = selectedOptions[1].value
      } else {
      }
    } else if (dataSourceType === DataSourceType.EVENT) {
      paramItem.param_value_type = 'E'
      paramItem.operateApiId = selectedOptions[0].value
      paramItem.param_v_key = selectedOptions[1].value
      paramItem.type = DataSourceType.EVENT
    }
  }
}
// 这么写主要是为了处理如果已经配了多选的，则需要回显多选，如果没配，允许单选
if (props.isMultiple) {
  if (props.paramItem.paramList && props.paramItem.paramList.length > 0) {
    isMulti.value = props.isMultiple
  }
}
function switchMulti() {
  if (isMulti.value) {
    props.paramItem.paramList = []
  }
  isMulti.value = !isMulti.value
}
function changeFilterValueType() {
  props.paramItem.valueSelectFilter = !props.paramItem.valueSelectFilter
}
</script>
<style scoped>
.switch {
  width: 40px;
  line-height: 32px;
  cursor: pointer;
  text-align: center;
}
.value-select-div {
  display: flex;
  align-items: center;
}
.value-select-split {
  width: 20px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
</style>
