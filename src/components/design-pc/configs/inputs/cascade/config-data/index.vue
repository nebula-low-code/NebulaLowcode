<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="选项设置">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" :hide-page-param="true" :hide-page-variable="true" :hide-component="true" :hide-global="true" />
    </a-form-item>
    <a-form-item v-if="paramsList.length > 0">
      <CascadeOptions options-key="optionsData" :component-options="options" :interface-params="paramsList"></CascadeOptions>
    </a-form-item>
    <a-form-item label="默认值">
      <a-input v-model:value="options.value" />
    </a-form-item>
    <a-form-item label="组件设值">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataEchoConfig" :echo-config="true" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import CascadeOptions from '@/components/common-data-config/cascade-option-config.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)

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
