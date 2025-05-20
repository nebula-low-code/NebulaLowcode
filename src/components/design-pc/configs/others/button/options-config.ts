import { useThemeStore } from '@/stores'
const themeStore = useThemeStore()
export default {
  version: '1.0.0',
  value: '',
  type: 'primary',
  shape: 'default', // 按钮类型
  size: 'default', // 按钮大小
  disabled: false,
  customtimageIcon: {
    fontClass: 'iconfont ant-home',
    unicode: 'e801'
  },
  iconPosition: 'left',
  iconPreShow: false,
  text: '确定',
  enText: '',

  // 颜色
  // backgroundColor: '#1677ff',
  backgroundColor: themeStore.themeConfig.token.colorPrimary,
  color: '#FFFFFF',
  styleEditorConfig: {
    textHtmlSize: themeStore.themeConfig.token.fontSize
  },
  themeChanged: {
    fontSize: false
  }, //是否修改过默认样式
  block: false,
  commonConfig: {
    topPaddingDistance: 8,
    bottomPaddingDistance: 8,
    leftPaddingDistance: 16,
    rightPaddingDistance: 16,
    borderStyle: {} as any,
    shadow: ''
  },
  commonConfigAssignIsCol: false
}
