import { useThemeStore } from '@/stores'
const themeStore = useThemeStore()

export default {
  percentage: 10,
  strokeWidth: 10,
  color: themeStore.themeConfig.token.colorPrimary,
  themeChanged: {
    color: false
  }, //是否修改过默认样式
  type: 'line',
  maxValue: 100,
  rateValue: 0,
  numberShow: false, // 进度条数值显示
  contentDataSource: 'radio-button-default',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: '',
    value: undefined,
    maxValue: undefined,
    // 数据绑定
    maxKey: '',
    rateKey: ''
  },
  // 公共属性
  commonConfig: {
    topPaddingDistance: 10,
    bottomPaddingDistance: 10,
    leftPaddingDistance: 10,
    rightPaddingDistance: 10
  }
}
