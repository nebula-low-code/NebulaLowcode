<template>
  <div style="text-align: left">
    <span style="font-size: 14px; color: #303133; font-weight: 500; margin: 8px">事件行为</span>
    <div style="text-align: center">
      <div class="event-div" @click="onEventClick('click')" v-if="type === 'component'">
        <i class="event-icon iconfont icondianji" />
        点击事件
      </div>
      <div class="event-div" @click="onEventClick('change')" v-if="type === 'component'">
        <i class="event-icon iconfont iconbiangengguanli" />
        值变化事件
      </div>
      <div class="event-div" @click="onEventClick('load')" v-if="type === 'page'">
        <i class="event-icon iconfont iconbiangengguanli" />
        页面加载
      </div>
      <div class="event-div" @click="onEventClick('show')" v-if="type === 'page'">
        <i class="event-icon iconfont iconbiangengguanli" />
        页面重载
      </div>
      <div class="event-div" @click="onEventClick('approve')" v-if="type === 'workflow'">
        <i class="event-icon iconfont icondianji" />
        同意事件
      </div>
      <div class="event-div" @click="onEventClick('reject')" v-if="type === 'workflow'">
        <i class="event-icon iconfont icondianji" />
        拒绝事件
      </div>
    </div>

    <EventConfigDialog v-if="type === 'workflow'" v-model:open="store.workflowDialogEventVisible" />
    <EventConfigDialog v-else v-model:open="store.dialogEventVisible" />
    <StatusConfig :eventType="'render'" v-model:dialog-visible="store.dialogStatusVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDataStore } from '@/stores'
import EventConfigDialog from '../config-events/index.vue'
import StatusConfig from '@/layouts/designer-aside-right/config-status/index.vue'

const props = defineProps<{
  type: 'component' | 'page' | 'workflow'
}>()

const store = useDataStore()
const dataModelRef = ref()
function onEventClick(type: string) {
  store.openEventDialog(type, props.type)
}

function openDataModelDialog() {
  dataModelRef.value.dialogOpen()
}
</script>

<style lang="less" scoped>
.event-div {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 88%;
  margin: 20px auto;
  align-items: center;
  color: #666;
  cursor: pointer;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
.event-icon {
  font-size: 12px;
  margin: 0 10px;
}
</style>
