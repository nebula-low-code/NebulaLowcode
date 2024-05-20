import { defaultColumnsData, defaultTableData } from './default-data'

export default {
  value: '',
  defaultColumnsData: defaultColumnsData, // Mock数据项
  defaultTableData, // Mock数据
  defaultPagination: { // Mock分页
    current: 1,
    pageSize: 5,
    total: 10,

    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100']
  },
  // columnsConfigList: [],
  columnsData: [], // 表格渲染需要的配置
  pagination: {
    current: 1,
    pageSize: 5,
    total: 0,

    showSizeChanger: true,
    pageSizeOptions: ['5', '10', '20', '50', '100']
  }, // 是否进行分页
  interfaceDataConfig: {
    versions: '1.0.0',
    type: 'interface',
    id: '',
    uuid: '',
    key: '',
    tableData: []
  },
  rowIndexSwitch: false, // 行号开关
  paginationSwitch:true, // 分页开关
  paginationInterfaceSwitch:false,
  pagingTotalKey: '',
  pagingTotalKey_id:[],// 老版本回显用
  pagingTotalKeyConfig:{
    type: 'interface',
    id: '',
    uuid: '',
    key: '',
  },
  echoRowConfig:{},
  summaryRowConfig:{},
  expandSwitch:false,//一维数组树形展示
  expandId:"",
  expandParentId:"",
  version:"2.0.0"
}
