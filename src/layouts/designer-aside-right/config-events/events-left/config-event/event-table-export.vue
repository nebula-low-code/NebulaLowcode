<template>
  <div>
    <a-select
      v-model:value="properties.exportTable"
      placeholder="选择要导出的表格"
      style="width: 250px"
    >
      <a-select-option v-for="(value, key) in componentList" :key="key" :value="value.uuid">
        {{ value.options.commonConfigAssignName }}
      </a-select-option>
    </a-select>
    <div style="margin: 8px 0">导出名称</div>
    <a-input placeholder="请输入" v-model:value="properties.exportName"></a-input>
  </div>
</template>
<script setup lang="ts">
// 纯前端的表格导出
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const componentList = store.refreshComponentList as any[]
const properties = computed(() => store.curDiagram.properties)
</script>
<style scoped></style>
