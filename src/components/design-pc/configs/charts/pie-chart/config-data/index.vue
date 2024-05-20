<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off" layout="vertical" style="margin-left: 24px">
    <a-form-item label="值配置">
      <DataValueSelect
        :component-options="options"
        :param-item="options.interfaceDataConfig"
        :hide-page-param="true"
        :hide-page-variable="true"
        :hide-component="true"
        :hide-global="true"
        @onChange="onChange"
      />
    </a-form-item>
    <a-form-item label="选项配置">
      <ChartsDataConfig :interface-data-config="options.interfaceDataConfig"> </ChartsDataConfig>
    </a-form-item>
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
  if (!selectedOptions) {
    options.value.interfaceDataConfig.chartSettings = {
      metrics: [],
      dimension: [],
      yAxisType: [],
      stack: {}
    }
  }
}
</script>

<style scoped></style>
