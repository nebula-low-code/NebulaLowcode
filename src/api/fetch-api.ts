import { DataSourceType } from '@/utils/constants'
import { queryApiDataService } from '@/api/api'
import { type interfaceDataConfig, type paramConfig } from '@/utils/type'
import { useDataStore } from '@/stores'
import { getParamValue } from '@/utils/param-value'

export function fetchApiList(apiList?: interfaceDataConfig[], pageId?: any) {
  const store = useDataStore()

  //请求接口列表,并把返回数据保存到store中
  if (apiList && apiList.length > 0) {
    apiList.forEach((api) => {
      if (api.type === DataSourceType.INTERFACE || api.type === DataSourceType.CONNECT) {
        if (!api.data.isMockData) {
          if (api.data.useMockData) {
            //展示mock数据
            api.data.responseData = api.data.mockResponseData
            store.setInterfaceData(api.id, api)
          } else {
            //请求接口
            let params = {} as any
            api.data.paramsConfigs &&
              api.data.paramsConfigs.forEach((paramConfig) => {
                params[paramConfig.param_name] = getParamValue(paramConfig, pageId)
              })
            queryApiDataService({
              dataApiId: api.data.id,
              params: params
            })
              .then((res) => {
                //为了提高编辑端性能,最多保留10条数据
                for (const key in res.data) {
                  if (Object.prototype.hasOwnProperty.call(res.data, key)) {
                    let element = res.data[key]
                    if (Array.isArray(element) && element.length > 10) {
                      res.data[key] = element.slice(0, 10)
                    }
                  }
                }
                api.data.responseData = res.data
                store.setInterfaceData(api.id, api)
              })
              .catch((err) => {
                store.setInterfaceData(api.id, api)
              })
          }
        } else {
          //mock数据
          store.setInterfaceData(api.id || api.data.id, api)
        }
      }
    })
  }
}

export function fetchApi(paramsConfig: paramConfig[], apiId: string | number, pageId: any, rowData?: any) {
  let params = {} as any
  paramsConfig.forEach((param) => {
    params[param.param_name] = getParamValue(param, pageId, rowData)
  })
  return queryApiDataService({
    dataApiId: apiId,
    params: params
  })
}
