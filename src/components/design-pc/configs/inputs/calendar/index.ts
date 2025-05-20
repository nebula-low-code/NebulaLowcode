import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-pc-calendar',
  name: '日历',
  icon: 'iconriqi',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
