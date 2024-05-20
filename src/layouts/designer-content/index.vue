<template>
  <div class="designer" @click.stop="onClickBlank" @contextmenu.prevent.stop="rightClickMenu">
    <DesignPc :componentTreeList="componentTreeList" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores'

import DesignPc from '@/components/design-pc/index.vue'
import ContextMenu from '@imengyu/vue3-context-menu'
import { componentDeepClone } from '@/utils/component-deep-clone-config'
import { componentConfigMap } from '@/components/design-pc/configs'
import { generateUUID } from '@/utils/uuid'
import { getStorage, setStorage } from '@/utils/storage-util'

const props = defineProps<{
  componentTreeList: any
}>()

const emit = defineEmits(['onPastePage'])

const route = useRoute()
const store = useDataStore()
const deviceType = route.params.device

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

const commonComponentList = computed(() => {
  let list = []
  for (const type of commonComponentTypes) {
    let comp = componentConfigMap[type]
    list.push({
      label: comp.name,
      onClick: () => {
        comp.uuid = generateUUID()
        comp.options.commonConfigAssignSign = comp.uuid
        let copyComp = componentDeepClone(comp)
        props.componentTreeList.push(copyComp)
        store.componentListMap[copyComp.uuid] = copyComp
      }
    })
  }
  return list
})

function onClickBlank() {
  // 在设计器中点击到空白处
  store.onChangeCurrentComponentUUID('')
}

function rightClickMenu(event: MouseEvent) {
  event.preventDefault()
  onClickBlank()
  ContextMenu.showContextMenu({
    theme: 'default',
    x: event.x,
    y: event.y,
    items: [
      {
        label: '复制',
        onClick: () => {
          setStorage('clipboard_pc_report_id', store.pageConfig.config.reportId || '')
        }
      },
      {
        label: '粘贴',
        onClick: () => {
          emit('onPastePage', getStorage('clipboard_pc_report_id'))
        }
      },
      {
        label: '事件',
        children: [
          {
            label: '页面加载',
            onClick: () => {
              store.openEventDialog('load', 'page')
            }
          },
          {
            label: '页面重载',
            onClick: () => {
              store.openEventDialog('show', 'page')
            }
          }
        ]
      }
    ]
  })
  return false
}
</script>

<style lang="less" scoped>
.designer {
  height: 100% !important;
  overflow-y: auto;
}
</style>
