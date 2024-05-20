<template>
  <div v-if="!isShowEventLeftMenu">
    <ConfigEvent />
  </div>
  <a-layout-sider v-else class="sider i-scrollbar-hide" :width="isShowEventLeftMenu ? 260 : 0">
    <a-collapse ghost :bordered="false" v-model:activeKey="activeKey" expandIconPosition="right">
      <a-collapse-panel :key="key" v-for="(menuItem, key) in menuList">
        <template #header>
          <div style="font-weight: 500">
            {{ menuItem.label }}
          </div>
        </template>
        <Menu :list="menuItem.eventList" @onDragNode="(data) => $emit('onDragNode', data)" />
      </a-collapse-panel>
    </a-collapse>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import Menu from './menu.vue'
import ConfigEvent from '@/layouts/designer-aside-right/config-events/events-left/config-event/index.vue'

import { pcMenuList } from './menu'
import { useDataStore } from '@/stores'
const store = useDataStore()
const route = useRoute()
const deviceType = route.params.device
console.log('deviceType===', deviceType)

const isShowEventLeftMenu = computed(() => store.isShowEventLeftMenu)
const menuList = pcMenuList
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
