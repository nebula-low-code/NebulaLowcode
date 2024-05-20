<template>
  <div>
    <div>
      <a-input-number style="width: 100px; margin-left: 52px" v-model:value="options[valueKey].top">
        <template #addonAfter>px</template>
      </a-input-number>
    </div>
    <div style="align-items: center; margin-bottom: 4px; margin-top: 4px">
      <a-input-number
        style="width: 100px; margin-right: 8px"
        v-model:value="options[valueKey].left"
      >
        <template #addonAfter>px</template>
      </a-input-number>
      <a-input-number style="width: 100px" v-model:value="options[valueKey].right">
        <template #addonAfter>px</template>
      </a-input-number>
    </div>
    <div>
      <a-input-number
        style="width: 100px; margin-left: 52px"
        v-model:value="options[valueKey].bottom"
      >
        <template #addonAfter>px</template>
      </a-input-number>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any
  valueKey: string
}>()
</script>

<style scoped></style>
