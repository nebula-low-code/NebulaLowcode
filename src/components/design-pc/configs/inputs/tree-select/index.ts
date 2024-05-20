import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-tree-select',
  name: '树形选择器',
  icon: 'icontree',
  isInputComponent: true, // 是否为输入组件
  isMultiOutputComponent: true, //是否是多输出组件
  isRefreshComponent: true, // 是否为可刷新组件
  component: layoutTemplate,
  options: optionsConfig
}
