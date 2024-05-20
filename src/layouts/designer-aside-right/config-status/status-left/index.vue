<template>
  <div v-if="!isShowEventLeftMenu">
    <ConfigStatus />
  </div>
  <a-layout-sider v-else class="sider i-scrollbar-hide" :width="isShowEventLeftMenu ? 260 : 0">
    <a-collapse ghost :bordered="false" v-model:activeKey="activeKey" expandIconPosition="right">
      <a-collapse-panel :key="key" v-for="(menuItem, key) in menuList">
        <template #header>
          <div style="font-weight: 500">
            {{ menuItem.label }}
          </div>
        </template>
        <Menu :list="menuItem.componentList" @onDragNode="(data) => $emit('onDragNode', data)" />
      </a-collapse-panel>
    </a-collapse>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import Menu from './menu.vue'
;('@/l')
import ConfigStatus from '@/layouts/designer-aside-right/config-status/status-left/config-status/index.vue'

import { statusMenuList } from './menu'
import { useDataStore } from '@/stores'
const store = useDataStore()
const route = useRoute()
const props = defineProps({
  isOperate: {
    type: Boolean,
    default: false
  }
})

const deviceType = route.params.device
const isShowEventLeftMenu = computed(() => store.isShowEventLeftMenu)
let menuList = [] as any
let tempMenuList = JSON.parse(JSON.stringify(statusMenuList))
if (props.isOperate) {
  tempMenuList[0].componentList = tempMenuList[0].componentList.filter((v: any) => v.type === 'status-operate-operate')
} else {
  tempMenuList[0].componentList = tempMenuList[0].componentList.filter((v: any) => v.type !== 'status-operate-operate')
}
menuList = tempMenuList
const activeKey = ref(['0', '1', '2', '3', '4'])
</script>

<style scoped>
.sider {
  overflow-y: auto;
  background: #fff;
}
:deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0px;
  overflow: hidden;
}
</style>
