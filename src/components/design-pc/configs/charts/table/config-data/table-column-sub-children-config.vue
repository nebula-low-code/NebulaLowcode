<template>
  <div class="column-config">
    <a-page-header style="padding: 0" title="表格二级子列" @back="store.backToColumnChildrenConfig()" />
    <ColumnChildrenSelect style="width: 100%" />
    <div class="column-div">
      <draggable
        style="margin-top: 10px"
        tag="ul"
        v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
        handle=".drag-item"
        itemKey="index"
        :list="state.columnsConfigList"
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
    </div>
    <ColumnSubChildrenConfigBasic v-if="state.columnItem.choose" :columnItem="state.columnItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted, watch } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnChildrenSelect from './colunm-children-select.vue'
import ColumnSubChildrenConfigBasic from './table-column-sub-children-config-basic.vue'
import ColumnConfigMore from './table-column-config-more.vue'
const store = useDataStore()
const curColumn = computed(() => store.curColumn)
let state = reactive({
  columnsConfigList: [] as any,
  columnItem: [] as any
})
watch(
  () => store.curColumn.children,
  () => {
    console.log('-watch-----columnsConfigList----', store.curColumn)
    state.columnsConfigList = store.curColumn.children
  },
  {
    immediate: true
  }
)
init()
function init() {
  state.columnsConfigList &&
    state.columnsConfigList.forEach((cItem: any) => {
      cItem.choose = false
    })
}

function handleColumnChoose(element: any) {
  state.columnsConfigList &&
    state.columnsConfigList.forEach((cItem: any) => {
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
  state.columnsConfigList.splice(index, 1)
  calcColIndex()
}
function onDragEnd(item: any) {
  //不能交换位置，应该是插入

//   calcColIndex()
}
function swapArrayElements(arr: any, index1: any, index2: any) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}
// 在拖动和删除后重新计算colindex
// function calcColIndex() {
//   state.columnsConfigList &&
//     state.columnsConfigList.forEach((cItem: any, index: any) => {
//       cItem.colIndex = index
//     })
// }
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.column-icon {
  cursor: pointer;
}
</style>
