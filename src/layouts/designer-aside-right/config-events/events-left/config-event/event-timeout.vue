<template>
  <a-input-number v-model:value="properties.timeout" addon-after="ms" />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
</script>
<style scoped></style>
