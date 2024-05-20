import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-switch',
  name: '开关',
  icon: 'iconkaiguan',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
