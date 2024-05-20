<template>
  <div>
    <a-select v-model:value="options[valueKey].algorithm" placeholder="请选择">
      <a-select-option v-for="item in regressionType" :value="item.value">
        {{ item.label }}
      </a-select-option>
    </a-select>
    <div style="display: flex; margin-top: 8px" v-if="options[valueKey].algorithm == 'polynomial'">
      多项式阶数
      <a-select
        style="margin-left: 8px; width: 113px"
        v-model:value="options[valueKey].order"
        placeholder="请选择"
      >
        <a-select-option v-for="item in order" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any
  valueKey: string
}>()
const regressionType = [
  {
    label: '无',
    value: 'none'
  },
  {
    label: '线性回归',
    value: 'linear'
  },
  {
    label: '指数回归',
    value: 'exponential'
  },
  {
    label: '对数回归',
    value: 'logarithmic'
  },
  {
    label: '多项式回归',
    value: 'polynomial'
  }
]
const order = [
  {
    label: '2',
    value: 2
  },
  {
    label: '3',
    value: 3
  },
  {
    label: '4',
    value: 4
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '6',
    value: 6
  },
  {
    label: '7',
    value: 7
  },
  {
    label: '8',
    value: 8
  },
  {
    label: '9',
    value: 9
  }
]
</script>

<style lang="less" scoped></style>
