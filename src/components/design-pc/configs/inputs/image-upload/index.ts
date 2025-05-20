import layoutTemplate from './template.vue'
import optionsConfig from './options-config'

export default {
  type: 'van-design-upload-img',
  name: '图片上传',
  icon: 'iconupload',
  isInputComponent: true, // 是否为输入组件
  isRefreshComponent: true, // 是否为可刷新组件
  component: layoutTemplate,
  options: optionsConfig
}
