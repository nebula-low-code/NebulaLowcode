import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-datetime-picker',
  isInputComponent: true, // 是否为输入组件
  name: '时间选择器',
  icon: 'iconshijianxuanzeqi',
  component: layoutTemplate,
  options: optionsConfig
}
