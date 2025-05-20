export default {
  value: undefined,
  width: 80,
  outputLabel: undefined,
  label: '标题',
  enLabel: '',
  labelAlign: 'right',
  labelShow: true,
  size: 'default',
  mode: 'single',
  placeholder: '请选择',
  enPlaceHolder: '',
  labelKey: '',
  valueKey: '',
  required: false,
  disabled: false,
  // paginationSwitch: true, // 分页开关
  // pagination: {
  //   current: 1,
  //   pageSize: 10,
  //   total: 0
  // },
  columns: [],
  defaultTableData: [
    {
      label: '选项1',
      value: '1'
    },
    {
      label: '选项2',
      value: '2'
    },
    {
      label: '选项3',
      value: '3'
    }
  ], // 静态选项
  contentDataSource: 'radio-button-default',
  contentDataEcho: '',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: ''
  },
  interfaceDataEchoConfig: {
    uuid: '',
    key: ''
  },
  dicId: '',
  commonConfigAssignIsCol: false
}
