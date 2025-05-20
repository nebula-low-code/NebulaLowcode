<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="值配置">
      <DataValueSelect
        :component-options="options"
        :param-item="options.interfaceDataConfig"
        :hide-page-param="true"
        :hide-component="true"
        :hide-global="true"
        @onChange="onDataSelectChange"
      />
    </a-form-item>
    <a-form-item label="表格行">
        <a-select v-model:value="options.rowSelectKey"    mode="multiple" allowClear placeholder="选择列值" >
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName"  :disabled="isDisabled(item.columnName, 'row')">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="表格列">
      <a-select v-model:value="options.colSelectKey"    mode="multiple" allowClear placeholder="选择列值" >
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName" :disabled="isDisabled(item.columnName, 'col')">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="表格值">
      <a-select v-model:value="options.valSelectKey"   allowClear placeholder="选择列值" >
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName"  :disabled="isDisabled(item.columnName, 'val')">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- <a-form-item label="打开小计：">
        <a-switch v-model:checked="options.subsum" />
    </a-form-item> -->
    <a-form-item label="打开合计：">
        <a-switch v-model:checked="options.sum" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed,reactive,watch,onMounted } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
let state = reactive({
  tableFieldList: [] as any,
  columnValue: [] as any,
  pageNum: 5,
})
// 新增一个方法来检查列名是否已经被选择
function isDisabled(columnName, type) {
  // 检查columnName是否在其他两个下拉框中被选中
  const selectedKeys = [options.value.rowSelectKey, options.value.colSelectKey, options.value.valSelectKey].filter(
    key => key !== undefined
  );
  return selectedKeys.some(selectedKey => {
    if (Array.isArray(selectedKey)) {
      return selectedKey.includes(columnName);
    } else {
      return selectedKey === columnName;
    }
  });
}

// 新增一个方法来更新state.tableFieldList中的disabled状态
function updateTableFieldListDisabledState() {
  state.tableFieldList.forEach(item => {
    item.disabled = isDisabled(item.columnName);
  });
}
// 监听options的变化
watch(() => [options.value.rowSelectKey, options.value.colSelectKey, options.value.valSelectKey], () => {
  updateTableFieldListDisabledState();
});
function onRowEchoSelectChange(selectedOptions: any) {
}

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
</style>
