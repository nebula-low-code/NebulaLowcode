<template>
  <div style="margin-left: 40px">
    <div style="display: flex; align-items: center">
      <div style="width: 80px">数据结构</div>
      <a-segmented v-model:value="componentOptions.dataFormat" :options="segData" />
    </div>
    <div v-if="componentOptions.dataFormat === '树形数据'">
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">值</div>
        <a-select v-model:value="componentOptions.setOptions.value" placeholder="请选择值">
          <a-select-option v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">名称</div>
        <a-select v-model:value="componentOptions.setOptions.name" placeholder="请选择值">
          <a-select-options v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-options>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">子节点ID</div>
        <a-select v-model:value="componentOptions.setOptions.childrenId" placeholder="请选择值">
          <a-select-option v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
    </div>
    <div v-else>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">值</div>
        <a-select v-model:value="componentOptions.setOptions.value" placeholder="请选择值">
          <a-select-option v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">名称</div>
        <a-select v-model:value="componentOptions.setOptions.name" placeholder="请选择值">
          <a-select-options v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-options>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">节点ID</div>
        <a-select v-model:value="componentOptions.setOptions.id" placeholder="请选择值">
          <a-select-option v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
      <div style="display: flex; align-items: center; margin-top: 10px">
        <div style="width: 80px">父节点ID</div>
        <a-select v-model:value="componentOptions.setOptions.parentId" placeholder="请选择值">
          <a-select-option v-for="item in interfaceParams" :key="item.value" :label="item.label" :value="item.value"> </a-select-option>
        </a-select>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useDataStore } from '@/stores'
import { transformDataListToCascade } from '@/utils/transform-data-list'
import { computed } from 'vue'
const props = defineProps<{
  componentOptions: any
  interfaceParams: any
  optionsKey: string
}>()

const store = useDataStore()
const segData = reactive(['一维数组', '树形数据'])

const respData = computed(() => {
  let list: any = []
  let interfaceDataConfig = props.componentOptions.interfaceDataConfig
  let uuid = interfaceDataConfig.uuid || interfaceDataConfig.id
  let interfaceData = store.interfaceDataById(uuid)
  if (interfaceData) {
    let responseData = interfaceData.data.responseData
    if (responseData && Array.isArray(responseData[interfaceDataConfig.key]) && responseData[interfaceDataConfig.key].length > 0) {
      list = responseData[interfaceDataConfig.key]
    }
  }
  return list
})
</script>
<style scoped></style>
