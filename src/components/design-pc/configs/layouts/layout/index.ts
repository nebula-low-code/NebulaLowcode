import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-layout',
  name: '布局容器',
  icon: 'iconzhage',
  isNestedComponent: true, // 是否为容器组件
  component: layoutTemplate,
  options: optionsConfig
}
