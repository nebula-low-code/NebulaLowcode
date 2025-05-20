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
  defaultTableData:[{ country: 'United States', year: 2010, gender: 'male', count: 153295220 },
  { country: 'United States', year: 2010, gender: 'female', count: 156588400 },
  { country: 'United States', year: 2011, gender: 'male', count: 154591960 },
  { country: 'United States', year: 2011, gender: 'female', count: 157800200 },
  { country: 'United States', year: 2012, gender: 'male', count: 155851840 },
  { country: 'United States', year: 2012, gender: 'female', count: 158944800 },
  { country: 'China', year: 2010, gender: 'male', count: 690256342 },
  { country: 'China', year: 2010, gender: 'female', count: 650712406 },
  { country: 'China', year: 2011, gender: 'male', count: 694106441 },
  { country: 'China', year: 2011, gender: 'female', count: 654068030 },
  { country: 'China', year: 2012, gender: 'male', count: 697964288 },
  { country: 'China', year: 2012, gender: 'female', count: 657422649 },
  { country: 'India', year: 2010, gender: 'male', count: 638354751 },
  { country: 'India', year: 2010, gender: 'female', count: 592629727 },
  { country: 'India', year: 2011, gender: 'male', count: 646873890 },
  { country: 'India', year: 2011, gender: 'female', count: 600572093 },
  { country: 'India', year: 2012, gender: 'male', count: 655193693 },
  { country: 'India', year: 2012, gender: 'female', count: 608395922 },
  { country: 'France', year: 2010, gender: 'male', count: 30675773 },
  { country: 'France', year: 2010, gender: 'female', count: 32285363 },
  { country: 'France', year: 2011, gender: 'male', count: 30815839 },
  { country: 'France', year: 2011, gender: 'female', count: 32452566 },
  { country: 'France', year: 2012, gender: 'male', count: 30948916 },
  { country: 'France', year: 2012, gender: 'female', count: 32612882 },
  { country: 'Australia', year: 2010, gender: 'male', count: 11124254 },
  { country: 'Australia', year: 2010, gender: 'female', count: 11218144 },
  { country: 'Australia', year: 2011, gender: 'male', count: 11260747 },
  { country: 'Australia', year: 2011, gender: 'female', count: 11359807 },
  { country: 'Australia', year: 2012, gender: 'male', count: 11280804 },
  { country: 'Australia', year: 2012, gender: 'female', count: 11402769 }],
  tableRowFields:[ {
    getter: (item) => item.country,
    label: 'Country'
  },
  {
    getter: (item) => item.gender,
    label: 'Gender'
  }],
  colFields:[ {
    getter: (item) => item.year,
    label: 'Year'
  }]
}
