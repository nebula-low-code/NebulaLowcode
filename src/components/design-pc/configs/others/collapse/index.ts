import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-collapse',
  name: '折叠面板',
  icon: 'iconfuhao-zhediemianban',
  isNestedComponent: true, // 是否为容器组件
  component: layoutTemplate,
  options: optionsConfig
}
