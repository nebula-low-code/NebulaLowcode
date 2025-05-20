export default {
  value: '',
  legendAlign: 'top',
  commonConfigCompWidthUnit: '%',
  commonConfigCompWidth: '100',
  // commonConfigCompHeightUnit: 'px',
  // commonConfigCompHeight: '400',
  contentDataSource: 'radio-button-default',
  chartColors: ['#63b2ee', '#76da91', '#f8cb7f', '#f89588', '#7cd6cf', '#9192ab', '#7898e1', '#efa666', '#eddd86', '#9987ce', '#63b2ee', '#76da91'],
  chartStartDate: '2023-07-01 00:00',
  chartEndDate: '2023-07-25 23:00',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: ''
  },
  defaultData: [
    {
      name: '项目1',
      value: [
        {
          beginDate: '2023-07-05 13:00',
          endDate: '2023-07-10 19:00',
          ganttBarConfig: {
            id: 'unique-id-1', // ... and a unique "id" property
            label: '项目1第一阶段',
            style: {
              fontSize: '12px',
              borderRadius: '20px'
            }
          }
        },
        {
          beginDate: '2023-07-14 13:00',
          endDate: '2023-07-24 19:00',
          ganttBarConfig: {
            id: 'unique-id-2', // ... and a unique "id" property
            label: '项目1第二阶段',
            style: {
              fontSize: '12px',
              borderRadius: '20px'
            }
          }
        }
      ]
    },
    {
      name: '项目2',
      value: [
        {
          beginDate: '2023-07-10 00:00',
          endDate: '2023-07-24 02:00',
          ganttBarConfig: {
            id: 'another-unique-id-2',
            label: '项目2第一阶段',
            style: {
              background: '#e09b69',
              fontSize: '12px',
              borderRadius: '20px'
            }
          }
        }
      ]
    }
  ],
  commonConfig: {} as any,
  rowList: [] as any //进度数据列表,基本格式为{name:'项目1', value:[]}
}
