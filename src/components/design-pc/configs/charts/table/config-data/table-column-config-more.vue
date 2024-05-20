<template>
  <div class="column-config">
    <div style="margin: 10px">更多配置</div>
    <div class="event-div">
      <div class="event-div-col" style="width: 40%" @click="onEventClick('click')">
        <i class="event-icon iconfont iconfabu1" />
        点击事件
      </div>
      <div class="event-div-col" @click="onEventClick('render')">
        <i class="event-icon iconfont iconbiangengguanli" />
        渲染器
      </div>
      <div class="event-div-col" @click="onClickChildren()">表格子列</div>
    </div>
    <EventConfig :eventType="store.eventType" v-model:open="store.dialogEventVisible" />
    <StatusConfig :eventType="'render'" v-model:dialog-visible="store.dialogStatusVisible" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'

import EventConfig from '@/layouts/designer-aside-right/config-events/index.vue'
import StatusConfig from '@/layouts/designer-aside-right/config-status/index.vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
let specialColumnsConfigs = options.value.specialColumnsConfigs
const props = defineProps<{
  columnItem: any
}>()

const labelCol = { style: { width: '80px' } }
function onEventClick(type: any) {
  if (type == 'click') {
    store.curColumn = props.columnItem
    store.openEventDialog('click', 'column')
  } else {
    store.curColumn = props.columnItem
    store.openStatusDialog()
  }
}
function onClickChildren(){
    console.log('onClickChildren')
    store.curColumn = props.columnItem
    store.showTableColumnChildrenConfig();
}
</script>

<style lang="less" scoped>
.column-config {
  padding: 5px;
}
.event-div {
  display: flex;
  justify-content: space-between;
}
.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 30%;
  align-items: center;
  color: #666;
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
  margin-right: 10px;
}
</style>
