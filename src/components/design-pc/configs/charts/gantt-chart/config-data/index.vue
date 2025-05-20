<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off" layout="vertical" style="margin-left: 24px">
    <a-form-item label="值配置">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" :hide-page-param="true" :hide-page-variable="true" :hide-component="true" :hide-global="true" />
    </a-form-item>
    <!-- <a-form-item label="选项配置">
      <div style="display: flex; align-items: center; margin-bottom: 8px">
        <div style="width: 80px">开始时间</div>
        <a-select v-model:value="options.beginDate" placeholder="选择开始时间">
          <a-select-option v-for="item in paramsList" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
      <div style="display: flex">
        <div style="width: 80px; align-items: center">结束时间</div>
        <a-select v-model:value="options.endDate" placeholder="选择结束时间">
          <a-select-option v-for="item in paramsList" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div> -->
    <!-- </a-form-item> -->
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ChartsDataConfig from '@/components/common-data-config/chart-config.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)

function onChange(selectedOptions: any) {
  console.log('interfaceDataConfig=', options.value.interfaceDataConfig)
  if (!selectedOptions) {
    options.value.interfaceDataConfig.chartSettings = {
      metrics: [],
      dimension: [],
      yAxisType: [],
      stack: {}
    }
  }
}

const paramsList = computed(() => {
  let list: any = []
  let interfaceDataConfig = options.value.interfaceDataConfig
  let uuid = interfaceDataConfig.uuid || interfaceDataConfig.id
  let interfaceData = store.interfaceDataById(uuid)
  if (interfaceData) {
    let responseData = interfaceData.data.responseData
    if (responseData && Array.isArray(responseData[interfaceDataConfig.key]) && responseData[interfaceDataConfig.key].length > 0) {
      let obj = responseData[interfaceDataConfig.key][0]
      for (let key in obj) {
        list.push({
          value: key,
          label: key
        })
      }
    }
  }
  return list
})
</script>

<style scoped></style>
