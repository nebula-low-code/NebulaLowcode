<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="配色方案">
        <ChartsColor :options="options" value-key="chartColors"></ChartsColor>
      </a-form-item>
      <a-form-item label="图例">
        <RadioButton :options="options" size="small" value-key="legendAlign" :radio-options="legendAlign"></RadioButton>
      </a-form-item>
      <a-form-item label="形状">
        <ValueSelect :options="options" value-key="shape" :select-option="shapeOption"></ValueSelect>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ChartsColor from '@/components/common-attribute-config/select-color-charts.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import ValueSelect from '@/components/common-attribute-config/value-select.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

const legendAlign = [
  {
    label: '上',
    value: 'top'
  },
  {
    label: '下',
    value: 'bottom'
  },
  {
    label: '左',
    value: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '无',
    value: 'none'
  }
]

const shapeOption = [
  {
    label: '多边形',
    value: 'polygon'
  },
  {
    label: '圆形',
    value: 'circle'
  }
]
</script>

<style scoped></style>
