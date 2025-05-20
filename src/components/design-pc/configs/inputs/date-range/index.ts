import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-calendar-range',
  name: '日期范围',
  icon: 'iconriqi',
  isInputComponent: true, // 是否为输入组件
  isMultiOutputComponent: true, //是否是多输出组件
  component: layoutTemplate,
  options: optionsConfig
}
