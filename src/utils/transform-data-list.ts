import { componentDeepClone } from './component-deep-clone-config'
import type { interfaceDataConfig } from './type'
import { generateUUID } from './uuid.js'
import { useDataStore } from '@/stores'

/**
 * 接口返回的配置数据是不能直接使用的，需要通过该方法处理一下，组装成可以直接用来渲染页面的配置数据
 * @param componentConfigList 接口返回的组件配置list。作用：这个配置数据不全，不能用来直接使用
 * @param componentList 处理之后可以直接渲染页面的组件配置list
 * @param componentsConfigMap 本地组件配置。作用：需要读取本地配置来补全接口返回的配置
 * @param isResetUUID 是否需要重新生成uuid
 */
export function transformComponentConfigToFull(componentConfigList: any, componentList: any, componentsConfigMap: any, isResetUUID = false, origin_uuid?: string) {
  // console.log('componentConfigList=', componentConfigList)
  // console.log('componentList=', componentList)
  // console.log('componentsConfigMap=', componentsConfigMap)

  componentConfigList.forEach((item: any) => {
    if (isResetUUID) {
      item.uuid = generateUUID()
      item.options && (item.options.commonConfigAssignSign = item.uuid)
    }
    let componentObj = {} as any
    let type = item.type
    let uuid = item.uuid
    let componentOptions = item.options

    let newConfigItem = componentDeepClone(componentsConfigMap[type])
    if (newConfigItem.options) {
      // 对options进行处理，如果模板有某个属性而当前组件没有，则给当前组件添加改属性，并赋值默认值
      for (let newConfigKey in newConfigItem.options) {
        if (componentOptions[newConfigKey] === undefined) {
          componentOptions[newConfigKey] = newConfigItem.options[newConfigKey]
        }
      }
    }
    newConfigItem.options = componentOptions
    componentObj = componentDeepClone(newConfigItem)
    componentObj.uuid = uuid

    if (componentObj.isNestedComponent) {
      for (const columns of componentObj.options.columns) {
        if (columns.componentList && columns.componentList.length) {
          let tempComponentList = [] as any
          transformComponentConfigToFull(columns.componentList, tempComponentList, componentsConfigMap, isResetUUID, origin_uuid)
          columns.componentList = tempComponentList
        }
      }
    }

    if (origin_uuid) {
      componentObj.options._data_origin_component_uuid = origin_uuid
    }

    // console.log('componentObj=', componentObj)
    componentList.push(componentObj)
  })
}

/**
 * @功能 清除配置文件中多余的字段,用于保存到接口
 *
 * @param componentTreeList 组件树
 * @param tempList 清理后的配置文件
 *
 *
 */
export function transformComponentConfigToSimple(componentTreeList: any, tempList: any) {
  componentTreeList.forEach((componentItem: any) => {
    const componentItemCopy = JSON.parse(JSON.stringify(componentItem))

    delete componentItemCopy.component
    delete componentItemCopy.options.component
    delete componentItemCopy.icon
    delete componentItemCopy.name

    //清理图表数据
    if (componentItemCopy.options.echartsOptions) {
      delete componentItemCopy.options.echartsOptions.series
      delete componentItemCopy.options.echartsOptions.color
      delete componentItemCopy.options.echartsOptions.grid
      delete componentItemCopy.options.echartsOptions.xAxis
      delete componentItemCopy.options.echartsOptions.yAxis
      delete componentItemCopy.options.echartsOptions.legend
    }

    if (componentItemCopy.isNestedComponent) {
      //嵌套组件,需要递归
      if (componentItemCopy.options.columns && componentItem.options.columns.length > 0) {
        for (const col of componentItemCopy.options.columns) {
          let tempComponentList = [] as any
          transformComponentConfigToSimple(col.componentList, tempComponentList)
          col.componentList = tempComponentList
        }
      }
    } else {
      delete componentItemCopy.options.treeData
      delete componentItemCopy.options.optionsData
      if (componentItemCopy.options.interfaceDataConfig && componentItemCopy.options.interfaceDataConfig.tableData) {
        delete componentItemCopy.options.interfaceDataConfig.tableData
      }
      if (componentItemCopy.options.interfaceDataConfig && componentItemCopy.options.interfaceDataConfig.tableData) {
        componentItemCopy.options.interfaceDataConfig.value = ''
      }
    }
    tempList.push(componentItemCopy)
  })
}

/**
 * @功能 把componentList从树型的数据结构转换成扁平的一维数据结构
 *
 * @param obj componentList树状的数据结构
 *
 * @param tempArr componentList扁平的数据结构
 *
 */
export function transformComponentListTreeToPlan(obj: any, tempArr: any) {
  // 遍历 复制数组或对象

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        transformComponentListTreeToPlan(obj[key], tempArr)
      }
      if (key === 'uuid' && obj.type && obj.options) {
        // 不止判断uuid，还需确认是不是一个完整的组件配置对象
        tempArr.push(obj)
      }
    }
  }
}

/**
 * @功能 把componentList以键值对存入store
 *
 * @param obj componentList树状的数据结构
 *
 */
export function componentListTreeToStore(obj: any) {
  const store = useDataStore()
  let tempArr: any[] = []
  transformComponentListTreeToPlan(obj, tempArr)
  for (const item of tempArr) {
    store.componentListMap[item['uuid']] = item
  }
}

/**
 * @功能 把全局变量列表从树状结构转为{groupId:{variableKey:{}}}的结构,并存入store
 *
 * @param globalVariableList 树状结构的全局变量列表
 *
 */
export function globalVariableToStore(globalVariableList: any) {
  const store = useDataStore()
  store.globalVariableList = globalVariableList
  for (const group of globalVariableList) {
    store.globalVariableMap[group.scopeId] = {}
    if (group.children.length > 0) {
      for (const variable of group.children) {
        store.globalVariableMap[group.scopeId][variable.variableKey] = variable.defaultValue
      }
    }
  }
}

// interface InterfaceDataConfig {
//   id: string
//   uuid: string
//   name: string
//   isMockData: boolean
//   paramsConfigs: any[]
// }

//查找配置文件中所有的interfaceDataConfig,且id不为空
export function findInterfaceDataConfigs(obj: any): interfaceDataConfig[] {
  let result: interfaceDataConfig[] = []

  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        result = result.concat(findInterfaceDataConfigs(obj[i]))
      }
    } else {
      for (let key in obj) {
        if (key === 'interfaceDataConfig') {
          const interfaceDataConfig = obj[key] as interfaceDataConfig
          if (interfaceDataConfig.id) {
            result.push(interfaceDataConfig)
          }
        }
        result = result.concat(findInterfaceDataConfigs(obj[key]))
      }
    }
  }

  return result
}

/**
 * @功能 把一维数组数据转为树型数据
 *
 * @param arr 一维数组数据
 *
 * @param options 选项字段名称,格式为 {
    value:'',
    name:'',
    id:'',
    parentId:''
  },
 *
 */
export function transformDataListToCascade(arr: any, options: any) {
  let map = {} as any
  let newData: any[] = []
  let copyArr = JSON.parse(JSON.stringify(arr))
  copyArr.forEach((item: any) => {
    item.label = item[options.name].toString()
    item.value = item[options.value].toString()
    map[item[options.id]] = item
    map[item[options.id]].children = []
  })
  copyArr.forEach((item: any) => {
    let mapItem = map[item[options.parentId]]
    if (mapItem) {
      mapItem.children.push(item)
    } else {
      newData.push(item)
    }
  })
  return newData
}
