import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-steps',
  name: '步骤条',
  icon: 'iconbuzhoutiao1',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
