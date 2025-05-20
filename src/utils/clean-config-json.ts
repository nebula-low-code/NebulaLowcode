import { transformComponentConfigToSimple,transformComponentConfigToAISimple } from '@/utils/transform-data-list'
import { useDataStore } from '@/stores'
import { DataSourceType } from './constants'
export function getCleanConfigJson(space?: string | number) {
  const store = useDataStore()
  let globalConfig = store.pageGlobalConfig
  let eventConfig = store.pageEventConfig

  if (!eventConfig || Object.keys(eventConfig).length == 0) {
    eventConfig = {
      eventList: [
        {
          eventType: 'load',
          version: '1.0.0',
          actionList: []
        },
        {
          eventType: 'show',
          version: '1.0.0',
          actionList: []
        }
      ]
    }
  }

  // 清除组件多余属性
  const componentList = [] as any
  transformComponentConfigToSimple(store.componentTreeList, componentList)

  // 清除弹窗内组件多余属性
  let copyModalList = []
  if (store.pageConfig.modalList) {
    copyModalList = JSON.parse(JSON.stringify(store.pageConfig.modalList))
    if (copyModalList) {
      copyModalList.forEach((modal: any) => {
        const comps = [] as any
        transformComponentConfigToSimple(modal.list, comps)
        modal.list = comps
        // 清除数据引擎内的响应数据(mock接口不清除)
        const interfaceList: any[] = []
        const databaseList: any[] = []
        const sqlList: any[] = []
        const difyList: any[] = []
        let storeInterfaceList = store.modalInterfaceListByUuid(modal.uuid)
        storeInterfaceList.forEach((interfaceItem: any) => {
          const interfaceItemCopy = JSON.parse(JSON.stringify(interfaceItem))
          if (!interfaceItemCopy.data.isMockData) {
            interfaceItemCopy.data.responseData = {}
          }
          if (interfaceItemCopy.type === DataSourceType.DATABASE) {
            databaseList.push(interfaceItemCopy)
          } else if (interfaceItemCopy.type === DataSourceType.SQL) {
            sqlList.push(interfaceItemCopy)
          } else if (interfaceItemCopy.type === DataSourceType.DIFY){
            difyList.push(interfaceItemCopy)
          } else {
            interfaceList.push(interfaceItemCopy)
          }
        })
        modal.config.interfaceDataConfig = interfaceList
        modal.config.databaseConfig = databaseList
        modal.config.sqlScriptConfig = sqlList
        modal.config.difyConfig = difyList
      })
    }
  }

  // 清除数据引擎内的响应数据(mock接口不清除)
  const interfaceList: any[] = []
  const databaseList: any[] = []
  const sqlList: any[] = []
  const difyList: any[] = []

  store.pageInterfaceList.forEach((interfaceItem: any) => {
    const interfaceItemCopy = JSON.parse(JSON.stringify(interfaceItem))
    if (!interfaceItemCopy.data.isMockData) {
      interfaceItemCopy.data.responseData = {}
    }
    if (interfaceItemCopy.type === DataSourceType.DATABASE) {
      databaseList.push(interfaceItemCopy)
    } else if (interfaceItemCopy.type === DataSourceType.SQL) {
      sqlList.push(interfaceItemCopy)
    } else if (interfaceItemCopy.type === DataSourceType.DIFY){
       difyList.push(interfaceItemCopy)
    } else {
      interfaceList.push(interfaceItemCopy)
    }
  })

  globalConfig.interfaceDataConfig = interfaceList
  globalConfig.databaseConfig = databaseList
  globalConfig.sqlScriptConfig = sqlList
  globalConfig.difyConfig = difyList
  const designConfigData = {
    list: componentList,
    config: globalConfig,
    eventConfig: eventConfig,
    modalList: copyModalList
  }
  return JSON.stringify(designConfigData, null, space)
}



export function getAISimpleConfigJson(space?: string | number) {
    const store = useDataStore()
    let globalConfig = store.pageGlobalConfig
    let eventConfig = store.pageEventConfig
  
    if (!eventConfig || Object.keys(eventConfig).length == 0) {
      eventConfig = {
        eventList: [
          {
            eventType: 'load',
            version: '1.0.0',
            actionList: []
          },
          {
            eventType: 'show',
            version: '1.0.0',
            actionList: []
          }
        ]
      }
    }
  
    // 清除组件多余属性
    const componentList = [] as any
    transformComponentConfigToAISimple(store.componentTreeList, componentList)
  
    
  
    // 清除数据引擎内的响应数据(mock接口不清除)
    
    const designConfigData = {
      list: componentList,     
    }
    return JSON.stringify(designConfigData, null, space)
  }