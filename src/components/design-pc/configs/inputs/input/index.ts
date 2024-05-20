import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-field',
  name: '输入框',
  icon: 'iconwenbenkuang',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
