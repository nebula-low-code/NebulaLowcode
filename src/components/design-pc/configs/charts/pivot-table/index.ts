import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-pivot-table',
  name: '数据透视表',
  icon: 'iconbiaoge1',
  isRefreshComponent: true, // 是否为可刷新组件
  isBeta:true,
  component: layoutTemplate,
  options: optionsConfig
}
