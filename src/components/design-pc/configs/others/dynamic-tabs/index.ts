import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-dynamic-tabs',
  name: '动态标签',
  icon: 'icontab1',
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
}
