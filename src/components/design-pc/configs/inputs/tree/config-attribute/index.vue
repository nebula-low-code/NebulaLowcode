<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="默认展开">
        <a-switch v-model:checked="options.expandAll" />
      </a-form-item>
      <a-form-item label="是否多选">
        <a-switch v-model:checked="options.multiple" />
      </a-form-item>
      <a-form-item label="PATH信息">
        <a-switch v-model:checked="options.containPath" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
