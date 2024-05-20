<template>
  <a-select v-model:value="columnValue" mode="multiple" placeholder="请选择表格列" key="maxValue"  :max-tag-count="maxTagCount" @change="onColunmChange">
    <a-select-option v-for="item in tableFieldList" :value="item.columnName">
      {{ item.columnName }}
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { generateUUID } from '@/utils/uuid'
const store = useDataStore()

const emit = defineEmits(['onChange'])

const options = computed(() => store.currentCheckedComponent.options)
let existOperateFlag = false
const maxTagCount= ref(15);
const tableFieldList = computed(() => {
  if (options.value.contentDataSource == 'radio-button-interface') {
    return initTableFieldList(options.value.interfaceDataConfig.uuid, options.value.interfaceDataConfig.key)
  }
  return []
})
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  let tableFieldList = []
  if (interfaceData) {
  
      let respList = interfaceData.data.responseData[key]
      if (respList&&respList.length > 0) {
        let temp = respList[0]
        for (let k in temp) {
          tableFieldList.push({
            columnName: k
          })
        }
      }
  }
  return tableFieldList
}
const columnValue = computed(() => {
  let tempValue = [] as any
  options.value.columnsConfigList &&
    options.value.columnsConfigList.forEach((cItem: any, index: any) => {
      if (cItem.dataIndex !== '操作') {
        tempValue.push(cItem.dataIndex)
      }
    })
  return tempValue
})
let state = reactive({
  pageNum: 5
})
// let columnValue= [] as any
function onColunmChange(values: any) {
  if (!options.value.columnsConfigList) {
    options.value.columnsConfigList = []
    options.value.specialColumnsConfigs = []
  }
  options.value.columnsConfigList.forEach((cItem: any, index: any) => {
    let exist = false
    values.forEach((vItem: any) => {
      if (vItem == cItem.dataIndex) {
        exist = true
      }
    })
    if (cItem.dataIndex == '操作') {
      exist = true
    }
    if (!exist) {
      options.value.columnsConfigList.splice(index, 1)
      options.value.specialColumnsConfigs.splice(index, 1)
    }
  })

  values.forEach((vItem: any) => {
    let exist = false
    existOperateFlag = false
    options.value.columnsConfigList.forEach((cItem: any) => {
      if (vItem == cItem.dataIndex) {
        exist = true
      }
      if (cItem.dataIndex == '操作') {
        existOperateFlag = true
      }
    })
    if (!exist) {
      let colIndex = options.value.columnsConfigList.length
      let columnItem = {
        width: 200,
        value: vItem,
        enValue: '',
        colValue: vItem,
        dataIndex: vItem,
        key: '',
        align: 'center',
        colIndex: colIndex,
        specialColumnsConfigs: {},
        interfaceDataConfig: {},
        version: '2.0.0',
        popoverVisible: false //用于输入多语言的弹框
      }
      // 2023-08-24 这块处理 specialColumn 的逻辑 后面想想能不能优化
      let specialColumnItem = {
        colValue: vItem,
        valueType: 'value',
        dataIndex: vItem,
        specialUUID: 'table-column-' + generateUUID(),
        statusConfigList: [],
        tableBindDataRowKeyList: [],
        tableDataRowKeyList: []
      }
      if (existOperateFlag) {
        let index1 = options.value.columnsConfigList.length - 1
        options.value.columnsConfigList.splice(index1, 0, columnItem)
        options.value.specialColumnsConfigs.splice(index1, 0, [specialColumnItem])
      } else {
        options.value.columnsConfigList.push(columnItem)
        options.value.specialColumnsConfigs.push([specialColumnItem])
      }
    }
  })
  calcColIndex()
}
function calcColIndex() {
  options.value.columnsConfigList.forEach((cItem: any, index: any) => {
    cItem.colIndex = index
  })
}
onMounted(() => {
  /// columnValue 回显
})
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  text-align: left;
}

.table-column-item {
  padding: 5px;
  .iconfont {
    &.active {
      color: #197aff;
    }
  }
}
.event-div {
  display: flex;
  justify-content: space-between;
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
  width: 44%;
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
</style>
