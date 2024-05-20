<template>
  <div class="column-config">
    <a-page-header style="padding: 0" title="表格列" @back="store.closeTableColumnConfig()" />
    <ColumnSelect style="width: 100%" />
    <a-input v-model:value="state.searchQuery" v-if="columnsConfigList.length>15" placeholder="搜索..."></a-input>
    <div class="column-div">
      <draggable
        style="margin-top: 10px"
        tag="ul"
        v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
        handle=".drag-item"
        itemKey="index"
        :list="filteredList"
        @end="onDragEnd"
      >
        <template #item="{ element, index }">
          <li :class="{ active: element.choose }" @click="handleColumnChoose(element)" v-show="element.dataIndex != '操作'">
            <div class="column-title">{{ element.dataIndex }}</div>

            <i class="column-icon iconfont iconbar drag-item" />
            <i class="column-icon iconfont iconshanchu" style="margin-left: 5px" @click="handleOptionsRemove(index)" />
          </li>
        </template>
      </draggable>
      <div>扩展字段 <a-switch v-model:checked="options.dynamicCol"></a-switch></div>
    </div>
    <ColumnConfigBasic v-if="state.columnItem.choose" :columnItem="state.columnItem" />
    <ColumnConfigMore v-if="state.columnItem.choose" :columnItem="state.columnItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'
import ColumnConfigBasic from './table-column-config-basic.vue'
import ColumnConfigMore from './table-column-config-more.vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const filteredList=computed(() =>   
      columnsConfigList.filter(item => {  
        return item.dataIndex.toLowerCase().includes(state.searchQuery.toLowerCase());  
      }) )
let columnsConfigList = options.value.columnsConfigList
let specialColumnsConfigs = options.value.specialColumnsConfigs
let state = reactive({
  columnItem: [] as any,
  searchQuery:""
})

init()
function init() {
  columnsConfigList &&
    columnsConfigList.forEach((cItem: any) => {
      cItem.choose = false
    })
}

function handleColumnChoose(element: any) {
  columnsConfigList.forEach((cItem: any) => {
    cItem.choose = false
  })
  element.choose = true
  state.columnItem = element
}
function columnOnchange() {
  console.log('columnOnchange')
  calcColIndex()
}
function handleOptionsRemove(index: number) {
  columnsConfigList.splice(index, 1)
  specialColumnsConfigs.splice(index, 1)
  calcColIndex()
}
function onDragEnd(item: any) {
    // 由于computed 拖动不在直接修改columnconfig
    let cTemp = columnsConfigList[item.oldIndex];
    columnsConfigList.splice(item.oldIndex, 1)
    columnsConfigList.splice(item.newIndex, 0, cTemp)

    //不能交换位置，应该是插入
    let tempItem = specialColumnsConfigs[item.oldIndex];
    specialColumnsConfigs.splice(item.oldIndex, 1)
    specialColumnsConfigs.splice(item.newIndex, 0, tempItem)
  console.log('end', item, specialColumnsConfigs)
  calcColIndex()
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
  -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none;
}
.column-icon {
  cursor: pointer;
}
</style>
