/**
 * 页面配置信息字段
 */

type eventActionOutputConfig = {
  id: number
  next: number
  title: string
}

type eventActionPropertyConfig = {
  actionType: string
  interfaceDataConfig: eventActionInterfaceConfig
  actionSet: any
  popupBody: string
  logicValue: string
  logicOperator: string
  param_value_type: string
  relevanceComponentUuid: string
  logicOperation: any
  sourceCodeStr: string
  [propName: string]: any
}

type eventActionInterfaceConfig = {
  paramsConfigs: paramConfig[]
  hrefPageParams: paramConfig[]
  operateApiId: string
}

type eventActionConfig = {
  id: number
  title: string
  type: string
  outputs: eventActionOutputConfig[]
  properties: eventActionPropertyConfig
}

type paramConfig = {
  type: string
  param_value_type: string // 参数类型（T: 组件、V: 入参变量、C: 常量）
  param_v_key: string
  param_value: string
  param_name: string
  relevanceComponentUuid: string
  operateApiId: string

  //页面入参
  operateHrefPageParamName: string
  operateHrefPageParamValue: string

  //页面局部变量
  variableName: string
  variableValue: string
  defaultValue: string

  //数据库
  columnName: ''
  columnValue: ''
  condition: ''
  connectType: ''
}

type interfaceDataConfig = {
  id: string | number
  uuid: string
  type: string
  key: string
  name: string
  bindDataKey: string
  data: {
    versions: string
    id: number
    isMockData: boolean //是否是mock接口
    useMockData: boolean //是否在编辑端使用mock数据,若是,则取mockResponseData作为返回字段.
    type: string
    name: string
    // 后端服务类型
    paramsConfigs: paramConfig[]
    // mock数据
    responseDataTypes: any
    responseData: any
    mockResponseData: any
  }
  [propName: string]: any
}

type databaseConfig = {
  id: string | number
  uuid: string
  type: string
  key: string
  name: string
  bindDataKey: string
  params: databaseParamType
  data: {
    id: number | string
    responseData: any
  }
  [propName: string]: any
}

type databaseParamType = {
  conditionColumns: any[]
  dbConfigId: number
  limit: number
  limitType: string
  orderField: string
  selectColumns: any[]
  sortType: string
  tableName: string
}

// 页面全局配置类型
type pageGlobalConfigType = {
  reportId: number | string
  uuid: string
  name: string
  reportName: string
  pullRefresh: boolean
  adaptiveStatusBar: boolean
  statusBarColor: string
  backgroundColor: string
  remark: string
  interfaceDataConfig: any[]
  databaseConfig: any[]
  sqlScriptConfig: any[]
  difyConfig: any[]
  // 布局
  topPaddingDistance: number
  rightPaddingDistance: number
  bottomPaddingDistance: number
  leftPaddingDistance: number
  // 背景图片
  backgroundImage: string
  backgroundPosition: string
  backgroundRepeat: string
  backgroundSize: string
  backgroundAttachment: string
  // 导航栏
  hideNavigator: boolean
  navigatorBGColor: string //移动端导航栏背景色
  navigatorColor: string //移动端导航栏文字颜色
  // 页面刷新间隔
  refreshSeconds: number
  // 页面入参
  pageParamsList: paramConfig[]
  // 页面变量
  pageVariableList: paramConfig[]
}

type componentOptionsType = {
  contentDataSource: string
  value: string
  enValue: string
  interfaceDataConfig: interfaceDataConfig
  styleEditorConfig: object
  commonConfig: any
  eventConfig: any
  commonConfigAssignIsCol: boolean //是否在栅格中
  commonConfigAssignSign: string
  commonConfigAssignName: string
  commonConfigAssignRights: object
  commonConfigAssignIsPermission: boolean
  commonConfigAssignSpanCol: number //栅格格数
  [propName: string]: any
}

// 单个的组件类型
type componentConfigItemType = {
  uuid: string
  type: string
  name: string
  icon: string
  options: componentOptionsType
  configList: any[]
  component: any
  itemData: any
}

type componentGroupType = {
  id: string
  version: string
}

// 页面配置类型
type pageConfigType = {
  list: componentConfigItemType[]
  config: pageGlobalConfigType
  groupList: any
  eventConfig: any
  modalList: modalConfigType[]
}

// 弹窗配置类型
type modalConfigType = {
  list: componentConfigItemType[]
  config: pageGlobalConfigType
  eventConfig: any
  title: string
  uuid: string
}

//echarts配置
type echartsOptions = {
  color: any[]
  tooltip: any
  grid: any
  xAxis: any
  yAxis: any
  series: any[]
  legend: any
  dataset: any
  radar: any
}

export type {
  eventActionOutputConfig,
  eventActionPropertyConfig,
  eventActionConfig,
  paramConfig,
  interfaceDataConfig,
  databaseConfig,
  componentConfigItemType,
  pageGlobalConfigType,
  pageConfigType,
  modalConfigType,
  componentGroupType,
  componentOptionsType,
  echartsOptions
}
