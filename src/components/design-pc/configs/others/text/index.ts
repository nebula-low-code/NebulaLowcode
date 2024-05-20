import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-text',
  name: '文本',
  icon: 'iconwenben',
  isRefreshComponent: true, // 是否为可刷新组件
  component: layoutTemplate,
  options: optionsConfig
}
