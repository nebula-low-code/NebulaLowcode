import { componentDeepClone } from '@/utils/component-deep-clone-config'
import { generateUUID } from '@/utils/uuid'
import type { componentConfigItemType } from './type'

/**
 *
 * @param componentsConfigs 组件的本地配置（没有options的静态模板）
 * @param type 组件类型
 * @param options 组件options
 * @returns 新组件
 */
export function componentCopyConfig(componentsConfigs: any, type: any, options: any): any {
  let replacements = {} as any //要替换的uuid  key:旧id value:新id
  function copyConfig(componentsConfigs: any, type: any, options: any): componentConfigItemType {
    let componentObj = {} as any
    componentsConfigs.forEach((configItem: any) => {
      if (configItem.type === type) {
        const newConfigItem = componentDeepClone(configItem)
        newConfigItem.options = componentDeepClone(options)
        // 如果是嵌套组件要遍历它的所有子组件
        if (newConfigItem.isNestedComponent) {
          let childrenComponentColumn = newConfigItem.options.columns
          if (childrenComponentColumn && childrenComponentColumn.length) {
            childrenComponentColumn.forEach((columns: any) => {
              if (columns.componentList && columns.componentList.length) {
                let tempComponentList = [] as any[]
                columns.componentList.forEach((cItem: any) => {
                  let obj = copyConfig(componentsConfigs, cItem.type, cItem.options)
                  tempComponentList.push(obj)
                })
                columns.componentList = tempComponentList
              }
            })
          }
        }
        componentObj = componentDeepClone(newConfigItem)
      }
    })
    let oldUUid = componentObj.options.commonConfigAssignSign
    let newUUid = generateUUID()
    componentObj.uuid = newUUid
    componentObj.options.commonConfigAssignSign = componentObj.uuid
    replacements[oldUUid] = newUUid
    return componentObj
  }
  //给组件赋予新的uuid后,必须把关联的relevanceComponentUuid也同步替换掉,否则会找不到绑定的组件
  let config = copyConfig(componentsConfigs, type, options)
  replaceKeyValues(config, replacements)
  return config
}

function replaceKeyValues(obj: any, replacements: Record<string, string>): void {
  if (typeof obj === 'object' && obj !== null) {
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        replaceKeyValues(obj[i], replacements)
      }
    } else {
      for (let key in obj) {
        if (key === 'relevanceComponentUuid' && obj[key] in replacements) {
          obj[key] = replacements[obj[key]]
        }
        if (key === '_data_origin_component_uuid' && obj[key] in replacements) {
          obj[key] = replacements[obj[key]]
        }
        if (
          key === 'key' &&
          typeof obj[key] === 'string' &&
          obj[key].startsWith('van-') &&
          obj[key] in replacements
        ) {
          //这种情况代表组件绑定了另一个组件的值
          obj[key] = replacements[obj[key]]
        }
        if (key === 'operateRefresh') {
          //数据刷新的数据结构为list内放了一个string列表
          let tempKeys = [] as any
          for (let i = 0; i < obj[key].length; i++) {
            let refreshId: any = obj[key][i]
            if (refreshId in replacements) {
              tempKeys.push(replacements[refreshId])
            }
          }
          obj[key] = tempKeys
        }
        replaceKeyValues(obj[key], replacements)
      }
    }
  }
}
