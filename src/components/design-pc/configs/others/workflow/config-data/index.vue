<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="工作流ID">
      <ValueSelect :component-options="options" :param-item="options.workflowIdConfig" :hide-interface="true" :hide-event-interface="true" />
    </a-form-item>
    <a-form-item label="记录ID">
      <ValueSelect :component-options="options" :param-item="options.logIdConfig" :hide-interface="true" :hide-event-interface="true" />
    </a-form-item>
    <EventConfig type="workflow"></EventConfig>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import ValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'
import EventConfig from '@/layouts/designer-aside-right/config-basics/config-event.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

function onEventClick(type: string) {}
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
