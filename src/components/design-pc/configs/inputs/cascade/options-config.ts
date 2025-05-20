export default {
  // 自定义属性
  value: '',
  type: 'text',
  label: '标题',
  enLabel: '',
  width: 80,
  labelShow: true,
  optionsData: [],
  placeholder: '请选择',
  enPlaceHolder: '',
  labelAlign: 'right',
  size: 'default',
  disabled: false,
  clearable: false,
  required: false,
  dataFormat: '一维数组', //'一维数组', '树形数据'
  //层级数据
  setOptions: {
    value: '',
    name: '',
    id: '',
    parentId: '',
    childrenId: ''
  },
  // 配置
  contentDataSource: 'radio-button-default',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: '',
    tableData: []
  },
  interfaceDataEchoConfig: {
    id: '',
    uuid: ''
  },
  contentDataEcho: ''
}
