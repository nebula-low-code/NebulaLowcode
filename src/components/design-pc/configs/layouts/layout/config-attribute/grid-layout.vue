<template>
  <div>
    <ul>
      <li
        :class="{
          selected: options.columnsSpanType === item.name
        }"
        :title="item.name"
        @click="onChangeColumns(item.values, item.name)"
        v-for="(item, key) in oneDataList"
        :key="key"
      >
        <img :src="imgMap[item.name]" alt="" />
      </li>
    </ul>
    <ul>
      <li
        :class="{
          selected: options.columnsSpanType === item.name
        }"
        :title="item.name"
        @click="onChangeColumns(item.values, item.name)"
        v-for="(item, key) in twoDataList"
        :key="key"
      >
        <img :src="imgMap[item.name]" alt="" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any
}>()

const imgMap = {
  '24': new URL('@/assets/images/designer/layout-config/24.png', import.meta.url).href,
  '12:12': new URL('@/assets/images/designer/layout-config/12-12.png', import.meta.url).href,
  '6:18': new URL('@/assets/images/designer/layout-config/6-18.png', import.meta.url).href,
  '18:6': new URL('@/assets/images/designer/layout-config/18-6.png', import.meta.url).href,
  '8:8:8': new URL('@/assets/images/designer/layout-config/8-8-8.png', import.meta.url).href,
  '6:12:6': new URL('@/assets/images/designer/layout-config/6-12-6.png', import.meta.url).href,
  '6:6:6:6': new URL('@/assets/images/designer/layout-config/6-6-6-6.png', import.meta.url).href,
  '4:4:4:4:4:4': new URL('@/assets/images/designer/layout-config/4-4-4-4-4-4.png', import.meta.url)
    .href
} as any

const oneDataList = [
  {
    name: '24',
    values: [24]
  },
  {
    name: '12:12',
    values: [12, 12]
  },
  {
    name: '6:18',
    values: [6, 18]
  },
  {
    name: '18:6',
    values: [18, 6]
  }
]
const twoDataList = [
  {
    name: '8:8:8',
    values: [8, 8, 8]
  },
  {
    name: '6:12:6',
    values: [6, 12, 6]
  },
  {
    name: '6:6:6:6',
    values: [6, 6, 6, 6]
  },
  {
    name: '4:4:4:4:4:4',
    values: [4, 4, 4, 4, 4, 4]
  }
]

function onChangeColumns(columnsArr: any, columnsSpanType: string) {
  props.options.columnsSpanType = columnsSpanType
  let columns = []
  for (const columnsSpan of columnsArr) {
    columns.push({
      value: columnsSpan,
      componentList: []
    })
  }
  props.options.columns = columns
}
</script>

<style lang="less" scoped>
ul {
  display: flex;
  li {
    flex: 1;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    cursor: pointer;
    img {
      display: block;
      width: 100%;
    }
    &.selected {
      border: 1px solid #0079f2;
    }
  }
}
</style>
