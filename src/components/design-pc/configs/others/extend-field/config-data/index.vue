<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <div>
      <a-form-item label="值配置">
        <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" @onChange="onChange" />
      </a-form-item>
      <a-form-item label="名称">
        <a-select v-model:value="options.extendName" allowClear placeholder="请选择名称" key="maxValue">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="类型">
        <a-select v-model:value="options.extendType" allowClear placeholder="请选择类型" key="maxValue">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="默认值">
        <a-select v-model:value="options.extendValue" allowClear placeholder="请选择默认值" key="maxValue">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { computed, reactive,onMounted } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'

const store = useDataStore()
let state = reactive({
  tableFieldList: [] as any
})
const options = computed(() => store.currentCheckedComponent.options)

function onChange(selectedOptions: any) {
  console.log('interfaceDataConfig=', selectedOptions, options.value.interfaceDataConfig)
  initTableFieldList(options.value.interfaceDataConfig.uuid, options.value.interfaceDataConfig.key)
}
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  state.tableFieldList = []
  if (interfaceData) {

      let respList = interfaceData.data.responseData[key]
      if (respList&&respList.length > 0) {
        let temp = respList[0]
        for (let k in temp) {
          state.tableFieldList.push({
            columnName: k
          })
        }
      }
  }
}

onMounted(() => {
  //老版本回显处理
  let operateApiId = options.value.interfaceDataConfig.uuid
  if (operateApiId) {
    initTableFieldList(operateApiId,options.value.interfaceDataConfig.key)
  }
})
</script>

<style scoped></style>
