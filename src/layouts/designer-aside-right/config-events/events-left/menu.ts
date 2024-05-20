const pcMenuList = [
  {
    label: '数据',
    eventList: [
      {
        id: 'event-operate-refresh',
        type: 'event-operate-refresh',
        name: '数据刷新',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-interface',
        type: 'event-operate-interface',
        name: '接口调用',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-set',
        type: 'event-operate-set',
        name: '组件设值',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-form-validate',
        type: 'event-operate-form-validate',
        name: '表单校验',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-table-export',
        type: 'event-operate-table-export',
        name: '表格导出',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-import',
        type: 'event-operate-import',
        name: '数据导入',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      }
    ]
  },
  {
    label: '页面',
    eventList: [
      {
        id: 'event-operate-dialog-box-msg',
        type: 'event-operate-dialog-box-msg',
        name: '提示框',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-dialog-box-confirm',
        type: 'event-operate-dialog-box-confirm',
        name: '确认框',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-link',
        type: 'event-operate-link',
        name: '外链跳转',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-hlink',
        type: 'event-operate-hlink',
        name: '超链接',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-print',
        type: 'event-operate-print',
        name: '页面打印',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      }
    ]
  },
  {
    label: '逻辑',
    eventList: [
      {
        id: 'event-operate-logic-judgment',
        type: 'event-operate-logic-judgment',
        name: '条件判定',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-display',
        type: 'event-operate-display',
        name: '隐藏/显示',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-disable',
        type: 'event-operate-disable',
        name: '可用/禁用',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'event-operate-javascript',
        type: 'event-operate-javascript',
        name: 'JS代码',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      }
    ]
  }
]

export { pcMenuList }
