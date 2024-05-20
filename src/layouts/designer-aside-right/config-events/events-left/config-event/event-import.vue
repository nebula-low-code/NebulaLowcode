<template>
  <div>
    <InterfaceSelect
      :interfaceDataConfig="properties.interfaceDataConfig"
      :properties="properties"
      :isImport="true"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import InterfaceSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/interface-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
</script>
<style scoped></style>
