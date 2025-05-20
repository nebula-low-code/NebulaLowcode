import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-multi-input',
  name: '多项输入',
  icon: 'iconwenbenkuang',
  isInputComponent: true, // 是否为输入组件
  isNestedComponent: true, // 是否为容器组件
  component: layoutTemplate,
  options: optionsConfig,
  extraData: {
    columns: []
  }
}
