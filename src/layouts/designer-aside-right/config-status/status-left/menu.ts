const statusMenuList = [
  {
    label: '渲染器',
    componentList: [
      {
        id: 'status-operate-if',
        type: 'status-operate-if',
        name: '条件',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'status-operate-set',
        type: 'status-operate-set',
        name: '组件设值',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
    //   {
    //     id: 'status-operate-show',
    //     type: 'status-operate-show',
    //     name: '组件显隐',
    //     url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
    //   },
      {
        id: 'status-operate-color',
        type: 'status-operate-color',
        name: '组件颜色',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'status-operate-operate',
        type: 'status-operate-operate',
        name: '操作渲染',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'status-operate-function',
        type: 'status-operate-function',
        name: '函数脚本',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      },
      {
        id: 'status-tag-color',
        type: 'status-tag-color',
        name: '标签渲染',
        url: new URL(`@/assets/icon/if.svg`, import.meta.url).href
      }
    ]
  }
]

export { statusMenuList }
