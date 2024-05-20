<template>
  <div>
    <i class="select-icon" :class="options[valueKey].fontClass" @click="openIconSelect" />
    <IconSelectDialog ref="iconRef" @selectIcon="selectIcon"></IconSelectDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconSelectDialog from '@/layouts/modal/icon-select-dialog.vue'
const props = defineProps<{
  options: any
  valueKey: string
}>()

const iconRef = ref()

function openIconSelect() {
  iconRef.value.onOpen()
}

function selectIcon(icon: any) {
  props.options[props.valueKey] = icon
}
</script>

<style scoped>
.select-icon {
  font-size: 24px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
}
</style>
