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
    let uuid = item.uuid
    let type = item.type
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
      if (componentObj.options.columns) {
        for (const columns of componentObj.options.columns) {
          if (columns.componentList && columns.componentList.length) {
            let tempComponentList = [] as any
            transformComponentConfigToFull(columns.componentList, tempComponentList, componentsConfigMap, isResetUUID, origin_uuid)
            columns.componentList = tempComponentList
          }
        }
      }
      if (componentObj.type == 'van-design-custom-table') {
        if (componentObj.options.columnsConfigList && componentObj.options.columnsConfigList.length > 0) {
          let config = componentObj.options.columnsConfigList[0]
          for (const key in config) {
            let tempComponentList = [] as any
            transformComponentConfigToFull(config[key], tempComponentList, componentsConfigMap, isResetUUID, origin_uuid)
            config[key] = tempComponentList
          }
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
  componentTreeList &&
    componentTreeList.forEach((componentItem: any) => {
      const componentItemCopy = JSON.parse(JSON.stringify(componentItem))

      delete componentItemCopy.component
      delete componentItemCopy.options.component
      delete componentItemCopy.icon
      delete componentItemCopy.name
      delete componentItemCopy.extraData

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
        // 自定义表格
        if (componentItemCopy.type == 'van-design-custom-table') {
          if (componentItemCopy.options.columnsConfigList && componentItemCopy.options.columnsConfigList.length > 0) {
            for (const config of componentItemCopy.options.columnsConfigList) {
              for (const key in config) {
                let tempComponentList = [] as any
                transformComponentConfigToSimple(config[key], tempComponentList)
                config[key] = tempComponentList
              }
            }
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

export function transformComponentConfigToAISimple(componentTreeList: any, tempList: any) {
    componentTreeList &&
      componentTreeList.forEach((componentItem: any) => {
        const componentItemCopy = JSON.parse(JSON.stringify(componentItem))
  
        delete componentItemCopy.component
        delete componentItemCopy.options.component
        delete componentItemCopy.icon
        delete componentItemCopy.name
        delete componentItemCopy.extraData

        delete componentItemCopy.isInputComponent
        delete componentItemCopy.isRefreshComponent
        delete componentItemCopy.options.interfaceDataConfig
        delete componentItemCopy.options.styleEditorConfig
        delete componentItemCopy.options.eventConfig
        delete componentItemCopy.options.commonConfig
        delete componentItemCopy.options.version
        delete componentItemCopy.options.contentDataSource
        delete componentItemCopy.options.customtimageIcon
        delete componentItemCopy.options.suffixIcon

        delete componentItemCopy.options.iconPreShow
        delete componentItemCopy.options.iconPosShow
        delete componentItemCopy.options.addonAfter
        delete componentItemCopy.options.addonBefore

        delete componentItemCopy.options.gutter
        delete componentItemCopy.options.layoutHeight
        delete componentItemCopy.options.layoutHeightUnit
        delete componentItemCopy.options.justify
        delete componentItemCopy.options.align
        delete componentItemCopy.options.labelAlign
        delete componentItemCopy.options.labelVerticalAlign
        delete componentItemCopy.options.layoutMargin
        delete componentItemCopy.options.layoutBorder
        delete componentItemCopy.options.backgroundColor
        delete componentItemCopy.options.backgroundOpacity
        delete componentItemCopy.options.isDialogFooterContainer
        delete componentItemCopy.options._data_origin_component_uuid
        delete componentItemCopy.options.enValue
        delete componentItemCopy.options.textFormat
        delete componentItemCopy.options.nowrap
        delete componentItemCopy.options.richText

        delete componentItemCopy.options.enText
        delete componentItemCopy.options.color
        delete componentItemCopy.options.themeChanged
        delete componentItemCopy.options.block

        delete componentItemCopy.options.inputType
        delete componentItemCopy.options.width
        delete componentItemCopy.options.labelShow
        delete componentItemCopy.options.isPassword
        delete componentItemCopy.options.enPlaceHolder
        delete componentItemCopy.options.enLabel
        delete componentItemCopy.options.disabled
        delete componentItemCopy.options.size

        delete componentItemCopy.options.contentDataEcho
        delete componentItemCopy.options.interfaceDataEchoConfig

        delete componentItemCopy.options.interfaceSearchEchoConfig
        delete componentItemCopy.options.interfaceSearch
        delete componentItemCopy.options.commonConfigAssignRights
        delete componentItemCopy.options.commonConfigAssignIsPermission
        delete componentItemCopy.options.commonConfigAssignCustomClass

        delete componentItemCopy.options.columnsData
        delete componentItemCopy.options.specialColumnsConfigs
        delete componentItemCopy.options.configPageSize
        delete componentItemCopy.options.reloadAsideMenu
        delete componentItemCopy.options.workFlow
        delete componentItemCopy.options.defaultPagination

        delete componentItemCopy.options.rowSelectKey
        delete componentItemCopy.options.selectedRowKeys
        delete componentItemCopy.options.rowSelectValuesByKeyStr
        delete componentItemCopy.options.rowIndexSwitch
        delete componentItemCopy.options.pagingTotalKey
        delete componentItemCopy.options.pagingTotalKey_id
        delete componentItemCopy.options.elUUID
        delete componentItemCopy.options.columnsReference
        delete componentItemCopy.options.columnsBackups
        delete componentItemCopy.options.columnByKeyMap
        delete componentItemCopy.options.tableWidth
        delete componentItemCopy.options.echoRowKey
        delete componentItemCopy.options.echoRowKey_id
        delete componentItemCopy.options.echoRowDataType
        delete componentItemCopy.options.echoRowKeyByInside
        delete componentItemCopy.options.paginationSwitch
        delete componentItemCopy.options.paginationInterfaceSwitch
        delete componentItemCopy.options.pagingTotalKeyConfig
        delete componentItemCopy.options.echoRowConfig
        delete componentItemCopy.options.summaryRowConfig
        delete componentItemCopy.options.expandSwitch
        delete componentItemCopy.options.expandId
        delete componentItemCopy.options.expandParentId
        delete componentItemCopy.options.coverBigComponent
        delete componentItemCopy.options.fixDynamicComponentConfig
        delete componentItemCopy.options.type
        delete componentItemCopy.options.chooseItemIndex
        delete componentItemCopy.options.addItemIndex
        delete componentItemCopy.options.isChangeComponentConfig
        delete componentItemCopy.options.customTime
        delete componentItemCopy.options.isDisabled
        delete componentItemCopy.options.isShowTime
        delete componentItemCopy.options.iconPosition
        delete componentItemCopy.options.dicId
        delete componentItemCopy.options.customStylePre
        delete componentItemCopy.options.defaultValueType
        delete componentItemCopy.options.forbidRange
        delete componentItemCopy.options.format
        delete componentItemCopy.options.selectRange
        delete componentItemCopy.options.startEnPlaceHolder
        delete componentItemCopy.options.endEnPlaceHolder
        delete componentItemCopy.options.prefixEnLabel
        delete componentItemCopy.options.suffixEnLabel
        delete componentItemCopy.options.legendAlign
        delete componentItemCopy.options.xAxisConfig
        delete componentItemCopy.options.yAxisConfig
        delete componentItemCopy.options.grid
        delete componentItemCopy.options.echartsOptions

        if(componentItemCopy.type =='van-design-table'){
            // componentItemCopy.options.columnsConfigList&&componentItemCopy.options.columnsConfigList.forEach(item=>{
            //     delete item.statusEventList
            // })
            delete componentItemCopy.options.columnsConfigList
            // delete componentItemCopy.options.defaultTableData
        // delete componentItemCopy.options.defaultColumnsData

            delete componentItemCopy.options.pagination
            delete componentItemCopy.options.leftFixedIndex
            delete componentItemCopy.options.rowSelectMethod
            delete componentItemCopy.options.columnSetSwitch
            delete componentItemCopy.options.resizableSwitch
        }else if(componentItemCopy.type =='van-design-select'){
            delete componentItemCopy.options.labelKey
            delete componentItemCopy.options.valueKey
            delete componentItemCopy.options.columns
        }

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
              transformComponentConfigToAISimple(col.componentList, tempComponentList)
              col.componentList = tempComponentList
            }
          }
          // 自定义表格
          if (componentItemCopy.type == 'van-design-custom-table') {
            if (componentItemCopy.options.columnsConfigList && componentItemCopy.options.columnsConfigList.length > 0) {
              for (const config of componentItemCopy.options.columnsConfigList) {
                for (const key in config) {
                  let tempComponentList = [] as any
                  transformComponentConfigToAISimple(config[key], tempComponentList)
                  config[key] = tempComponentList
                }
              }
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
 * @param exception 不需要递归查找的组件类型
 *
 */
export function transformComponentListTreeToPlan(obj: any, tempArr: any, exception?: string[]) {
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (exception && obj.type && exception.includes(obj.type)) {
          if (key === 'uuid' && obj.type && obj.options) {
            tempArr.push(obj)
          }
        } else {
          transformComponentListTreeToPlan(obj[key], tempArr, exception)
        }
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

/**
 * @功能 把PC组件列表转为对应的移动端组件列表
 *
 * @param obj componentList树状的数据结构
 *
 */
export function transformPcComponentListToMobile(componentList: any[], componentsConfigMap: any) {
  let list: any[] = []
  componentList.forEach((item: any) => {
    let mobileType = pcToMobileComponentMap[item.type]
    if (mobileType) {
      let mobileComponent = componentDeepClone(completeComponentConfig(item, mobileType, componentsConfigMap, 'pc-mobile'))
      list.push(mobileComponent)
    }
  })
  return list
}

/**
 * @功能 把PC组件列表转为对应的移动端组件列表
 *
 * @param obj componentList树状的数据结构
 *
 */
export function transformMobileComponentListToPc(componentList: any[], componentsConfigMap: any) {
  let list: any[] = []
  componentList.forEach((item: any) => {
    let pcType = mobileToPcComponentMap[item.type]
    if (pcType) {
      let mobileComponent = componentDeepClone(completeComponentConfig(item, pcType, componentsConfigMap, 'mobile-pc'))
      list.push(mobileComponent)
    }
  })
  return list
}

// 从PC端到移动端的组件转换规则(key:pc端的组件类型,value:移动端的组件类型)
const pcToMobileComponentMap: Record<string, string> = {
  //常用
  'van-design-field': 'van-design-field',
  'van-design-button': 'van-design-button',
  'van-design-text': 'van-design-text',
  'van-design-select': 'van-design-select',
  'van-design-icon': 'van-design-icon',
  'van-design-image': 'van-design-image',
  'van-design-list': 'van-design-list',
  'van-design-calendar': 'van-design-calendar',
  'van-design-tabs': 'van-design-tabs',
  //输入
  'van-design-checkbox': 'van-design-checkbox',
  'van-design-radio': 'van-design-radio',
  'van-design-stepper': 'van-design-stepper',
  'van-design-datetime-picker': 'van-design-datetime-picker',
  'van-design-cascade': 'van-design-cascade',
  'van-design-switch': 'van-design-switch',
  'van-design-upload-img': 'van-design-upload-img',
  'van-design-upload-file': 'van-design-upload-file',
  'van-design-file': 'van-design-file',
  //图表
  'van-design-chart-line': 'van-design-chart-line',
  'van-design-chart-histogram': 'van-design-chart-histogram',
  'van-design-chart-bar': 'van-design-chart-bar',
  'van-design-chart-ring': 'van-design-chart-ring',
  'van-design-progress': 'van-design-progress',
  //其他组件
  'van-design-divider': 'van-design-divider',
  'van-design-collapse': 'van-design-collapse',
  'van-design-steps': 'van-design-steps',
  'van-design-qrcode': 'van-design-qrcode'
}

// 从PC端到移动端的组件转换规则(key:pc端的组件类型,value:移动端的组件类型)
const mobileToPcComponentMap: Record<string, string> = {
  //常用
  'van-design-field': 'van-design-field',
  'van-design-button': 'van-design-button',
  'van-design-text': 'van-design-text',
  'van-design-select': 'van-design-select',
  'van-design-icon': 'van-design-icon',
  'van-design-image': 'van-design-image',
  'van-design-list': 'van-design-list',
  'van-design-calendar': 'van-design-calendar',
  'van-design-tabs': 'van-design-tabs',
  //输入
  'van-design-checkbox': 'van-design-checkbox',
  'van-design-radio': 'van-design-radio',
  'van-design-stepper': 'van-design-stepper',
  'van-design-datetime-picker': 'van-design-datetime-picker',
  'van-design-cascade': 'van-design-cascade',
  'van-design-switch': 'van-design-switch',
  'van-design-upload-img': 'van-design-upload-img',
  'van-design-upload-file': 'van-design-upload-file',
  'van-design-file': 'van-design-file',
  //图表
  'van-design-chart-line': 'van-design-chart-line',
  'van-design-chart-histogram': 'van-design-chart-histogram',
  'van-design-chart-bar': 'van-design-chart-bar',
  'van-design-chart-ring': 'van-design-chart-ring',
  'van-design-progress': 'van-design-progress',
  //其他组件
  'van-design-divider': 'van-design-divider',
  'van-design-collapse': 'van-design-collapse',
  'van-design-steps': 'van-design-steps',
  'van-design-qrcode': 'van-design-qrcode'
}

function completeComponentConfig(componentConfig: any, componentType: string, componentsConfigMap: any, type: 'mobile-pc' | 'pc-mobile') {
  let uuid = componentConfig.uuid
  let componentOptions = componentConfig.options
  let mobileConfigItem = componentDeepClone(componentsConfigMap[componentType])
  // if (newConfigItem.options) {
  //   // 对options进行处理，如果模板有某个属性而当前组件没有，则给当前组件添加改属性，并赋值默认值
  //   for (let newConfigKey in newConfigItem.options) {
  //     if (componentOptions[newConfigKey] === undefined) {
  //       componentOptions[newConfigKey] = newConfigItem.options[newConfigKey]
  //     }
  //   }
  // }

  mobileConfigItem.uuid = uuid
  mobileConfigItem.options = componentOptions
  //尽量拉平PC和移动端的不同属性
  if (type === 'pc-mobile') {
    if (componentType === 'van-design-checkbox' || componentType === 'van-design-radio') {
      componentOptions.columns = componentOptions.defaultTableData
    }
  } else {
    if (componentType === 'van-design-checkbox' || componentType === 'van-design-radio') {
      componentOptions.defaultTableData = componentOptions.columns
    }
  }

  return mobileConfigItem
}
