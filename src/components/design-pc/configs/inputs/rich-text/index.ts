import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-editor',
  name: '富文本',
  icon: 'iconwenbenkuang',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig,
  extraData: {
    editor: null
  }
}
