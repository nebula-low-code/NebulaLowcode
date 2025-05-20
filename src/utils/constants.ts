export const ENV = {
  //   BASE_URL: 'http://localhost:40518/platform/api'
  BASE_URL: 'https://api.xingyunzuo.com/platform/api',
  RENDER_PC_URL: 'https://renderer.xingyunzuo.com',
  RENDER_H5_URL: 'https://m2.xingyunzuo.com'
}

export const DataSourceType = {
  DEFAULT: 'radio-button-default',
  INTERFACE: 'radio-button-interface',
  CONNECT: 'radio-button-connect',
  DATABASE: 'radio-button-database',
  SQL: 'radio-button-sql',
  CUSTOM_INTERFACE: 'customInterface',
  BIND: 'radio-button-bind',
  COMPONENT: 'component',
  COMPONENT_OBJECT: 'component-object',
  CUSTOM: 'custom',
  VARIABLE: 'variable',
  GLOBAL: 'global',
  FUNCTION: 'function',
  EVENT: 'event',
  DIFY: 'radio-button-dify'
}

export const EventType = {
  INTERFACE: 'event-operate-interface',
  LOGIC: 'event-operate-logic-judgment',
  POPUP: 'event-operate-dialog-box',
  MESSAGE: 'event-operate-dialog-box-msg',
  VALUE_SET: 'event-operate-set',
  REFRESH: 'event-operate-refresh',
  FUNCTION: 'event-operate-function',
  MAIN_MENU: 'event-operate-main-menu-href',
  FORM_VALIDATE: 'event-operate-form-validate',
  LINK: 'event-operate-link',
  HLINK: 'event-operate-hlink',
  LINK_PAGE: 'event-operate-href',
  CLOSE_DIALOG: 'event-operate-close-dialog',
  CONFIRM: 'event-operate-dialog-box-confirm',
  JAVASCRIPT: 'event-operate-javascript',
  DISPLAY: 'event-operate-display',
  DISABLE: 'event-operate-disable',
  PRINT: 'event-operate-print',
  EXPORT: 'event-operate-export',
  TEMPLATE_EXPORT: 'event-operate-template-export',
  IMPORT: 'event-operate-import'
}

export const WorkflowOutputs = ['pendingUser', 'approvedUser', 'approvedAdvice', 'startUser']
export const CustomEventsType = [
  'event-operate-scan',
  'event-operate-wxlogin',
  'event-operate-wxQyLogin',
  'event-operate-openid',
  'event-operate-token-get',
  'event-operate-map',
  'event-operate-iam-code',
  'event-operate-get-language',
  'event-data-insert'
] //需要在取值中能获取到的事件类型,主要是移动端的事件,如扫码/微信登录等

export const columnFormatTypeList = [
  {
    label: '文本',
    value: 'TEXT',
    children: [
      {
        label: '普通文本',
        value: 'NORMAL_TEXT'
      },
      {
        label: '12,345',
        value: 'NUM_THOUSAND'
      },
      {
        label: '1,234.10',
        value: 'NUM_THOUSAND_DECIMAL2'
      },
      {
        label: '12%',
        value: 'PERCENT'
      },
      {
        label: '12.34%',
        value: 'PERCENT_DECIMAL2'
      },
      {
        label: '¥123,456',
        value: 'DOLLAR_THOUSAND'
      },
      {
        label: '¥123,346.78',
        value: 'DOLLAR_THOUSAND_DECIMAL2'
      },
      {
        label: '标签',
        value: 'TAG'
      },
      {
        label: '评分',
        value: 'RATE'
      }
    ]
  },
  {
    label: '日期',
    value: 'DATE',
    children: [
      {
        label: 'YYYY-MM-DD',
        value: 'YYYY-MM-DD'
      },
      {
        label: 'YYYY-MM-DD HH:mm:ss',
        value: 'YYYY-MM-DD HH:mm:ss'
      }
    ]
  }
]

export const absoluteConfigList = [
  {
    label: '中心居中',
    value: 'center-center'
  },
  {
    label: '中间左侧',
    value: 'center-left'
  },
  {
    label: '中间右侧',
    value: 'center-right'
  },
  {
    label: '顶部中心',
    value: 'top-center'
  },
  {
    label: '顶部左侧',
    value: 'top-left'
  },
  {
    label: '顶部右侧',
    value: 'top-right'
  },
  {
    label: '底部中心',
    value: 'bottom-center'
  },
  {
    label: '底部左侧',
    value: 'bottom-left'
  },
  {
    label: '底部右侧',
    value: 'bottom-right'
  },
  {
    label: '自定义',
    value: 'initial'
  }
]

export const absoluteUnitList = [
  {
    label: 'px',
    value: 'px'
  },
  {
    label: '%',
    value: '%'
  },
  {
    label: 'em',
    value: 'em'
  },
  {
    label: 'rem',
    value: 'rem'
  }
]

export const backgroundRepeatConfigList = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '不重复',
    value: 'no-repeat'
  },
  {
    label: '平铺',
    value: 'repeat'
  },
  {
    label: '平铺X轴',
    value: 'repeat-x'
  },
  {
    label: '平铺Y轴',
    value: 'repeat-y'
  }
]

export const backgroundSizeConfigList = [
  {
    label: '默认',
    value: ''
  },
  {
    label: '自动',
    value: 'auto'
  },
  {
    label: '覆盖',
    value: 'cover'
  },
  {
    label: '包含',
    value: 'contain'
  },
  {
    label: '自定义',
    value: 'initial'
  }
]
