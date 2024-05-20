<template>
  <div>
    <a-select
      placeholder="请选择需要打印的组件"
      v-model:value="properties.operatePrintComponentId"
      style="margin-top: 8px; width: 100%"
    >
      <a-select-option v-for="(comp, index) in componentList" :key="index" :value="comp.uuid">
        {{ comp.options.commonConfigAssignName }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
const store = useDataStore()
const componentList = store.allComponentList as any[]

const properties = computed(() => store.curDiagram.properties)
</script>
<style scoped></style>
