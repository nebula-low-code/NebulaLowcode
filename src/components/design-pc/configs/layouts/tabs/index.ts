import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-tabs',
  name: '标签页',
  icon: 'icontab1',
  isInputComponent: true, // 是否为输入组件
  isNestedComponent: true, // 是否为容器组件
  component: layoutTemplate,
  options: optionsConfig
}
