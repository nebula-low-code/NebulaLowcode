<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="标签项">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" />
      <div v-if="valuesList.length > 0" style="margin-top: 10px; display: flex">
        <a-select
          style="margin-right: 4px"
          v-model:value="options.labelKey"
          size="mini"
          placeholder="请选择名称"
          allow-clear
        >
          <a-select-option v-for="item in valuesList" :value="item.value"> </a-select-option>
        </a-select>
        <a-select v-model:value="options.valueKey" size="mini" placeholder="请选择值" allow-clear>
          <a-select-option v-for="item in valuesList" :value="item.value"> </a-select-option>
        </a-select>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
const valuesList = computed(() => {
  let list = []
  let uuid = options.value.interfaceDataConfig.uuid || options.value.interfaceDataConfig.id
  let interfaceData = store.interfaceDataById(uuid)
  if (interfaceData) {
    let responseData = interfaceData.data.responseData
    let data = responseData[options.value.interfaceDataConfig.key]
    if (Array.isArray(data) && data.length > 0) {
      if (data[0]) {
        for (var key in data[0]) {
          list.push({ label: key, value: key })
        }
      }
    }
  }
  return list
})
</script>

<style scoped></style>
