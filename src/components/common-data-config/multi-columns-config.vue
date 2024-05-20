<template>
  <div>
    <draggable tag="ul" v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }" handle=".drag-item" itemKey="index" :list="columnsConfigs">
      <template #item="{ element, index }">
        <li style="display: flex; margin-bottom: 10px">
          <a-input v-model:value="element.label" style="width: 80px" size="mini" placeholder="名称" />
          <a-input v-model:value="element.value" style="width: 80px; margin-left: 10px" size="mini" placeholder="值" />
          <i class="iconfont iconbar columns-icon drag-item" />

          <i class="iconfont icontrash columns-icon" @click="handleOptionsRemove(index)" />
        </li>
      </template>
    </draggable>
    <a-button type="link" @click="handleAddColumn">添加选项</a-button>
  </div>
</template>
<script setup lang="ts">
/**
 * 使用说明：支持多列的值配置（双列：输入框形式）
 * 对应的有单列的值配置（columns-config）
 */
import draggable from 'vuedraggable'
const props = defineProps({
  columnsConfigs: {
    type: Array,
    default: () => []
  }
})
function handleAddColumn() {
  props.columnsConfigs.push({
    label: '',
    value: ''
  })
}
function handleOptionsRemove(index: number) {
  props.columnsConfigs.splice(index, 1)
}

// function isEmptyObject(obj: object) {
//   for (let key in obj) {
//     return false
//   }
//   return true
// }
</script>
<style scoped>
.columns-icon {
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
  margin-left: 5px;
}
</style>
