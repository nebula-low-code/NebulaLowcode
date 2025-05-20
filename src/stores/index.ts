import { defineStore } from 'pinia'
import { queryApiDataService, getProcessParamService } from '@/api/api'
import { type pageConfigType, type modalConfigType, type paramConfig, type interfaceDataConfig, type databaseConfig } from '@/utils/type'
import { CustomEventsType } from '@/utils/constants'
import { transformComponentListTreeToPlan } from '@/utils/transform-data-list'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
      isReadonly: false, //项目是否只读,只读项目需要隐藏保存按钮
      execUrl: '',
      executorSwitch: false,
      isShowLeftMenu: true,
      isShowRightMenu: true,
      rightMenuKey: 'basic', //右边栏当前打开的tab: basic/data
      dialogEventVisible: false, //事件窗口
      workflowDialogEventVisible: false, //工作流事件窗口
      dialogStatusVisible: false, //状态渲染窗口
      eventType: 'click', //事件类型
      eventList: [] as any[], //事件列表
      customEvents: {} as any, //事件配置中的自定义登陆,包括扫码/微信登录/企微登录
      iconList: [] as any[], //iconfont图标
      permissionList: [] as any[], //组件权限列表

      pageConfig: {} as pageConfigType, //页面配置

      currentCheckedComponentUUID: '', // 当前选中的组件id
      currentCheckedComponent: {} as any, // 当前选中的组件
      componentListMap: {} as any, // 所有组件的组件字典
      componentTreeList: [] as any[], //页面的组件树(不包含页面内弹窗)
      pageInterfaceMap: {} as any, // 页面的接口(弹窗的接口和页面独立)
      modalInterfaceMap: {} as any, //弹窗的接口,格式为:{窗口的uuid:interfaceMap}
      allInterfaceMap: {} as any, //所有接口

      globalVariableList: [] as any[], //全局变量列表
      globalVariableMap: {} as any, //保存全局变量的字典

      pageVariableMap: {} as any, //保存页面局部变量的字典,格式为:{key:value}

      functionList: [] as any[], //函数列表
      scriptList: [] as any[], //脚本列表

      isShowEventLeftMenu: true, // 事件左侧菜单是否展示
      curDiagram: {} as any, // 当前选中事件
      interfaceListAll: [] as any[], //后端接口和第三方系统接口列表
      eventInterfaceList: [] as any[], //接口调用事件中选择的接口
      reportTreeList: [] as any[], //页面文件树
      businessComponentTreeList: [] as any[], //业务组件

      isShowTableColumnConfig: false, // 显示表格列配置
      isShowTableColumnChildrenConfig: false, // 显示表格子列配置
      isShowTableColumnSubChildrenConfig: false, // 显示表格二级子列配置
      isShowTableOperateConfig: false, // 显示表格操作配置
      curColumn: {} as any, //表格配置列special

      deviceType: '', //pc或者mobile
      merchantId: 0 as any,
      projectId: 0 as any,
      token: '' as any,
      phone: '' as any,
      logoutFlag: false,
      nebulaMessage: {} as any,
      mobileTransformScale: '1x',
      currentModalUuid: 'page', //当前选中的弹窗uuid,page代表页面
      modalComponentTreeListMap: {} as any, //弹窗里的组件树:{uuid:componentTreeList}
      dataModelMap: {} as any //数据模型字典
    }
  },
  getters: {
    pageGlobalConfig: (state) => state.pageConfig.config,
    pageEventConfig: (state) => state.pageConfig.eventConfig,
    currentEvent: (state) => state.eventList.find((item: any) => item.eventType === state.eventType),
    pageInterfaceList: (state) => Object.values(state.pageInterfaceMap), //页面接口列表
    currentModalInterfaceList: (state) => (state.modalInterfaceMap[state.currentModalUuid] ? Object.values(state.modalInterfaceMap[state.currentModalUuid]) : []), //当前选中的弹窗的接口列表
    interfaceList: (state) => {
      let list: interfaceDataConfig[] = []
      if (state.currentModalUuid === 'page') {
        list = Object.values(state.pageInterfaceMap)
      } else {
        list = state.modalInterfaceMap[state.currentModalUuid] ? Object.values(state.modalInterfaceMap[state.currentModalUuid]) : []
      }
      console.log('interfaceList****', list)

      return list
    }, //当前的接口列表(页面或弹窗)
    currentModalInterfaceMap: (state) => state.modalInterfaceMap[state.currentModalUuid],
    allComponentList: (state) => Object.values(state.componentListMap),
    allInputComponentList: (state) => Object.values(state.componentListMap).filter((item: any) => item.isInputComponent),
    allRefreshComponentList: (state) => Object.values(state.componentListMap).filter((item: any) => item.isRefreshComponent),
    currentImageComponentList: (state) => {
      let list: any[] = []
      if (state.currentModalUuid === 'page') {
        list = Object.values(state.componentListMap).filter((item: any) => item.type === 'van-design-image')
      } else {
        //组件刷新,允许选择父页面和弹窗内的组件
        if (state.modalComponentTreeListMap) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.modalComponentTreeListMap[state.currentModalUuid], tempArr)
          list = tempArr.filter((item: any) => item.type === 'van-design-image')
        }
        if (state.componentTreeList) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.componentTreeList, tempArr)
          let pageRefreshList = tempArr.filter((item: any) => item.type === 'van-design-image')
          list = list.concat(pageRefreshList)
        }
      }
      return list
    },
    currentRefreshComponentList: (state) => {
      let list: any[] = []
      if (state.currentModalUuid === 'page') {
        list = Object.values(state.componentListMap).filter((item: any) => item.isRefreshComponent)
      } else {
        //组件刷新,允许选择父页面和弹窗内的组件
        if (state.modalComponentTreeListMap) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.modalComponentTreeListMap[state.currentModalUuid], tempArr)
          list = tempArr.filter((item: any) => item.isRefreshComponent)
        }
        if (state.componentTreeList) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.componentTreeList, tempArr)
          let pageRefreshList = tempArr.filter((item: any) => item.isRefreshComponent)
          list = list.concat(pageRefreshList)
        }
      }
      return list
    },
    currentInputComponentList: (state) => {
      let list: any[] = []
      if (state.currentModalUuid === 'page') {
        list = Object.values(state.componentListMap).filter((item: any) => item.isInputComponent)
      } else {
        //2025-02-11 区分弹窗以及页面的组件名称，通过添加前缀
        let modalName = ''
        state.pageConfig.modalList.forEach((modalItem: any) => {
          if (modalItem.uuid == state.currentModalUuid) {
            modalName = modalItem.config.reportName
          }
        })
        if (modalName) {
          modalName = `(${modalName})`
        }
        if (state.modalComponentTreeListMap) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.modalComponentTreeListMap[state.currentModalUuid], tempArr)
          list = tempArr
            .filter((item: any) => item.isInputComponent)
            .map((item) => ({
              ...item,
              options: {
                ...item.options,
                commonConfigAssignName: modalName + item.options.commonConfigAssignName
              }
            }))
        }
        if (state.componentTreeList) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(state.componentTreeList, tempArr)
          let pageRefreshList = tempArr.filter((item: any) => item.isInputComponent)
          list = list.concat(pageRefreshList)
        }
      }
      return list
    },
    modalList: (state) => state.pageConfig.modalList,
    containScanEvent: (state) => 'event-operate-scan' in state.customEvents,
    containWechatEvent: (state) => 'event-operate-wxlogin' in state.customEvents,
    containQyWechatEvent: (state) => 'event-operate-wxQyLogin' in state.customEvents,
    containOpenIdEvent: (state) => 'event-operate-openid' in state.customEvents,
    containGetTokenEvent: (state) => 'event-operate-token-get' in state.customEvents,
    containIAMTokenEvent: (state) => 'event-operate-iam-code' in state.customEvents,
    containGetLanguageEvent: (state) => 'event-operate-get-language' in state.customEvents,
    containMap: (state) => 'event-operate-map' in state.customEvents,
    containDataInsertEvent: (state) => 'event-data-insert' in state.customEvents,
    currentModalConfig: (state) => state.pageConfig.modalList.find((item) => item.uuid === state.currentModalUuid) || ({} as modalConfigType),
    currentModalComponentTreeList: (state) => state.modalComponentTreeListMap[state.currentModalUuid],
    isPageDesigner: (state) => state.currentModalUuid === 'page'
  },
  actions: {
    openEventDialog(type: string, componentType: 'component' | 'page' | 'workflow' | 'column') {
      if (componentType === 'workflow') {
        this.dialogEventVisible = false
        this.workflowDialogEventVisible = true
      } else {
        this.workflowDialogEventVisible = false
        this.dialogEventVisible = true
      }

      this.eventType = type
      if (componentType === 'component' || componentType === 'workflow') {
        this.curColumn = {}
        this.eventList = this.currentCheckedComponent.options.eventConfig.eventList
      } else if (type == 'click' && componentType === 'column') {
        this.eventList = this.curColumn.eventConfig.eventList
      } else if (type == 'confirm' && componentType === 'column') {
        this.eventList = this.curColumn.confirmEventList
      } else {
        if (this.pageConfig && this.pageConfig.eventConfig) {
          if (this.isPageDesigner) {
            this.eventList = this.pageConfig.eventConfig.eventList
          } else {
            this.eventList = this.currentModalConfig.eventConfig.eventList
          }
          console.log('eventList----', this.eventList)
        } else {
          this.eventList = []
        }
      }

      this.isShowEventLeftMenu = true
      this.interfaceListAll = []
      //自定义事件
      this.queryCustomEvents()
      //事件中配置的所有接口请求
      this.queryEventInterfaceList()
    },
    openStatusDialog() {
      this.dialogStatusVisible = true
    },
    closeEventDialog() {
      this.dialogEventVisible = false
      this.workflowDialogEventVisible = false
    },
    closeStatusDialog() {
      this.dialogStatusVisible = false
    },

    queryCustomEvents() {
      //遍历事件列表,找出所有自定义事件
      let actionList = []
      if (this.eventList) {
        for (const event of this.eventList) {
          if (event.eventType === this.eventType) {
            actionList = event.actionList
            break
          }
        }
      } else {
        this.eventList = []
      }

      for (const action of actionList) {
        if (CustomEventsType.indexOf(action.type) > -1) {
          this.saveCustomEvent(action.type, action.title)
        }
      }
    },

    queryEventInterfaceList() {
      //遍历事件列表,找出所有接口调用事件,请求接口的返回值并放入store中
      let actionList = []
      if (this.eventList) {
        for (const event of this.eventList) {
          if (event.eventType === this.eventType) {
            actionList = event.actionList
            break
          }
        }
      } else {
      }

      this.eventInterfaceList = []
      for (const action of actionList) {
        if (action.type === 'event-operate-interface' || action.type === 'event-operate-export' || action.type === 'event-operate-import' || action.type === 'event-operate-template-export') {
          getProcessParamService({
            processId: action.properties.operateApiId
          }).then((res) => {
            if (this.eventInterfaceList.filter((item) => item.id == action.properties.operateApiId).length == 0) {
              this.eventInterfaceList.push({
                id: action.properties.operateApiId,
                name: res.data.processName,
                res: res.data.res
              })
            }
          })
        }
      }
    },

    findParentObjects(data: any, targetUuid: string, path = []) {
      if (data.uuid === targetUuid) {
        return path
      }

      if (data.options && data.options.columns && data.options.columns.length > 0) {
        for (const column of data.options.columns) {
          if (column.componentList && column.componentList.length > 0) {
            for (const component of column.componentList) {
              if (component.uuid === targetUuid) {
                return path.concat(data)
              }

              if (component.options) {
                const currentPath = path.concat(data)
                const result: any[] = this.findParentObjects(component, targetUuid, currentPath)
                if (result.length > 0) {
                  return result
                }
              }
            }
          }
        }
      }
      if (data.type === 'van-design-custom-table') {
        if (data.options.columnsConfigList) {
          const config = data.options.columnsConfigList[0]
          for (const key in config) {
            let componentList = config[key]
            if (componentList && componentList.length > 0) {
              for (const component of componentList) {
                if (component.uuid === targetUuid) {
                  return path.concat(data)
                }

                if (component.options) {
                  const currentPath = path.concat(data)
                  const result: any[] = this.findParentObjects(component, targetUuid, currentPath)
                  if (result.length > 0) {
                    return result
                  }
                }
              }
            }
          }
        }
      }
      return []
    },

    onChangeCurrentComponentUUID(uuid: string) {
      this.currentCheckedComponentUUID = uuid
      this.currentCheckedComponent = this.componentListMap[uuid] || {}
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = false
      this.isShowTableColumnSubChildrenConfig = false
      this.isShowTableOperateConfig = false
    },
    currentComponentParentList() {
      let list = []
      let comp = this.componentListMap[this.currentCheckedComponentUUID]
      if (comp) {
        let tree = {}
        if (this.isPageDesigner) {
          tree = {
            type: 'page',
            options: {
              columns: [
                {
                  componentList: this.componentTreeList
                }
              ]
            }
          }
        } else {
          tree = {
            type: 'modal',
            options: {
              columns: [
                {
                  componentList: this.currentModalComponentTreeList
                }
              ]
            }
          }
        }
        list = this.findParentObjects(tree, comp.uuid)

        list.push(comp)
        list.splice(0, 1)
        // console.log('parent list = ', list.splice(0, 1))
      }
      return list
    },
    componentConfigByUuid(uuid: string) {
      return this.componentListMap[uuid]
    },
    globalVariableByKey(variableKey: string, groupId: any) {
      let value = ''
      let group = this.globalVariableMap[groupId]
      if (group) {
        let varItem = group[variableKey]
        value = varItem
      }
      return value
    },
    setPageVariableList(pageVariableList: paramConfig[]) {
      if (!pageVariableList || pageVariableList.length === 0) {
        return
      }

      for (const param of pageVariableList) {
        this.setPageVariable(param.variableName, param.variableValue)
      }
    },
    setPageVariable(key: string, value: string) {
      this.pageVariableMap[key] = value
    },
    pageVariablesByKey(key: string) {
      if (!key) {
        return ''
      }
      return this.pageVariableMap[key]
    },
    // setComponentByUuid(uuid: string, componentItem: object, modalId?: string) {
    //   if (modalId && modalId !== 'page') {
    //     this.setModalInterfaceData(modalId, id, data)
    //   } else {
    //     this.componentListMap[uuid] = componentItem
    //   }
    //   this.allInterfaceMap[id] = data
    // },
    // setModalComponent(modalId: string, componentUuid: any, componentItem: object) {
    //   if (!this.modalInterfaceMap[modalId]) {
    //     this.modalInterfaceMap[modalId] = {}
    //   }
    //   this.modalInterfaceMap[modalId][interfaceId] = data
    // },
    setInterfaceData(id: any, data: object, modalId?: string) {
      if (modalId && modalId !== 'page') {
        this.setModalInterfaceData(modalId, id, data)
      } else {
        this.pageInterfaceMap[id] = data
      }
      this.allInterfaceMap[id] = data
    },
    setDataModel(id: any, data: object) {
      this.dataModelMap[id] = data
    },
    clearInterfaceData() {
      this.pageInterfaceMap = {}
    },
    setModalInterfaceData(modalId: string, interfaceId: any, data: object) {
      if (!this.modalInterfaceMap[modalId]) {
        this.modalInterfaceMap[modalId] = {}
      }
      this.modalInterfaceMap[modalId][interfaceId] = data
    },

    addInterface(interfaceConfig: any) {
      interfaceConfig.data.responseData = {}
      //返回值
      queryApiDataService({ dataApiId: interfaceConfig.data.id })
        .then((res) => {
          if (res.data) {
            interfaceConfig.data.responseData = res.data || {}
          }
          this.setInterfaceData(interfaceConfig.id, interfaceConfig, this.currentModalUuid)
          //入参
          this.queryProcessParam(interfaceConfig)
        })
        .catch((err) => {
          this.setInterfaceData(interfaceConfig.id, interfaceConfig, this.currentModalUuid)
          this.queryProcessParam(interfaceConfig)
        })
    },
    queryProcessParam(interfaceConfig: any) {
      getProcessParamService({ processId: interfaceConfig.data.id }).then((paramRes) => {
        if (paramRes.data) {
          let params = paramRes.data.params
          interfaceConfig.data.paramsConfigs = []
          for (const param of params) {
            interfaceConfig.data.paramsConfigs.push({
              param_name: param.name,
              param_value: ''
            })
          }
        }
      })
    },
    interfaceDataById(id: any) {
      return this.allInterfaceMap[id]
    },
    dataModelById(id: any) {
      return this.dataModelMap[id]
    },
    modalInterfaceListByUuid(uuid: string) {
      if (this.modalInterfaceMap[uuid]) {
        return Object.values(this.modalInterfaceMap[uuid])
      } else {
        return []
      }
    },
    showTableColumnConfig() {
      this.isShowTableColumnConfig = true
      // this.curColumn=column;
    },
    showTableColumnChildrenConfig() {
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = true
      this.isShowTableColumnSubChildrenConfig = false
      // this.curColumn=column;
    },
    showTableColumnSubChildrenConfig() {
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = false
      this.isShowTableColumnSubChildrenConfig = true
    },
    showTableOperateConfig() {
      this.isShowTableOperateConfig = true
    },
    closeTableColumnConfig() {
      this.isShowTableColumnConfig = false
      // this.curColumn={};
    },
    closeTableColumnChildrenConfig() {
      this.isShowTableColumnConfig = true
      this.isShowTableColumnChildrenConfig = false
      this.isShowTableColumnSubChildrenConfig = false
      // this.curColumn={};
    },
    backToColumnChildrenConfig() {
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = true
      this.isShowTableColumnSubChildrenConfig = false
    },
    closeTableOperateConfig() {
      this.isShowTableOperateConfig = false
      // this.curColumn={};
    },
    saveCustomEvent(key: any, value: any) {
      this.customEvents[key] = value
    },
    deleteCustomEvent(key: string) {
      delete this.customEvents[key]
    },
    deleteModalConfig(uuid: string) {
      this.pageConfig.modalList = this.modalList.filter((item: any) => item.uuid !== uuid)
    },
    componentListByType(type: string) {
      let comps = []
      if (this.isPageDesigner) {
        comps = this.allComponentList
      } else {
        if (this.modalComponentTreeListMap) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(this.modalComponentTreeListMap[this.currentModalUuid], tempArr)
          comps = tempArr
        }
        if (this.componentTreeList) {
          let tempArr: any[] = []
          transformComponentListTreeToPlan(this.componentTreeList, tempArr)
          comps = comps.concat(tempArr)
        }
      }
      return comps.filter((item) => item.type === type)
    }
  }
})

import defaultTheme from '@/styles/defaultTheme.json'
import { cloneDeep } from 'lodash'
//主题
export const useThemeStore = defineStore('theme', {
  state() {
    return {
      defaultTheme: { token: cloneDeep(defaultTheme.token) },
      themeConfig: { token: cloneDeep(defaultTheme.token) }
    }
  },
  actions: {
    updateTheme(theme: any) {
      if (theme && theme.token) {
        this.themeConfig.token = Object.assign(this.themeConfig.token, theme.token)
      }
    }
  }
})
