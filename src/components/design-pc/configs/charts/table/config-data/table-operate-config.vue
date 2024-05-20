<template>
  <div class="column-config">
    <a-page-header style="padding: 0" title="操作项" @back="store.closeTableOperateConfig()" />
    <div class="column-div">
      <draggable
        style="margin-top: 10px"
        tag="ul"
        v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
        handle=".drag-item"
        itemKey="index"
        :list="state.operateConfigList"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <li :class="{ active: element.choose }" @click="handleColumnChoose(element)">
            <div class="column-title">{{ element.colValue }}</div>

            <i class="column-icon iconfont iconbar drag-item" />
            <i class="column-icon iconfont iconshanchu" style="margin-left: 5px" @click="handleOptionsRemove(index)" />
          </li>
        </template>
      </draggable>
      <div style="text-align: center; cursor: pointer" @click="handleAddOperate">添加操作</div>
    </div>
    <OperateConfigBasic v-if="state.specialItem.choose" :columnItem="state.specialItem" />
    <OperateConfigAdvanced :columnItem="state.columnItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import OperateConfigBasic from './table-operate-config-basic.vue'
import OperateConfigAdvanced from './table-operate-config-advanced.vue'
import { generateUUID } from '@/utils/uuid'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
let existOperateFlag = false
let specialColumnsConfigs = options.value.specialColumnsConfigs
let state = reactive({
  columnItem: [] as any,
  specialItem: {},
  operateConfigList: [] as any
})
init()
function init() {
  let lastCol = options.value.columnsConfigList[options.value.columnsConfigList.length - 1]
  if (lastCol.dataIndex == '操作') {
    existOperateFlag = true
    state.operateConfigList = options.value.specialColumnsConfigs[lastCol.colIndex]
    console.log('-----lyq',options.value.specialColumnsConfigs,options.value.columnsConfigList,lastCol.colIndex)
    state.columnItem = lastCol
  }
  state.operateConfigList&&state.operateConfigList.forEach((cItem: any) => {
    cItem.choose = false
  })
}

function handleColumnChoose(element: any) {
  state.operateConfigList.forEach((cItem: any) => {
    cItem.choose = false
  })
  element.choose = true
  state.specialItem = element
}

function handleOptionsRemove(index: number) {
  let operateIndex = options.value.columnsConfigList.length - 1
  let configArr = state.operateConfigList
  configArr.splice(index, 1)
  if (configArr.length > 0) {
  } else {
    options.value.specialColumnsConfigs.splice(operateIndex, 1)
    options.value.columnsConfigList.splice(operateIndex, 1)
    existOperateFlag = false
  }
}
function onDragEnd(item: any) {
  //   specialColumnsConfigs = swapArrayElements(specialColumnsConfigs, item.oldIndex, item.newIndex)
  //   console.log('end', item, specialColumnsConfigs)
  //   calcColIndex()
}
function swapArrayElements(arr: any, index1: any, index2: any) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}
// 在拖动和删除后重新计算colindex
function calcColIndex() {
  columnsConfigList.forEach((cItem: any, index: any) => {
    cItem.colIndex = index
  })
}
function handleAddOperate() {
  let initFlag = false
  if (!existOperateFlag) {
    options.value.columnsConfigList.push({
      width: 100,
      operatorWidth: 100,
      value: '操作',
      enValue: '',
      title: '操作',
      colValue: '',
      version: '2.0.0',
      dataIndex: '操作',
      key: 'c',
      align: 'center',
      type: 'special-component-table-column',
      colValueType: 'multi-row',
      valueType: 'multi-row',
      colIndex: options.value.columnsConfigList.length,
      specialColumnsConfigs: {},
      interfaceDataConfig: {},
      popoverVisible: false, //用于输入多语言的弹框
      icon: {
        name: 'smile',
        fontClass: 'iconfont ant-smile',
        unicode: 'e78f'
      }
    })
    options.value.specialColumnsConfigs.push([])
    existOperateFlag = true
  }
  // 获取最新的operateConfigList
  init()
  if (!state.operateConfigList) {
    state.operateConfigList = []
  }

  state.operateConfigList.push({
    // valueType: "multi-row",
    colValue: '操作项',
    name: '',
    dataIndex: '操作', // 由于操作是多列，colValue 是单个值
    multiRowIndex: state.operateConfigList.length,
    valueType: 'text',
    specialUUID: 'table-column-' + generateUUID(),
    version: '2.0.0',
    statusConfigList: [],
    tableBindDataRowKeyList: [],
    tableDataRowKeyList: [],
    position: false,
    color: '#1890ff'
  })
}
</script>

<style lang="less" scoped>
.column-config {
  padding: 5px;
}
.column-div {
  height: 300px;
  overflow-y: auto;
}
li {
  line-height: 32px;
  padding-left: 5px;
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  &.active {
    background-color: #e6f7ff;
    color: #1890ff;
  }
}

.column-title {
  width: 80%;
}
.column-icon {
  cursor: pointer;
}
</style>
