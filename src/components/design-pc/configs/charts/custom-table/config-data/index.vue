<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="值配置">
      <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" :hide-page-param="true" :hide-component="true" :hide-global="true" @onChange="onDataSelectChange" />
    </a-form-item>
    <a-form-item label="表格列">
      <ColumnSelect />
    </a-form-item>
    <a-table :columns="headerColumns" :data-source="filteredList" :pagination="false" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'title'">
          <a-input  v-model:value="record.title" />
        </template>
      </template>
    </a-table>

    <!-- <div class="page-config-div">表格数据选择</div> -->
    <!-- <a-form-item label="选中列值：">
      <a-select v-model:value="options.rowSelectKey" allowClear placeholder="选择列值">
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="回显配置：">
      <DataValueSelect
          :component-options="options"
          :param-item="options.echoRowConfig"
          :hide-page-param="true"
          :hide-page-variable="true"
          :hide-component="true"
          :hide-global="true"
          @onChange="onRowEchoSelectChange"
          style="width: 215px"
        />
    </a-form-item> -->
  </a-form>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
const filteredList = computed(() => options.value.header)
console.log('---filteredList---',filteredList.value)
let state = reactive({
  tableFieldList: [] as any,
  columnValue: [] as any,
  pageNum: 5,
  searchQuery: ''
})

const headerColumns = [
  {
    title: '列值',
    dataIndex: 'dataIndex'
  },
  {
    title: '列名',
    dataIndex: 'title'
  }
]
function onRowEchoSelectChange(selectedOptions: any) {}

function onDataSelectChange(selectedOptions: any) {
  if (selectedOptions && selectedOptions.length > 1) {
    initTableFieldList(selectedOptions[0].value, selectedOptions[1].value)
  }
}
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  state.tableFieldList = []
  if (interfaceData) {
    let respList = interfaceData.data.responseData[key]
    if (respList && respList.length > 0) {
      let temp = respList[0]
      for (let k in temp) {
        state.tableFieldList.push({
          columnName: k
        })
      }
    }
  }
}

function onEventClick(type: any) {
  if (type == 'column') {
    store.showTableColumnConfig()
  }
}

onMounted(() => {
  let operateApiId = options.value.interfaceDataConfig.uuid
  if (operateApiId) {
    initTableFieldList(operateApiId, options.value.interfaceDataConfig.key)
  }
})
</script>

<style scoped>
.page-config-div {
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  flex: 1;
}
.event-div {
  display: flex;
  justify-content: center;
}
.event-div-row {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin: 20px auto;
  align-items: center;
  color: #666;
  cursor: pointer;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 88%;
  align-items: center;
  color: #666;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
</style>
