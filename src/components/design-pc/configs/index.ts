import text from './others/text'
import icon from './others/icon'
import button from './others/button'
import image from './others/image'
import renderVue from './others/render'
import layout from './layouts/layout'
import tabs from './layouts/tabs'
import iframe from './others/iframe'
import pageHeader from './others/page-header'
import divider from './others/divider'
import dropdownMenu from './others/dropdown-menu'
import steps from './others/steps'
import collapse from './others/collapse'
import qrcode from './others/qrcode'
import workflow from './others/workflow'
import dynamicTabs from './others/dynamic-tabs'
import extendField from './others/extend-field'
import dataModel from './others/data-model'
import subTable from './others/sub-table'
//输入
import input from './inputs/input'
import select from './inputs/select'
import dateRange from './inputs/date-range'
import datePicker from './inputs/date-picker'
import timePicker from './inputs/time-picker'
import radio from './inputs/radio'
import checkbox from './inputs/checkbox'
import cascade from './inputs/cascade'
import tree from './inputs/tree'
import treeSelect from './inputs/tree-select'
import slider from './inputs/slider'
import imageUpload from './inputs/image-upload'
import fileUpload from './inputs/file-upload'
import file from './inputs/file'
import stepper from './inputs/stepper'
import sswitch from './inputs/switch'
import richText from './inputs/rich-text'
import multiInput from './inputs/multi-input'
import tableInput from './inputs/table-select'
import calendar from './inputs/calendar'
//图表
import table from './charts/table'
import list from './charts/list'
import lineChart from './charts/line-chart'
import histogramChart from './charts/histogram-chart'
import lineAreaChart from './charts/line-area-chart'
import barChart from './charts/bar-chart'
import funnelChart from './charts/funnel-chart'
import pieChart from './charts/pie-chart'
import ringChart from './charts/ring-chart'
import roseChart from './charts/rose-chart'
import scatterChart from './charts/scatter-chart'
import waterfallChart from './charts/waterfall-chart'
import radarChart from './charts/radar-chart'
import progress from './charts/progress'
import gantt from './charts/gantt-chart'
import customTable from './charts/custom-table'
import pivotTable from './charts/pivot-table'

// 常用
const commonlyList = [layout, text, icon, button, input, select, datePicker, image, tabs, dateRange]

// 图表
const chartList = [
  table,
  list,
  histogramChart,
  lineChart,
  lineAreaChart,
  barChart,
  funnelChart,
  ringChart,
  pieChart,
  roseChart,
  scatterChart,
  waterfallChart,
  radarChart,
  gantt,
  progress,
  customTable,
  pivotTable
]

// 输入
const inputList = [checkbox, radio, cascade, tableInput, treeSelect, tree, slider, timePicker, calendar, stepper, sswitch, multiInput, richText, imageUpload, file, fileUpload]

// 其他
const otherList = [pageHeader, divider, dropdownMenu, steps, collapse, qrcode, iframe, workflow, dynamicTabs, renderVue, extendField, dataModel, subTable]

// 所有组件集合
const allList = [...commonlyList, ...chartList, ...inputList, ...otherList] as any

// 添加公共属性
;(allList as any).forEach((item: any) => {
  item.options.commonConfigAssignName = item.name
  // 事件属性
  let eventConfig = {
    eventList: [
      {
        eventType: 'click',
        version: '1.0.0',
        actionList: [],
        variableMap: {}
      },
      {
        eventType: 'change',
        version: '1.0.0',
        actionList: [],
        variableMap: {}
      }
    ]
  }
  item.options.eventConfig = Object.assign(eventConfig, item.options.eventConfig)

  // 布局属性
  item.options.commonConfigAssignSpanCol = 24 // layout 24栅格布局配置
  item.options.commonConfigAssignIsCol = item.options.commonConfigAssignIsCol ?? true // 是否使用layout 24栅格布局
  // 不使用栅格布局时 宽高的布局方式 [default: 默认宽度, per: 百分比，px: 像素]
  item.options.commonConfigCompWidthUnit = item.options.commonConfigCompWidthUnit || 'auto'
  item.options.commonConfigCompHeightUnit = item.options.commonConfigCompHeightUnit || 'auto'
  item.options.commonConfigCompWidth = item.options.commonConfigCompWidth || 100
  item.options.commonConfigCompHeight = item.options.commonConfigCompHeight || 100

  //公共样式属性(边框/边距等)
  let commonConfig = {
    displayHide: false,
    topSpaceDistance: 8,
    bottomSpaceDistance: 8,
    leftSpaceDistance: 8,
    rightSpaceDistance: 8,
    topPaddingDistance: 0,
    bottomPaddingDistance: 0,
    leftPaddingDistance: 0,
    rightPaddingDistance: 0,
    borderStyle: {
      leftDirveColor: '#d7d7d7',
      leftSize: 0,
      leftDirveType: '',
      topDirveColor: '#d7d7d7',
      topSize: 0,
      topDirveType: '',
      rightDirveColor: '#d7d7d7',
      rightSize: 0,
      rightDirveType: '',
      bottomDirveColor: '#d7d7d7',
      bottomSize: 0,
      bottomDirveType: ''
    },
    borderRadius: 0,
    isShowShadow: false,
    shadow: '0px 16px 40px rgba(0,0,0,0.08)'
  }

  item.options.commonConfig = Object.assign(commonConfig, item.options.commonConfig)
  if (!item.options.version) {
    item.options.version = '1.0.0'
  }
})

// 导出组件
export const commonly = commonlyList
export const charts = chartList
export const inputs = inputList
export const others = otherList

// 组件字典
const componentConfigobj = {} as any
allList.forEach((item: any) => {
  componentConfigobj[item.type] = item
})
export const componentConfigMap = componentConfigobj
