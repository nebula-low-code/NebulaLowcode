<template>
  <div>
    <div class="item" v-for="(col, index) in options.steps" :key="index">
      <a-input placeholder="值" v-model:value="col.value" style="" />
      <a-input placeholder="描述" v-model:value="col.description" style="" />
      <i
        class="iconfont icontrash"
        style="margin-left: 8px; cursor: pointer"
        @click="delColumn(index)"
      ></i>
    </div>
    <a-button type="link" @click="addColumn">添加步骤</a-button>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  options: any
}>()

function delColumn(index: number) {
  props.options.steps.splice(index, 1)
}

function addColumn() {
  props.options.steps.push({
    value: undefined,
    description: undefined
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
