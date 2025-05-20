<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="值配置">
      <DataValueSelect
        :component-options="options"
        :param-item="options.interfaceDataConfig"
        :hide-page-param="true"
        :hide-component="true"
        :hide-global="true"
        :change-on-select="true"
      />
    </a-form-item>
    <a-form-item v-if="options.contentDataSource === 'radio-button-default'" label="选项配置">
      <a-input-number v-model:value="options.maxValue" addon-before="最大值"></a-input-number>
      <a-input-number
        v-model:value="options.rateValue"
        addon-before="进度值"
        style="margin-top: 8px"
      >
      </a-input-number>
    </a-form-item>
    <a-form-item v-else label="选项配置">
      <div style="display: flex; align-items: center">
        <span style="flex-shrink: 0">最大值：</span>
        <a-select
          v-model:value="options.interfaceDataConfig.maxKey"
          placeholder="请选择最大值"
          key="maxValue"
        >
          <a-select-option v-for="item in respKeys" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 8px">
        <span style="flex-shrink: 0">进度值：</span>
        <a-select
          v-model:value="options.interfaceDataConfig.rateKey"
          placeholder="请选择进度值"
          key="maxValue"
        >
          <a-select-option v-for="item in respKeys" :value="item.value">
            {{ item.label }}
          </a-select-option>
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
const respKeys = computed(() => {
  let keys: any[] = []
  let id = options.value.interfaceDataConfig.uuid
  let interfaceData = store.interfaceDataById(id)
  if (interfaceData) {
    let result = interfaceData.data.responseData

    if (result) {
      for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
          keys.push({
            value: key,
            label: key
          })
        }
      }
    }
  }
  console.log('keys=', keys)
  return keys
})
</script>

<style scoped></style>
