<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="类型">
        <RadioButton :options="options" value-key="type" :radio-options="typeOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="数值显示">
        <a-switch v-model:checked="options.numberShow" />
      </a-form-item>
      <a-form-item label="宽度">
        <a-input-number v-model:value="options.strokeWidth" min="0" style="width: 100%" />
      </a-form-item>
      <a-form-item label="颜色">
        <ColorConfig :color="options.color" @changeColor="changeColor" :options="options" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const typeOptions = [
  {
    label: '进度条',
    value: 'line'
  },
  {
    label: '进度圈',
    value: 'circle'
  },
  {
    label: '仪表盘',
    value: 'dashboard'
  }
]

function changeColor(color: string) {
  options.value.color = color
  options.value.themeChanged.color = true
}
</script>

<style scoped></style>
