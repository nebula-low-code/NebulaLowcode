<template>
  <!-- <a-select v-model:value="columnValue" mode="multiple" placeholder="请选择表格列" key="maxValue" :max-tag-count="maxTagCount" @change="onColunmChange">
    <a-select-option v-for="item in tableFieldList" :value="item.fieldKey">
      {{ item.fieldKey }}
    </a-select-option>
  </a-select> -->

  <div class="column-div">
    <draggable
      style="margin-top: 10px"
      tag="ul"
      v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }"
      handle=".drag-item"
      itemKey="index"
      :list="columnList"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <li :class="{ active: element.choose }" @click="handleColumnChoose(element)" v-show="element.dataIndex != '操作'">
          <div class="column-title">{{ element.fieldKey }}</div>

          <i class="column-icon iconfont iconbar drag-item" />
          <!-- <i class="column-icon iconfont iconshanchu" style="margin-left: 5px" @click="handleOptionsRemove(index)" /> -->
        </li>
      </template>
    </draggable>
    <ColumnConfigBasic v-if="state.columnItem.choose" :columnItem="state.columnItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { generateUUID } from '@/utils/uuid'
import { isNetworkDatasource } from '@/utils/string-utils'
import { componentConfigMap } from '@/components/design-pc/configs'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import draggable from 'vuedraggable'
import ColumnConfigBasic from './table-column-config-basic.vue'
const store = useDataStore()

const emit = defineEmits(['onChange'])

const options = computed(() => store.currentCheckedComponent.options)
let existOperateFlag = false
const maxTagCount = ref(15)
let state = reactive({
  pageNum: 5,
  columnItem: [] as any,
  searchQuery:""
})
const tableFieldList = computed(() => {
  if (options.value.dataModelId) {
    return store.dataModelById(options.value.dataModelId)
  }
  return []
})

let columnsConfigList = options.value.columnList
const columnList = computed(() =>
options.value.columnList&&options.value.columnList.filter((item) => {
    return item
  })
)





function handleColumnChoose(element: any) {
    columnList.value.forEach((cItem: any) => {
    cItem.choose = false
  })
  element.choose = true
  state.columnItem = element
  console.log('---handleColumnChoose--state.columnItem---',state.columnItem)
}

function onDragEnd(item: any) {
    // 由于computed 拖动不在直接修改columnconfig
    let cTemp = options.value.columnList[item.oldIndex];
    options.value.columnList.splice(item.oldIndex, 1)
    options.value.columnList.splice(item.newIndex, 0, cTemp)

}

onMounted(() => {
  /// columnValue 回显
})
</script>
<style lang="less" scoped>
.column-config {
}
.column-div {
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
