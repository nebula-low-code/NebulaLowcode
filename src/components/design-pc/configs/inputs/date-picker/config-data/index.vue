<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="默认值">
      <ValueSelect :options="options" value-key="defaultValueType" :select-option="defaultValueOptions"></ValueSelect>
    </a-form-item>
    <a-form-item label="组件设值">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataEchoConfig" :echo-config="true" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ValueSelect from '@/components/common-attribute-config/value-select.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
const defaultValueOptions = [
  {
    value: 'Today',
    label: '当日'
  },
  {
    value: 'Monday',
    label: '本周一'
  },
  {
    value: 'MonthStart',
    label: '本月一号'
  }
]
</script>

<style scoped></style>
