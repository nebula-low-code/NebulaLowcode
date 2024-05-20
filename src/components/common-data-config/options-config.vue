<template>
  <div>
    <a-radio-group :size="hideDic ? 'default' : 'small'" v-model:value="options.contentDataSource" button-style="solid" style="margin-bottom: 10px">
      <a-radio-button value="radio-button-interface"> 关联数据 </a-radio-button>
      <a-radio-button value="radio-button-default"> 选项定义 </a-radio-button>
    </a-radio-group>
    <div v-if="options.contentDataSource === 'radio-button-default'">
      <MultiColumnsConfig :columns-configs="options[optionsKey]"></MultiColumnsConfig>
    </div>
    <div v-if="options.contentDataSource === 'radio-button-interface'">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" :hide-component="true" :hide-global="true" :hide-page-param="true" :hide-page-variable="true" />
      <div v-if="valuesList.length > 0" style="margin-top: 10px; display: flex">
        <a-select style="margin-right: 4px" v-model:value="options.labelKey" size="mini" placeholder="请选择名称" allow-clear>
          <a-select-option v-for="item in valuesList" :value="item.value"> </a-select-option>
        </a-select>
        <a-select v-model:value="options.valueKey" size="mini" placeholder="请选择值" allow-clear>
          <a-select-option v-for="item in valuesList" :value="item.value"> </a-select-option>
        </a-select>
      </div>
    </div>
    <div v-if="options.contentDataSource === 'radio-button-dictionary'">
      <a-select style="margin-right: 4px" v-model:value="options.dicId" size="mini" placeholder="请选择数据字典" allow-clear>
        <a-select-option v-for="item in dicList" :value="item.id">{{ item.dicName }} </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import MultiColumnsConfig from './multi-columns-config.vue'
import DataValueSelect from '@/components/data-value-select/index.vue'
import { useDataStore } from '@/stores'

const props = withDefaults(
  defineProps<{
    options: any
    hideDic?: boolean
    optionsKey?: string
  }>(),
  {
    optionsKey: 'defaultTableData',
    hideDic: true
  }
)
const store = useDataStore()
const dicList = ref<any[]>([])

onMounted(() => {
  dicList.value = []
})

const valuesList = computed(() => {
  let list = []
  let uuid = props.options.interfaceDataConfig.uuid || props.options.interfaceDataConfig.id
  let interfaceData = store.interfaceDataById(uuid)
  if (interfaceData) {
    let responseData = interfaceData.data.responseData
    let data = responseData[props.options.interfaceDataConfig.key]
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
