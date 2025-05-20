import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-custom-table',
  name: '自定义表格',
  icon: 'iconliebiao1',
  isInputComponent: true, // 是否为输入组件
  isRefreshComponent: true, // 是否为可刷新组件
  isNestedComponent: true, // 是否为容器组件
  isBeta:true,
  component: layoutTemplate,
  options: optionsConfig
}
