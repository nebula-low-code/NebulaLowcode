<template>
  <a-select v-model:value="columnValue" mode="multiple" placeholder="请选择表格列" key="maxValue" :max-tag-count="maxTagCount" @change="onColunmChange">
    <a-select-option v-for="item in tableFieldList" :value="item.columnName">
      {{ item.columnName }}
    </a-select-option>
  </a-select>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { generateUUID } from '@/utils/uuid'
import { isNetworkDatasource } from '@/utils/string-utils'
import { componentConfigMap } from '@/components/design-pc/configs'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
const store = useDataStore()

const emit = defineEmits(['onChange'])

const options = computed(() => store.currentCheckedComponent.options)
let existOperateFlag = false
const maxTagCount = ref(15)
const tableFieldList = computed(() => {
  if (isNetworkDatasource(options.value.contentDataSource)) {
    return initTableFieldList(options.value.interfaceDataConfig.uuid, options.value.interfaceDataConfig.key)
  }
  return []
})
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  let tableFieldList = []
  if (interfaceData) {
    let respList = interfaceData.data.responseData[key]
    if (respList && respList.length > 0) {
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
  options.value.header &&
    options.value.header.forEach((cItem: any, index: any) => {
      tempValue.push(cItem.dataIndex)
    })
  return tempValue
})
let state = reactive({
  pageNum: 5
})
// let columnValue= [] as any
function onColunmChange(values: any) {
  console.log('------onColunmChange-----', values)
  if (!options.value.header) {
    options.value.header = []
    options.value.columnsConfigList = [{}]
  }
  options.value.header.forEach((cItem: any, index: any) => {
    let exist = false
    let dataIndex = ''
    values.forEach((vItem: any) => {
      if (vItem == cItem.dataIndex) {
        dataIndex = cItem.dataIndex
        exist = true
      }
    })
    if (!exist) {
      options.value.header.splice(index, 1)
      delete options.value.columnsConfigList[0][dataIndex]
    }
  })
  values&&values.forEach((vItem: any) => {
    let exist = false
    existOperateFlag = false
    options.value.header.forEach((cItem: any) => {
      if (vItem == cItem.dataIndex) {
        exist = true
      }
    })
    if (!exist) {
      options.value.header.push({ key: vItem, title: vItem, dataIndex: vItem })
      options.value.columnsConfigList[0][vItem] = []
      addText(options.value.columnsConfigList[0][vItem],vItem)
    }
  })
}

// 触发添加一个文本
function addText(list,dataIndex) {
  let comp = componentConfigMap['van-design-text']
  let copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], comp.type, comp.options)

  copyItem.options._data_origin_component_uuid = options.value.commonConfigAssignSign
  copyItem.options.contentDataSource = 'radio-button-bind';
  copyItem.options.interfaceDataConfig.bindDataKey=dataIndex
  list.push(copyItem)
  store.componentListMap[copyItem.uuid] = copyItem
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
