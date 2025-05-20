export default {
  value: '',
  contentDataSource: 'radio-button-default',
  interfaceDataConfig: {
    versions: '1.0.0',
    id: '',
    uuid: '',
    key: ''
  },
  eventConfig: {
    eventList: [
      {
        eventType: 'click',
        version: '1.0.0',
        actionList: []
      },
      {
        eventType: 'change',
        version: '1.0.0',
        actionList: []
      },
      {
        eventType: 'approve',
        version: '1.0.0',
        actionList: []
      },
      {
        eventType: 'reject',
        version: '1.0.0',
        actionList: []
      },
      {
        eventType: 'back',
        version: '1.0.0',
        actionList: []
      }
    ]
  },
  logList: [],
  workflowId: null,
  workflowIdConfig: {},
  logId: null,
  logIdConfig: {},
  currentUserId: null,
  // 组件输出
  outputs: {
    pendingUser: '',
    approvedUser: '',
    approvedAdvice: '',
    startUser: ''
  }
}
