import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-slider',
  name: '滑动条',
  icon: 'iconsliders',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
