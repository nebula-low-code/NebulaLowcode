export default {
  contentDataSource: 'radio-button-default',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: '',
    tableData: [],
    pagination: {
      pageIndex: 1,
      pageSize: 10
    }
  },
  commonConfig: {
    topPaddingDistance: 0,
    bottomPaddingDistance: 0,
    leftPaddingDistance: 0,
    rightPaddingDistance: 0,
    topSpaceDistance: 0,
    bottomSpaceDistance: 0,
    leftSpaceDistance: 0,
    rightSpaceDistance: 0
  },
  commonConfigAssignSign: '',
  columnsData: [], // 表格渲染需要的配置
  pagination: {
    current: 1,
    pageSize: 5,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100']
  }, // 是否进行分页
  addRowSwitch:false,// 添加行开关
  echoRowConfig:{},
}
