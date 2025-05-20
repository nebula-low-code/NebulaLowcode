<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="尺寸">
        <a-input-number v-model:value.number="options.width" style="width: 100%" />
      </a-form-item>
      <!-- <a-form-item label="高度">
        <a-input-number v-model:value.number="options.height" style="width: 100%" />
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style lang="less" scoped></style>
