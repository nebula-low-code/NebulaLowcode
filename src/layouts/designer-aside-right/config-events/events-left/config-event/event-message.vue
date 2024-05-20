<template>
  <div>
    <a-select
      placeholder="提示框类型"
      v-model:value="properties.actionSet.dialogType"
      style="margin-top: 8px; width: 100%"
    >
      <a-select-option v-for="(item, index) in dialogTypeOptions" :key="index" :value="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
    <a-radio-group v-model:value="properties.actionSet.valueType">
      <a-radio value="constant">
        <a-textarea
          placeholder="请输入提示信息"
          v-model:value="properties.popupBody"
          style="width: 227px; margin: 8px 0"
        />
      </a-radio>
      <a-radio value="custom">
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <EventValueSelect :param-item="properties.actionSet.getInfo" style="width: 227px" />
        </span>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)

const dialogTypeOptions = [
  {
    value: 'success',
    label: '成功'
  },
  {
    value: 'fail',
    label: '失败'
  },
  {
    value: 'warning',
    label: '警告'
  },
  {
    value: 'info',
    label: '通知'
  }
]
</script>
<style scoped></style>
