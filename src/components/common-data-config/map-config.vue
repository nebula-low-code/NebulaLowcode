<template>
  <!-- 图表配置 -->
  <a-form :label-col="{ span: 6 }" autocomplete="off">
    <a-form-item label="经度" v-if="selectedChartDataList.length" >
      <a-select
        v-model:value="interfaceDataConfig.mapSettings.lng"
        style="width: 100%"
        placeholder="请选择"        
      >
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :key="key" :label="key" :value="key"> </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="纬度" v-if="selectedChartDataList.length">
      <a-select
        v-model:value="interfaceDataConfig.mapSettings.lat"
        style="width: 100%"
        placeholder="请选择"
      >
        <a-select-option v-for="(value, key) in selectedChartDataList[0]" :value="key">
          {{ key }}
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
<style scoped>
:deep(.ant-form-item-label){
    line-height: 32px;
    padding-bottom: 0;
}
</style>
