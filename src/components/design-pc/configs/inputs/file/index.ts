import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-file',
  name: '附件查看',
  icon: 'iconwenjianjia',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
