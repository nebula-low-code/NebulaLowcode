import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-list',
  name: '列表',
  icon: 'iconliebiao1',
  isRefreshComponent: true, // 是否为可刷新组件
  isNestedComponent: true, // 是否为容器组件
  component: layoutTemplate,
  options: optionsConfig
}
