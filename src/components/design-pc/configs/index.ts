import text from './others/text'
import icon from './others/icon'
import button from './others/button'
import image from './others/image'
import layout from './layouts/layout'
import divider from './others/divider'
import collapse from './others/collapse'

import input from './inputs/input'
import select from './inputs/select'
import datePicker from './inputs/date-picker'
import timePicker from './inputs/time-picker'
import radio from './inputs/radio'
import checkbox from './inputs/checkbox'
import treeSelect from './inputs/tree-select'
import slider from './inputs/slider'
import sswitch from './inputs/switch'
import richText from './inputs/rich-text'
import multiInput from './inputs/multi-input'

import table from './charts/table'
import list from './charts/list'
import lineChart from './charts/line-chart'
import histogramChart from './charts/histogram-chart'
import barChart from './charts/bar-chart'
import pieChart from './charts/pie-chart'

const commonlyList = [layout, divider, text, button, image, icon]
const chartList = [table, list, histogramChart, lineChart, barChart, pieChart]
const inputList = [input, multiInput, radio, checkbox, select, treeSelect, datePicker, timePicker, slider, sswitch, richText]
const otherList = [collapse]
const allList = [...commonlyList, ...chartList, ...inputList, ...otherList] as any

;(allList as any).forEach((item: any) => {
  item.options.commonConfigAssignName = item.name

  let eventConfig = {
    eventList: [
      {
        eventType: 'click',
        version: '1.0.0',
        actionList: []
      },
      {
        eventType: 'change',
        version: '1.0.0',
        actionList: []
      }
    ]
  }
  item.options.eventConfig = Object.assign(eventConfig, item.options.eventConfig)

  item.options.commonConfigAssignSpanCol = 24
  item.options.commonConfigAssignIsCol = item.options.commonConfigAssignIsCol ?? true
  item.options.commonConfigCompWidthUnit = item.options.commonConfigCompWidthUnit || 'auto'
  item.options.commonConfigCompHeightUnit = item.options.commonConfigCompHeightUnit || 'auto'
  item.options.commonConfigCompWidth = item.options.commonConfigCompWidth || 100
  item.options.commonConfigCompHeight = item.options.commonConfigCompHeight || 100

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
})

export const commonly = commonlyList
export const charts = chartList
export const inputs = inputList
export const others = otherList

const componentConfigobj = {} as any
allList.forEach((item: any) => {
  componentConfigobj[item.type] = item
})
export const componentConfigMap = componentConfigobj
