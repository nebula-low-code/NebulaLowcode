export function multiOutputValues(componentItem: any) {
  if (componentItem.type === 'van-design-tree' || componentItem.type === 'van-design-tree-select') {
    return [
      {
        label: '选中数值',
        value: 'value'
      },
      {
        label: '选中名称',
        value: 'label'
      }
    ]
  } else if (componentItem.type === 'van-design-table') {
    return [
      {
        label: '选定数据', // 整行 对象输出
        value: 'selectdata'
      },
      {
        label: '选定行数据',
        value: 'rowdata'
      },
      {
        label: '每页行数',
        value: 'rownum'
      },
      {
        label: '当前页号',
        value: 'pagenum'
      }
    ]
  } else if (componentItem.type === 'van-design-workflow') {
    return [
      {
        label: '待审批人',
        value: 'pendingUser'
      },
      {
        label: '审核人（上个节点）',
        value: 'approvedUser'
      },
      {
        label: '审核意见（上个节点）',
        value: 'approvedAdvice'
      },
      {
        label: '发起人ID',
        value: 'startUser'
      }
    ]
  } else if (componentItem.type === 'van-design-calendar-range') {
    return [
      {
        label: '日期范围',
        value: 'value'
      },
      {
        label: '开始日期',
        value: 'startDate'
      },
      {
        label: '结束日期',
        value: 'endDate'
      }
    ]
  } else if (componentItem.type === 'van-design-wechat-login') {
    return [
      {
        label: '手机号,openid,unionid',
        value: 'value'
      },
      {
        label: '手机号',
        value: 'phoneNumber'
      },
      {
        label: 'openid',
        value: 'openid'
      },
      {
        label: 'unionid',
        value: 'unionid'
      }
    ]
  } else if (componentItem.type === 'van-design-select' || componentItem.type === 'van-design-table-select') {
    let output = [
      {
        label: '选中数值',
        value: 'value'
      },
      {
        label: '选中名称',
        value: 'label'
      }
    ]
    // todo
    if (componentItem.options.interfaceSearch) {
      output.push({
        label: '搜索值',
        value: 'searchValue'
      })
    }
    return output
  } 
  else if (componentItem.type === 'van-design-custom-table') {
    return [
      {
        label: '表格整体输出',
        value: 'table'
      },
    //   {
    //     label: '选定数据',
    //     value: 'selectdata'
    //   },
    //   {
    //     label: '选定行数据',
    //     value: 'rowdata'
    //   },
    //   {
    //     label: '每页行数',
    //     value: 'rownum'
    //   },
    //   {
    //     label: '当前页号',
    //     value: 'pagenum'
    //   }
    ]
  } 
  else if (componentItem.type === 'van-design-pc-calendar') {
    return [
      {
        label: '选中日期',
        value: 'value'
      },
      {
        label: '选中事项',
        value: 'event'
      }
    ]
  } else {
    return []
  }
}
