<template>
  <div>
    <a-textarea
      placeholder="请输入确认信息"
      v-model:value="properties.popupBody"
      style="margin-top: 8px"
    ></a-textarea>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
</script>
<style scoped></style>
