<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="最小值">
        <a-input-number style="width: 100%" v-model:value.number="options.min" />
      </a-form-item>
      <a-form-item label="最大值">
        <a-input-number style="width: 100%" v-model:value.number="options.max" />
      </a-form-item>
      <a-form-item label="步长">
        <a-input-number style="width: 100%" :min="0" v-model:value.number="options.step" />
      </a-form-item>
      <a-form-item label="小数位数">
        <a-input-number style="width: 100%" :min="0" v-model:value.number="options.precision" />
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
