import { transformComponentConfigToSimple } from '@/utils/transform-data-list'
import { useDataStore } from '@/stores'
export function getCleanConfigJson(space?: string | number) {
  const store = useDataStore()
  let globalConfig = store.globalConfig
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

  // 清除数据引擎内的响应数据(mock接口不清除)
  const interfaceList: any[] = []
  store.interfaceList.forEach((interfaceItem: any) => {
    const interfaceItemCopy = JSON.parse(JSON.stringify(interfaceItem))
    if (!interfaceItemCopy.data.isMockData) {
      interfaceItemCopy.data.responseData = {}
    }
    interfaceList.push(interfaceItemCopy)
  })
  globalConfig.interfaceDataConfig = interfaceList

  const designConfigData = {
    list: componentList,
    config: globalConfig,
    eventConfig: eventConfig
  }
  return JSON.stringify(designConfigData, null, space)
}
