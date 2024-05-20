<template>
  <!-- 图表配置 -->
  <a-form :label-col="{ span: 6 }" autocomplete="off">
    <a-form-item label="横轴" v-if="selectedChartDataList.length">
      <a-select
        v-model:value="interfaceDataConfig.chartSettings.dimension"
        style="width: 100%"
        placeholder="请选择"
        :mode="typeof interfaceDataConfig.chartSettings.dimension === 'object' ? 'multiple' : ''"
      >
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :key="key" :label="key" :value="key"> </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="纵轴" v-if="selectedChartDataList.length">
      <a-select
        v-model:value="interfaceDataConfig.chartSettings.metrics"
        style="width: 100%"
        placeholder="请选择"
        :mode="typeof interfaceDataConfig.chartSettings.metrics === 'object' ? 'multiple' : ''"
        key="metrics"
        :disabled="interfaceDataConfig.dynamicYAxis"
      >
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :value="key">
          {{ key }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="堆叠" v-if="selectedChartDataList.length && !!interfaceDataConfig.stack">
      <a-select v-model:value="interfaceDataConfig.stack" style="width: 100%" placeholder="请选择" :mode="typeof interfaceDataConfig.stack === 'object' ? 'multiple' : ''" key="stack">
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :value="key">
          {{ key }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="线性" style="padding-top: 10px" v-if="selectedChartDataList.length && !!interfaceDataConfig.chartSettings.showLine">
      <a-select v-model:value="interfaceDataConfig.chartSettings.showLine" style="width: 100%" placeholder="请选择" mode="multiple" key="showLine">
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :value="key">
          {{ key }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="动态纵轴" v-if="selectedChartDataList.length && interfaceDataConfig.dynamicYAxis != undefined">
      <a-switch v-model:checked="interfaceDataConfig.dynamicYAxis" />
    </a-form-item>
    <a-form-item label="纵轴数据类型" v-if="selectedChartDataList.length && !!interfaceDataConfig.chartSettings.yAxisType">
      <a-select v-model:value="interfaceDataConfig.yAxisType" style="width: 100%" placeholder="请选择">
        <a-select-option v-for="item in axisType" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="纵轴数据类型" v-if="selectedChartDataList.length && !!interfaceDataConfig.chartSettings.xAxisType">
      <a-select v-model:value="interfaceDataConfig.xAxisType" style="width: 100%" placeholder="请选择">
        <a-select-option v-for="item in axisType" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
const props = defineProps<{
  interfaceDataConfig: any
}>()

const store = useDataStore()
const axisType = [
  {
    value: 'normal',
    label: '常规'
  },
  {
    value: 'percent',
    label: '百分比'
  },
  {
    value: 'KMB',
    label: 'KMB'
  }
]

const selectedChartDataList = computed(() => {
  let id = props.interfaceDataConfig.uuid || props.interfaceDataConfig.id
  let resp: any[] = []
  let interfaceData = store.interfaceDataById(id)
  if (interfaceData) {
    let result = interfaceData.data.responseData
    if (result) {
      resp = result[props.interfaceDataConfig.key]
    }
  }
  return resp
})
</script>
<style scoped lang="scss"></style>
