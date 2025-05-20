<template>
  <a-row
    class="component-col"
    v-if="componentConfig.options.commonConfigAssignIsCol"
    :style="generatorRowStyle"
    :class="{ active: store.currentCheckedComponentUUID === componentConfig.uuid }"
    @contextmenu.prevent.stop="rightClickMenu"
    @click.stop="onChooseComponentItem(componentConfig.uuid)"
  >
    <a-col :span="24">
      <component :style="commonStyle" :is="componentConfig.component"></component>
    </a-col>
  </a-row>
  <div
    v-else
    class="component-col out-layout-class"
    :style="generatorOutLayoutStyle"
    :class="{ active: store.currentCheckedComponentUUID === componentConfig.uuid }"
    @contextmenu.prevent.stop="rightClickMenu"
    @click.stop="onChooseComponentItem(componentConfig.uuid)"
  >
    <component :style="commonStyle" :is="componentConfig.component"></component>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ContextMenu from '@imengyu/vue3-context-menu'
import { getStorage, setStorage } from '@/utils/storage-util'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import { generateUUID } from '@/utils/uuid'
import { componentConfigMap } from '@/components/design-pc/configs'
import { componentDeepClone } from '@/utils/component-deep-clone-config'
import { commonstyleConfig } from '@/utils/common-style'
import { deleteAuthorityService } from '@/api/api'
import { componentListTreeToStore } from '@/utils/transform-data-list'
import bus from '@/utils/mitt'

const props = defineProps<{
  componentConfig: any
  index: number
  componentList: any[]
}>()

const store = useDataStore()
const emit = defineEmits(['saveToBusiness'])

const hasClickAction = computed(() => {
  let eventList = props.componentConfig.options.eventConfig.eventList
  let actionList = []
  for (let i = 0; i < eventList.length; i++) {
    if (eventList[i].eventType === 'click') {
      actionList = eventList[i].actionList
    }
  }
  return actionList.length > 1
})

const generatorRowStyle = computed(() => {
  let style = {
    width: (props.componentConfig.options.commonConfigAssignSpanCol * 100.0) / 24.0 + '%',
    display: props.componentConfig.options.commonConfig.displayHide ? 'none' : 'inline-flex'
  }
  if (hasClickAction.value) {
    style.cursor = 'pointer'
  }
  return style
})
// 容器外样式
const generatorOutLayoutStyle = computed(() => {
  let width = props.componentConfig.options.commonConfigCompWidthUnit === 'auto' ? '' : props.componentConfig.options.commonConfigCompWidth + props.componentConfig.options.commonConfigCompWidthUnit
  let height =
    props.componentConfig.options.commonConfigCompHeightUnit === 'auto' ? '' : props.componentConfig.options.commonConfigCompHeight + props.componentConfig.options.commonConfigCompHeightUnit
  let style = {
    width: width,
    height: height,
    display: props.componentConfig.options.commonConfig.displayHide ? 'none' : 'inline-block'
  } as any
  if (props.componentConfig.options.commonConfig.postionAbsolute) {
    style.position = 'absolute'
    let config = props.componentConfig.options.commonConfig
    if (config.zIndex) {
      style.zIndex = config.zIndex
    }
    if (config.postionConfig) {
      if (config.postionConfig.type == 'center-center') {
        style.top = '50%'
        style.left = '50%'
        style.transform = 'translate(-50%,-50%)'
      } else if (config.postionConfig.type == 'center-left') {
        style.top = '50%'
        style.left = 0
        style.transform = 'translateY(-50%)'
      } else if (config.postionConfig.type == 'center-right') {
        style.top = '50%'
        style.right = 0
        style.transform = 'translateY(-50%)'
      } else if (config.postionConfig.type == 'top-center') {
        style.top = 0
        style.left = '50%'
        style.transform = 'translate(-50%, 0%)'
      } else if (config.postionConfig.type == 'top-left') {
        style.top = 0
        style.left = 0
      } else if (config.postionConfig.type == 'top-right') {
        style.top = 0
        style.right = 0
      } else if (config.postionConfig.type == 'bottom-center') {
        style.bottom = 0
        style.left = '50%'
        style.transform = 'translate(-50%, 0)'
      } else if (config.postionConfig.type == 'bottom-left') {
        style.bottom = 0
        style.left = 0
      } else if (config.postionConfig.type == 'bottom-right') {
        style.bottom = 0
        style.right = 0
      } else if (config.postionConfig.type == 'initial') {
        if (!isEmpty(config.postionConfig.top)) {
          style.top = config.postionConfig.top + config.postionConfig.unit
        }
        if (!isEmpty(config.postionConfig.right)) {
          style.right = config.postionConfig.right + config.postionConfig.unit
        }
        if (!isEmpty(config.postionConfig.bottom)) {
          style.bottom = config.postionConfig.bottom + config.postionConfig.unit
        }
        if (!isEmpty(config.postionConfig.left)) {
          style.left = config.postionConfig.left + config.postionConfig.unit
        }
      }
    }
  }
  if (hasClickAction.value) {
    style.cursor = 'pointer'
  }
  return style
})
function isEmpty(value: any) {
  return value === null || value === undefined || value === '' || value.length === 0
}
const commonStyle = computed(() => {
  return commonstyleConfig(props.componentConfig.options.commonConfig)
})

