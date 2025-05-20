export default {
  // 自定义属性
  value: '',
  legendAlign: 'top',
  label: 'none',
  commonConfigCompWidthUnit: '%',
  commonConfigCompWidth: '100',
  commonConfigCompHeightUnit: 'px',
  commonConfigCompHeight: '400',
  xAxisConfig: {
    forceDisplayLabel: false,
    axisLine: {
      show: true,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      rotate: 0,
      color: '#333'
    }
  },
  yAxisConfig: {
    name: '',
    nameShow: true,
    autoMax: true,
    autoMin: true,
    max: undefined,
    min: undefined,
    axisLine: {
      show: false,
      lineStyle: {
        width: 1,
        type: 'solid',
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      rotate: 0,
      color: '#333'
    },
    nameTextStyle: {
      color: '#333'
    }
  },
  grid: {
    left: 0,
    right: 20,
    top: 60,
    bottom: 70,
    containLabel: true
  }, //坐标轴离四周的距离
  chartPEvents: {},
  // 配置
  contentDataSource: 'radio-button-default',
  chartColors: ['#63b2ee', '#76da91', '#f8cb7f', '#f89588', '#7cd6cf', '#9192ab', '#7898e1', '#efa666', '#eddd86', '#9987ce', '#63b2ee', '#76da91'],
  echartsOptions: {
    color: [],
    tooltip: {
      trigger: 'axis'
    },
    grid: {},
    xAxis: [],
    yAxis: {
      type: 'value'
    },
    series: []
  },
  // chartSelectColors:[],
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: '',
    yAxisType: '',
    stack: [],
    chartSettings: {
      metrics: [],
      dimension: [],
      yAxisType: [],
      stack: {}
    },
    chartData: {
      rows: []
    },
    dynamicYAxis: false
  },
  defaultData: {
    chartSettings: {
      metrics: ['访问用户', '下单用户'],
      dimension: ['日期']
    },
    chartData: {
      rows: [
        { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
        { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
        { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
        { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
        { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
      ]
    }
  },
  commonConfig: {} as any
}
