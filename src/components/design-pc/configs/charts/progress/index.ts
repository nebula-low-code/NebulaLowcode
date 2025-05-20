import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-progress',
  name: '进度条',
  icon: 'iconjindutiao1',
  isRefreshComponent: true, // 是否为可刷新组件
  component: layoutTemplate,
  options: optionsConfig
}
