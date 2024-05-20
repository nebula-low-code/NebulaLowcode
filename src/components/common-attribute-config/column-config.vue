<template>
  <div>
    <div class="item" v-for="(col, index) in options[columnKey]" :key="index">
      <a-input-number
        v-if="isNumber"
        v-model:value="col[valueKey]"
        :min="1"
        :max="24"
        style="width: 120px"
      />
      <a-input v-else v-model:value="col[valueKey]" style="width: 120px" />
      <i
        class="iconfont icontrash"
        style="margin-left: 8px; cursor: pointer"
        @click="delColumn(index)"
      ></i>
    </div>
    <a-button type="link" @click="addColumn">{{ buttonText ?? '添加列' }}</a-button>
  </div>
</template>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: any
    valueKey?: string
    columnKey?: string
    buttonText?: string
    isNumber?: boolean
  }>(),
  {
    valueKey: 'value',
    columnKey: 'columns',
    isNumber: false,
    buttonText: '添加列'
  }
)

function delColumn(index: number) {
  props.options[props.columnKey].splice(index, 1)
}

function addColumn() {
  props.options[props.columnKey].push({
    [props.valueKey]: undefined,
    componentList: []
  })
}
</script>
<style scoped>
.item {
  margin: 4px;
  display: flex;
  align-items: center;
}
</style>
