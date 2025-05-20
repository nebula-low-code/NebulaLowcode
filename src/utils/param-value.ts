import { useDataStore } from '@/stores'
import { WorkflowOutputs } from '@/utils/constants'
import { isNetworkDatasource } from './string-utils'

export function getParamValue(paramConfig: any, pageId?: any, rowData?: any) {
  const store = useDataStore()
  let value = ''
  if (paramConfig.param_value_type === 'T') {
    //组件
    let comp = store.componentConfigByUuid(paramConfig.relevanceComponentUuid)

    if (comp) {
      value = comp.options.value
      //树形组件和树形选择器,绑定的输出值可能是label或者value,或者带有父节点路径信息的label或value
      if (comp.type === 'van-design-tree' || comp.type === 'van-design-tree-select') {
        if (paramConfig.param_v_key == 'label') {
          value = comp.options.containPath ? comp.options.pathLabel : comp.options.outputLabel
        } else {
          value = comp.options.containPath ? comp.options.pathValue : comp.options.value
        }
      } else if (comp.type === 'van-design-table') {
        if (paramConfig.param_v_key == 'rownum') {
          value = comp.options.pagination.pageSize
        } else if (paramConfig.param_v_key == 'pagenum') {
          value = comp.options.pagination.current
        }
      } else if (comp.type === 'van-design-workflow') {
        if (WorkflowOutputs.indexOf(paramConfig.param_v_key) > -1) {
          value = comp.options.outputs[paramConfig.param_v_key]
        }
      } else if (comp.type === 'van-design-checkbox-auth') {
        let valueStr = ''
        comp.options.values.forEach((checkValue: any) => {
          valueStr += checkValue + ','
        })
        if (valueStr.length > 0) {
          valueStr = valueStr.substring(0, valueStr.length - 1)
        }
        value = valueStr
      } else if (comp.type === 'van-design-calendar-range') {
        // 如果null 进接口会有空指针问题，暂时在前端修复这个bug
        value = ''
        if (paramConfig.param_v_key == 'startDate') {
          if (Array.isArray(comp.options.value) && comp.options.value.length > 1) {
            value = comp.options.value[0]
          }
        } else if (paramConfig.param_v_key == 'endDate') {
          if (Array.isArray(comp.options.value) && comp.options.value.length > 1) {
            value = comp.options.value[1]
          }
        } else {
          if (comp.options.value && comp.options.value.length > 0) {
            value = comp.options.value.join(',')
          } else {
            value = ''
          }
        }
      } else if (comp.type === 'van-design-select' && comp.options.mode != 'multiple') {
        if (paramConfig.param_v_key == 'value') {
          value = comp.options.value
        } else if (paramConfig.param_v_key == 'label') {
          value = comp.options.outputLabel
        } else {
          // 老配置
          value = comp.options.value
        }
      } else if (comp.type === 'van-design-select' && comp.options.mode === 'multiple') {
        if (paramConfig.param_v_key == 'value') {
          if (comp.options.value && comp.options.value.length > 0) {
            value = comp.options.value.join(',')
          } else {
            value = ''
          }
        } else if (paramConfig.param_v_key == 'label') {
          if (comp.options.outputLabel && comp.options.outputLabel.length > 0) {
            value = comp.options.outputLabel.join(',')
          } else {
            value = ''
          }
        } else {
          // 老配置
          if (comp.options.value && comp.options.value.length > 0) {
            value = comp.options.value.join(',')
          } else {
            value = ''
          }
        }
      } else if (comp.type === 'van-design-checkbox') {
        if (comp.options.value && comp.options.value.length > 0) {
          value = comp.options.value.join(',')
        } else {
          value = ''
        }
      } else if (comp.type === 'van-design-upload-img') {
        if (comp.options.value && comp.options.value.length > 0) {
          value = comp.options.value.join(',')
        } else {
          value = ''
        }
      }
    }
  } else if (paramConfig.param_value_type === 'V') {
    if (paramConfig.type === 'customInterface') {
      //接口调用
      let interfaceRes = store.interfaceDataById(paramConfig.operateApiId)
      value = interfaceRes[paramConfig.param_v_key]
    } else {
      //自定义(页面入参) 编辑端这里不需要实际取值,只要在渲染器实现就可以
      value = ''
    }
  } else if (paramConfig.param_value_type === 'B') {
    if (isNetworkDatasource(paramConfig.type)) {
      console.log('paramConfig=', paramConfig)
      if (rowData) {
        value = rowData[paramConfig.param_v_key]
      } else {
        let res = store.interfaceDataById(paramConfig.operateApiId)
        if (res) {
          value = res[paramConfig.middle]
        }
      }
    }
  } else if (paramConfig.param_value_type === 'G') {
    //全局变量
    value = store.globalVariableByKey(paramConfig.param_v_key, paramConfig.middle)
  } else if (paramConfig.param_value_type === 'F') {
    //函数脚本
    // let result = store.functionDataById(paramConfig.operateApiId)
    // if (paramConfig.type === 'script') {
    //   //脚本
    //   value = result.get(paramConfig.param_v_key)
    // } else {
    //   value = result
    // }
  } else {
    value = paramConfig.param_value
  }

  return value
}

export function isFileArray(value: any) {
  try {
    const parsedData = JSON.parse(value)
    if (Array.isArray(parsedData)) {
      return true
    }
    return false
  } catch (error) {
    console.warn('JSON 解析错误:', error)
    return false
  }
}
