import { useDataStore } from '@/stores'
import { DataSourceType, WorkflowOutputs } from '@/utils/constants'
import { isEmpty } from 'lodash'
import { isNetworkDatasource } from './string-utils'
//组件的输出值
export function getComponentValue(options: any, defaultValue: any, bindComponentUUID?: string) {
  const store = useDataStore()
  let dataSource = options.contentDataSource
  let dataConfig = options.interfaceDataConfig
  let value = ''
  if (isNetworkDatasource(dataSource)) {
    //绑定接口
    let id = dataConfig.uuid || dataConfig.id //兼容旧的配置,有些接口没有uuid
    let resp = store.interfaceDataById(id)
    if (resp && resp.data) {
      if (isEmpty(dataConfig.middle)) {
        value = resp.data.responseData[dataConfig.key]
      } else {
        let middle = resp.data.responseData[dataConfig.middle]
        if (!isEmpty(middle)) {
          value = middle[dataConfig.key]
        }
      }
    }
  } else if (dataSource === DataSourceType.COMPONENT) {
    //绑定组件
    let comp = store.componentConfigByUuid(dataConfig.key)
    if (comp) {
      value = comp.options.value
      if (comp.type === 'van-design-tree' || comp.type === 'van-design-tree-select') {
        if (dataConfig.output == 'label') {
          value = comp.options.containPath ? comp.options.pathLabel : comp.options.outputLabel
        } else {
          value = comp.options.containPath ? comp.options.pathValue : comp.options.value
        }
      } else if (comp.type === 'van-design-table') {
        if (dataConfig.output == 'rownum') {
          value = comp.options.pagination.pageSize
        } else if (dataConfig.output == 'pagenum') {
          value = comp.options.pagination.current
        }
      } else if (comp.type === 'van-design-workflow') {
        if (WorkflowOutputs.indexOf(dataConfig.output) > -1) {
          value = comp.options.outputs[dataConfig.output]
        }
      } else if (comp.type === 'van-design-calendar-range') {
        if (dataConfig.output == 'startDate') {
          if (Array.isArray(comp.options.value) && comp.options.value.length > 1) {
            value = comp.options.value[0]
          }
        } else if (dataConfig.output == 'endDate') {
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
      } else if ((comp.type === 'van-design-select' && comp.options.mode === 'multiple') || comp.type === 'van-design-checkbox') {
        if (comp.options.value && comp.options.value.length > 0) {
          value = comp.options.value.join(',')
        } else {
          value = ''
        }
      }
    }
  } else if (dataSource === DataSourceType.BIND) {
    //绑定数据,从父组件获取到接口数据,默认取列表第1项数据
    if (bindComponentUUID) {
      let bindKey = dataConfig.bindDataKey
      let comp = store.componentConfigByUuid(bindComponentUUID)
      if (comp) {
        let uuid = comp.options.interfaceDataConfig.uuid || comp.options.interfaceDataConfig.id
        let interfaceData = store.interfaceDataById(uuid)
        if (interfaceData) {
          let responseData = interfaceData.data.responseData
          if (responseData) {
            let list = responseData[comp.options.interfaceDataConfig.key]
            if (Array.isArray(list) && list.length > 0) {
              let itemData = list[0]
              value = itemData[bindKey]
            }
          }
        }
      }
    }
  } else if (dataSource === DataSourceType.CUSTOM) {
    //自定义(页面入参) 编辑端这里不需要实际取值,只要在渲染器实现就可以
    value = defaultValue
  } else if (dataSource === DataSourceType.VARIABLE) {
    value = store.pageVariablesByKey(dataConfig.key)
  } else if (dataSource === DataSourceType.GLOBAL) {
    //全局变量
    value = store.globalVariableByKey(dataConfig.key, dataConfig.scope)
  } else {
    value = defaultValue
  }
  return value
}

//组件的回显值
export function getComponentEchoValue(options: any, defaultValue: any, bindComponentUUID?: string) {
  const store = useDataStore()
  let dataSource = options.contentDataEcho
  let dataConfig = options.interfaceDataEchoConfig
  let value = ''
  if (isNetworkDatasource(dataSource)) {
    //绑定接口
    let id = dataConfig.uuid || dataConfig.id //兼容旧的配置,有些接口没有uuid
    let resp = store.interfaceDataById(id)
    if (resp && resp.data) {
      if (isEmpty(dataConfig.middle)) {
        value = resp.data.responseData[dataConfig.key]
      } else {
        let middle = resp.data.responseData[dataConfig.middle]
        if (!isEmpty(middle)) {
          value = middle[dataConfig.key]
        }
      }
    }
  } else if (dataSource === DataSourceType.COMPONENT) {
    //绑定组件
    let comp = store.componentConfigByUuid(dataConfig.key)
    if (comp) {
      value = comp.options.value
    }
  } else if (dataSource === DataSourceType.BIND) {
    //绑定数据,数据从config.itemData中获取
    if (bindComponentUUID) {
      let bindKey = dataConfig.bindDataKey
      let comp = store.componentConfigByUuid(bindComponentUUID)
      if (comp) {
        let uuid = comp.options.interfaceDataEchoConfig.uuid || comp.options.interfaceDataEchoConfig.id
        let interfaceData = store.interfaceDataById(uuid)
        if (interfaceData) {
          let responseData = interfaceData.data.responseData
          if (responseData) {
            let list = responseData[comp.options.interfaceDataEchoConfig.key]
            if (Array.isArray(list) && list.length > 0) {
              let itemData = list[0]
              value = itemData[bindKey]
            }
          }
        }
      }
    }
  } else if (dataSource === DataSourceType.CUSTOM) {
    //页面入参
    value = defaultValue
  } else if (dataSource === DataSourceType.GLOBAL) {
    //全局变量
    value = store.globalVariableByKey(dataConfig.key, dataConfig.scope)
  } else {
    value = defaultValue
  }
  return value
}

//组件绑定的数据
export function getComponentData(uuid: string, comp: any) {
  const store = useDataStore()
  let data = undefined
  let res = store.interfaceDataById(uuid)
  if (res && res.data && res.data.responseData) {
    data = res.data.responseData[comp.options.interfaceDataConfig.key]
  }
  return data
}
