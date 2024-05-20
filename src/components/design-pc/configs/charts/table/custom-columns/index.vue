<template>
  <div style="display: inline-block; padding: 8px 16px">
    <div class="content" v-if="isReload">
      <div class="title">
        <span>显示设置（拖动排序）</span>
        <a @click="onReset" style="user-select: none; margin-left: 20px">重置</a>
      </div>
      <draggable
        tag="ul"
        class="content-list"
        :list="state.columnList"
        item-key="dataIndex"
        :forceFallback="true"
        ghost-class="ghost"
        @start="drag = true"
        @end="onDragMoveEnd"
      >
        <template #item="{ element }">
          <li
            class="content-list-item"
            v-show="element.title && element.dataIndex !== '_980355088_'"
          >
            <a-checkbox
              v-model:checked="element._isChecked"
              :label="element.title"
              @change="onClickBox($event, element)"
              :disabled="element._noCancel"
            >
              {{ element.title }}
            </a-checkbox>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nextTick, getCurrentInstance, watch, reactive } from 'vue'
import { deepClone } from '@/utils/deep-clone.js'

import draggable from 'vuedraggable'
const props = defineProps<{
  uuid: string
  type: string
  columnsReference: Array<any>
  columsBackups:Array<any>
  columnByKeyMap: object
}>()

let isReload = true
let drag = false
const state:any = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  columnList: []
})
let columnListBackups: any = []
const { proxy } = getCurrentInstance() as any


const onDragMoveEnd = function (e:any) {
  _reloadColumns()
}
const onClickBox = function (isChecked: boolean, columnItem: any) {
  state.columnList.forEach((cItem: any, i: number) => {
    if (cItem.dataIndex == columnItem.dataIndex) {
      cItem._isChecked = columnItem._isChecked
    }
  })

  if (columnItem._noCancel) return false
  _reloadColumns()
}
const onReset = function () {
  state.columnList = deepClone({ obj: columnListBackups }).obj
  state.columnList.forEach((columnItem: any) => {
        columnItem['_isChecked'] = true
    });
  _reloadColumns()
}
const _reloadColumns = function () {
  // 重新渲染Columns（why：不重新渲染页面会报错）
  setTimeout(() => {
    proxy.$emit('onReloadColumns', state.columnList)
  })
}


state.columnList = deepClone({ obj: props.columnsReference }).obj
columnListBackups = deepClone({ obj: props.columsBackups }).obj


</script>

<style scoped>
.ghost {
  visibility: hidden;
}
ul {
  padding-inline-start: 0px;
}
ul li {
  list-style: none;
  line-height: 26px;
}
</style>
