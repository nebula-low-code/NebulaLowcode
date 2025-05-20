export default {
  value: '', ////组件输出的value值
  outputLabel: '', //组件输出的label值
  pathValue: '', //包含父节点信息的value,节点信息用'-'连接
  pathLabel: '', //包含父节点信息的label,节点信息用'-'连接
  type: 'text',
  label: '标题',
  enLabel: '',
  containPath: false,
  multiple: false,
  width: 80,
  labelShow: true,
  treeData: [],
  placeholder: '请选择',
  enPlaceHolder: '',
  expandAll: false,
  labelAlign: 'right',
  size: 'default',
  disabled: false,
  clearable: false,
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
    key: ''
  },
  interfaceDataEchoConfig: {
    id: '',
    uuid: ''
  },
  contentDataEcho: '',
  defaultTableData: [
    {
        title: '父节点 1',
        key: '0-0',
        children: [
          {
            title: '父节点 1-0',
            key: '0-0-0',
            children: [
              { title: '子节点1', key: '0-0-0-0' },
              { title: '子节点2', key: '0-0-0-1' }
            ]
          },
          {
            title: '父节点 1-1',
            key: '0-0-1',
            children: [{ key: '0-0-1-0', title: '子节点3' }]
          }
        ]
      }
  ],
}
