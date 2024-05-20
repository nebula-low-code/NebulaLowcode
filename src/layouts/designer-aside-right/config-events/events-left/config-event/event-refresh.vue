<template>
  <div>
    <a-select
      v-model:value="properties.operateRefresh"
      placeholder="选择组件"
      style="width: 250px"
      mode="multiple"
    >
      <a-select-option v-for="(value, key) in componentList" :key="key" :value="value.uuid">
        {{ value.options.commonConfigAssignName }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const componentList = store.refreshComponentList as any[]

const properties = computed(() => store.curDiagram.properties)
</script>

<style scoped></style>
