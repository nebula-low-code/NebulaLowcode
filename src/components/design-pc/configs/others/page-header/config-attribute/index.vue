<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标题">
        <a-input v-model:value="options.title" />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-model:value="options.subTitle" />
      </a-form-item>
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
