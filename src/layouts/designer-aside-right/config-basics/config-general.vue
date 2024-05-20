<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="组件名称">
      <a-input v-model:value="options.commonConfigAssignName" />
    </a-form-item>
    <a-form-item label="容器">
      <a-checkbox style="vertical-align: middle; margin-right: 10px" v-model:checked="options.commonConfigAssignIsCol"></a-checkbox>
      <a-slider class="slider" v-model:value="options.commonConfigAssignSpanCol" :max="24" :min="1" />
    </a-form-item>
    <a-form-item label="宽度" v-show="!options.commonConfigAssignIsCol">
      <a-select v-model:value="options.commonConfigCompWidthUnit" style="width: 80px; margin-right: 8px">
        <a-select-option value="auto">默认</a-select-option>
        <a-select-option value="%">%</a-select-option>
        <a-select-option value="px">px</a-select-option>
      </a-select>
      <a-input :disabled="options.commonConfigCompWidthUnit === 'auto'" v-model:value="options.commonConfigCompWidth" style="width: 125px" />
    </a-form-item>
    <a-form-item label="高度" v-show="!options.commonConfigAssignIsCol">
      <a-select v-model:value="options.commonConfigCompHeightUnit" style="width: 80px; margin-right: 8px">
        <a-select-option value="auto">默认</a-select-option>
        <a-select-option value="%">%</a-select-option>
        <a-select-option value="px">px</a-select-option>
      </a-select>
      <a-input :disabled="options.commonConfigCompHeightUnit === 'auto'" v-model:value="options.commonConfigCompHeight" style="width: 125px" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped>
.slider {
  display: inline-block;
  width: 165px;
  vertical-align: middle;
}
</style>