//可以右键插入的组件
const commonComponentTypes = [
  'van-design-layout',
  'van-design-text',
  'van-design-icon',
  'van-design-button',
  'van-design-field',
  'van-design-select',
  'van-design-calendar',
  'van-design-image',
  'van-design-tabs'
]

const insertComponentList = computed(() => {
  let list = []
  for (const type of commonComponentTypes) {
    let comp = componentConfigMap[type]
    list.push({
      label: comp.name,
      onClick: () => {
        comp.uuid = generateUUID()
        comp.options.commonConfigAssignSign = comp.uuid
        let copyComp = componentDeepClone(comp)
        props.componentList.splice(props.index + 1, 0, copyComp)
        store.componentListMap[copyComp.uuid] = copyComp
      }
    })
  }
  return list
})

const replaceComponentList = computed(() => {
  let list = []
  for (const type of commonComponentTypes) {
    let comp = componentConfigMap[type]
    list.push({
      label: comp.name,
      onClick: () => {
        let oldComp = componentDeepClone(props.componentList[props.index])
        props.componentList.splice(props.index, 1)

        let copyComp = componentDeepClone(comp)
        copyComp.uuid = oldComp.uuid
        copyComp.options.commonConfigAssignName = oldComp.options.commonConfigAssignName
        copyComp.options.commonConfigAssignSign = oldComp.options.commonConfigAssignSign
        props.componentList.splice(props.index, 0, copyComp)
        store.componentListMap[copyComp.uuid] = copyComp
      }
    })
  }
  return list
})

const componentList = computed(() => store.componentTreeList)
const parentList = computed(() => store.currentComponentParentList())
const parentMenuList = computed(() => {
  let parents = store.currentComponentParentList()
  const list = []
  for (let i = 0; i < parents.length - 1; i++) {
    let item = parents[i]
    if (item) {
      list.unshift({
        label: item.name,
        onClick: () => {
          if (!item.uuid) return false
          onChooseComponentItem(item.uuid)
        }
      })
    }
  }
  let page = store.pageConfig
  if (page) {
    list.push({
      label: page.config.reportName,
      onClick: () => {
        onChooseComponentItem('')
      }
    })
  }
  return list
})

function onChooseComponentItem(uuid: string) {
  store.onChangeCurrentComponentUUID(uuid)
}

