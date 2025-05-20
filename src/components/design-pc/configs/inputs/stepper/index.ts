import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-stepper',
  name: '步进器',
  icon: 'iconjia',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
