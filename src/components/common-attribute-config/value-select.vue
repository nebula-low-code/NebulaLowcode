<template>
  <a-select v-model:value="options[valueKey]" allowClear @change="onChange">
    <a-select-option v-for="(item, index) in selectOption" :key="index" :value="item.value">
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any
  valueKey: string
  selectOption: any
}>()

const emit = defineEmits(['onChange'])
function onChange(value: any) {
  emit('onChange', value)
}
</script>

<style scoped></style>