function rightClickMenu(event: MouseEvent) {
  event.preventDefault()
  onChooseComponentItem(props.componentConfig.uuid)

  let eventList = props.componentConfig.options.eventConfig.eventList
  let list: any = []
  eventList.forEach((event: any) => {
    list.push({
      label: event.eventType === 'click' ? '点击' : event.eventType === 'change' ? '值变化' : event.eventName,
      onClick: () => {
        store.openEventDialog(event.eventType, 'component')
      }
    })
  })

  ContextMenu.showContextMenu({
    theme: 'default',
    x: event.x,
    y: event.y,
    items: [
      {
        label: '复制',
        onClick: () => {
          let currentComponent = store.currentCheckedComponent
          setStorage('clipboard', JSON.stringify(currentComponent))
        }
      },
      {
        label: '粘贴',
        onClick: () => {
          let parseInfo = JSON.parse(getStorage('clipboard'))
          let copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], parseInfo.type, parseInfo.options)
          copyItem.uuid = generateUUID()
          copyItem.options.commonConfigAssignSign = copyItem.uuid
          // copyItem.options._data_origin_component_uuid = this.options.commonConfigAssignSign
          props.componentList.splice(props.index + 1, 0, copyItem)
          componentListTreeToStore(copyItem)
        }
      },
      {
        label: '事件',
        children: list
      },
      {
        label: '移动',
        children: [
          {
            label: '向上移动',
            onClick: () => {
              if (props.index - 1 >= 0) {
                swapArray(props.index, props.index - 1)
              }
            }
          },
          {
            label: '向下移动',
            onClick: () => {
              if (props.index + 1 != props.componentList.length) {
                swapArray(props.index, props.index + 1)
              }
            }
          },
          {
            label: '置顶',
            onClick: () => {
              swapArray(props.index, -1)
            }
          },
          {
            label: '置底',
            onClick: () => {
              swapArray(props.index, props.componentList.length)
            }
          },
          {
            label: '向外移动',
            onClick: () => {
              if (parentList.value.length === 2) {
                //由于组件本来可能是在列表中,向外移动时需要清除_data_origin_component_uuid(即数据绑定)
                props.componentConfig.options._data_origin_component_uuid = ''
                //只嵌套了一层，组件-> 栅格(或其他可嵌套容器)-> 页面，移动到页面中
                let parent = parentList.value[0]
                let parentIndex = componentList.value.findIndex((item) => item.uuid === parent.uuid)
                console.log('parentIndex=', parentIndex)
                store.componentTreeList.splice(parentIndex + 1, 0, props.componentConfig)
                props.componentList.splice(props.index, 1)
              } else if (parentList.value.length > 2) {
                //嵌套了多层
                let target = parentList.value[parentList.value.length - 3]
                if (target.options.columns) {
                  //如果目标组件是个标签页,还需要找到在哪个tab中
                  let parent = parentList.value[parentList.value.length - 2]
                  console.log('parent=', parent)

                  if (target.type === 'van-design-tabs') {
                    let targetTab: any
                    let hasFind = false
                    for (const tab of target.options.columns) {
                      if (hasFind) {
                        break
                      }
                      for (const comp of tab.componentList) {
                        if (hasFind) {
                          break
                        }
                        if (comp.uuid === parent.uuid) {
                          targetTab = tab
                          hasFind = true
                          break
                        }
                      }
                    }
                    targetTab.componentList.push(props.componentConfig)
                  } else {
                    target.options.columns[0].componentList.push(props.componentConfig)
                  }

                  props.componentList.splice(props.index, 1)
                }
              }
            }
          },
          {
            label: '向内移动',
            onClick: () => {
              //判断上一个组件是否是可嵌套容器
              if (props.index < 1) {
                return
              }
              let target = props.componentList[props.index - 1]
              if (target.isNestedComponent) {
                if (target.type === 'van-design-list') {
                  //如果是列表,必须给_data_origin_component_uuid赋值,用于数据绑定
                  props.componentConfig.options._data_origin_component_uuid = target.options.commonConfigAssignSign
                }
                target.options.columns[0].componentList.push(props.componentConfig)
                props.componentList.splice(props.index, 1)
              }
            }
          }
        ]
      },
      {
        label: '插入',
        children: insertComponentList.value
      },
      {
        label: '替换',
        children: replaceComponentList.value
      },
      {
        label: '父级',
        children: parentMenuList.value
      },
      {
        label: '删除',
        onClick: () => {
          props.componentList.splice(props.index, 1)
          delete store.componentListMap[props.componentConfig.uuid]
          //删除组件时需要把权限也删除
          deleteAuthorityService({
            authorityId: props.componentConfig.uuid,
            reportId: store.pageConfig.config.reportId
          })
        }
      },
      {
        label: '保存为业务组件',
        onClick: () => {
          bus.emit('saveToBusiness', props.componentConfig)
        }
      }
    ]
  })
  return false
}

function swapArray(index1: number, index2: number) {
  if (index2 < 0) {
    props.componentList.unshift(props.componentList[index1])
    props.componentList.splice(index1 + 1, 1)
  } else if (index2 >= props.componentList.length) {
    props.componentList.push(props.componentList[index1])
    props.componentList.splice(index1, 1)
  } else {
    props.componentList[index1] = props.componentList.splice(index2, 1, props.componentList[index1])[0]
  }
}
</script>

<style lang="less" scoped>
.component-col {
  display: inline-block;
}
.component-col:hover {
  background: transparent;
  outline: 1px dashed #197aff !important; //outline不会占据额外空间
}

.component-col.active {
  outline: 1px solid #197aff !important; //outline不会占据额外空间
}

.out-layout-class {
  display: inline-block;
  vertical-align: middle;
}
</style>
