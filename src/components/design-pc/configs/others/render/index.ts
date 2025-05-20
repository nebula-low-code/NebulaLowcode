import layoutTemplate from './template.vue'
import optionsConfig from './options-config'
export default {
  type: 'van-design-custom',
  name: '自定义组件',
  icon: 'iconzujian',
  isRefreshComponent: true, // 是否为可刷新组件
  isInputComponent: true, // 是否为输入组件
  component: layoutTemplate,
  options: optionsConfig
  // extraData: {
  //   customComponent: null
  // }
}
