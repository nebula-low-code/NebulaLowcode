import { defineStore } from 'pinia'
import { queryApiDataService, getProcessParamService, getConnectTreeList } from '@/api/api'
import { type pageConfigType, type paramConfig } from '@/utils/type'
import { CustomEventsType } from '@/utils/constants'

export const useDataStore = defineStore('data', {
  state: () => {
    return {
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
      componentTreeList: [] as any[], //组件树
      interfaceMap: {} as any, // 接口地图：格式为object

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
      isShowTableOperateConfig: false, // 显示表格操作配置
      curColumn: {} as any, //表格配置列special

      deviceType: '', //pc或者mobile
      token: '' as any,
      phone: '' as any,
      logoutFlag: false,
      nebulaMessage: {} as any
    }
  },
  getters: {
    globalConfig: (state) => state.pageConfig.config,
    pageEventConfig: (state) => state.pageConfig.eventConfig,
    interfaceList: (state) => Object.values(state.interfaceMap),
    allComponentList: (state) => Object.values(state.componentListMap),
    inputComponentList: (state) => Object.values(state.componentListMap).filter((item: any) => item.isInputComponent),
    refreshComponentList: (state) => Object.values(state.componentListMap).filter((item: any) => item.isRefreshComponent),
    containScanEvent: (state) => 'event-operate-scan' in state.customEvents,
    containWechatEvent: (state) => 'event-operate-wxlogin' in state.customEvents,
    containQyWechatEvent: (state) => 'event-operate-wxQyLogin' in state.customEvents,
    containOpenIdEvent: (state) => 'event-operate-openid' in state.customEvents,
    containGetTokenEvent: (state) => 'event-operate-token-get' in state.customEvents,
    containMap: (state) => 'event-operate-map' in state.customEvents
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
          this.eventList = this.pageConfig.eventConfig.eventList
        } else {
          this.eventList = []
        }
      }

      this.isShowEventLeftMenu = true
      this.interfaceListAll = []
      //自定义事件
      this.queryCustomEvents()
      // //后端接口
      // this.queryInterfaceDataList()
      // //第三方接口
      // this.queryConnectList()
      // //事件中配置的所有接口请求
      // this.queryEventInterfaceList()
      // //页面
      // this.queryReportTreeList()
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
      for (const event of this.eventList) {
        if (event.eventType === this.eventType) {
          actionList = event.actionList
          break
        }
      }
      for (const action of actionList) {
        if (CustomEventsType.indexOf(action.type) > -1) {
          this.saveCustomEvent(action.type, action.title)
        }
      }
    },

    // queryInterfaceDataList() {
    //   getProjectFileTreeList().then((res: any) => {
    //     this.interfaceListAll.push({
    //       dataType: 'directory',
    //       name: '后端接口',
    //       queryId: 1,
    //       rank: 1,
    //       treeId: 1,
    //       children: res.dataList || []
    //     })
    //   })
    // },
    // queryConnectList() {
    //   getConnectTreeList().then((res: any) => {
    //     if (res.code == 0) {
    //       this.interfaceListAll.push(...res.dataList)
    //     }
    //   })
    // },

    queryEventInterfaceList() {
      //遍历事件列表,找出所有接口调用事件,请求接口的返回值并放入store中
      let actionList = []
      for (const event of this.eventList) {
        if (event.eventType === this.eventType) {
          actionList = event.actionList
          break
        }
      }
      this.eventInterfaceList = []
      for (const action of actionList) {
        if (action.type === 'event-operate-interface' || action.type === 'event-operate-export' || action.type === 'event-operate-import') {
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

    queryReportTreeList() {
      getReportTreeList({
        queryType: this.deviceType
      }).then((res: any) => {
        this.reportTreeList = res.dataList || []
      })
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
      return []
    },

    onChangeCurrentComponentUUID(uuid: string) {
      this.currentCheckedComponentUUID = uuid
      this.currentCheckedComponent = this.componentListMap[uuid] || {}
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = false
      this.isShowTableOperateConfig = false
    },
    currentComponentParentList() {
      let list = []
      let comp = this.componentListMap[this.currentCheckedComponentUUID]
      if (comp) {
        let tree = {
          type: 'page',
          options: {
            columns: [
              {
                componentList: this.componentTreeList
              }
            ]
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
    setInterfaceData(id: any, data: object) {
      this.interfaceMap[id] = data
    },

    clearInterfaceData() {
      this.interfaceMap = {}
    },

    addInterface(interfaceConfig: any) {
      interfaceConfig.data.responseData = {}
      //返回值
      queryApiDataService({ dataApiId: interfaceConfig.data.id })
        .then((res) => {
          if (res.data) {
            interfaceConfig.data.responseData = res.data || {}
            this.interfaceMap[interfaceConfig.id] = interfaceConfig

            //入参
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
          }
        })
        .catch((err) => {
          this.interfaceMap[interfaceConfig.id] = interfaceConfig
        })

      //入参
      // let paramRes = await getProcessParamService({ processId: interfaceConfig.data.id })
      // if (paramRes.data) {
      //   let params = paramRes.data.params
      //   interfaceConfig.data.paramsConfigs = []
      //   for (const param of params) {
      //     interfaceConfig.data.paramsConfigs.push({
      //       param_name: param.name,
      //       param_value: ''
      //     })
      //   }
      // }
    },
    interfaceDataById(id: any) {
      return this.interfaceMap[id]
    },
    showTableColumnConfig() {
      this.isShowTableColumnConfig = true
      // this.curColumn=column;
    },
    showTableColumnChildrenConfig() {
      this.isShowTableColumnConfig = false
      this.isShowTableColumnChildrenConfig = true
      // this.curColumn=column;
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
      // this.curColumn={};
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
    }
  }
})
