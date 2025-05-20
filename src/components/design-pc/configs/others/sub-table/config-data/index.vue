<template>
   <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="表格列">
     
      </a-form-item>
      <ColumnSelect />
       <!-- <a-form-item label="值配置">
        <DataValueSelect
          :component-options="options"
          :param-item="options.interfaceDataConfig"
          :hide-page-param="true"
          :hide-component="true"
          :hide-global="true"
          @onChange="onDataSelectChange"
        />
      </a-form-item>
    <div class="page-config-div">表格数据选择</div>
      <a-form-item label="选中列值：">
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
  import { computed,reactive } from 'vue'
  import { useDataStore } from '@/stores'
  import DataValueSelect from '@/components/data-value-select/index.vue'
  import ColumnSelect from './colunm-select.vue'
  
  const store = useDataStore()
  
  const options = computed(() => store.currentCheckedComponent.options)
  let state = reactive({
    tableFieldList: [] as any,
    columnValue: [] as any,
    pageNum: 5
  })
  function onRowEchoSelectChange(selectedOptions: any) {
  }
  
  
  </script>
  
  <style scoped>
  .page-config-div {
    font-weight: 500;
    height: 32px;
    line-height: 32px;
    flex: 1;
  }
  </style>
  