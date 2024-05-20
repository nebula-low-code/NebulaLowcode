import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-calendar',
  name: '日期选择器',
  icon: 'iconriqi',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
