<template>
  <div>
    <a-select
      v-model:value="properties.operateDisplay"
      placeholder="选择组件"
      style="width: 250px; margin: 8px 0"
      mode="multiple"
    >
      <a-select-option v-for="(value, key) in componentList" :key="key" :value="value.uuid">
        {{ value.options.commonConfigAssignName }}
      </a-select-option>
    </a-select>
    <a-radio-group v-model:value="properties.displayAction" :options="displayOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const componentList = store.allComponentList as any[]

const properties = computed(() => store.curDiagram.properties)
const displayOptions = [
  {
    value: 'display',
    label: '显示'
  },
  {
    value: 'hide',
    label: '隐藏'
  },
  {
    value: 'switch',
    label: '切换'
  }
]
</script>

<style scoped></style>
