<template>
  <draggable
    tag="ul"
    class="menu-item-wrap"
    :list="list"
    itemKey="index"
    v-bind="{
      group: { name: 'component', pull: 'clone', put: false },
      sort: false,
      ghostClass: 'ghost'
    }"
  >
    <template #item="{ element, index }">
      <li>
        <div>
          <i class="iconfont" :class="element.icon" />
        </div>
        <div class="icon-text">
          <span>{{ element.name }}</span>
        </div>
      </li>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

const props = defineProps<{
  list: any
}>()
</script>

<style lang="less" scoped>
.ghost {
  // visibility: hidden;
  // background-color: #f56c6c;
  border: 2px solid #f56c6c;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  margin: 2px;
}
.menu-item-wrap {
  padding: 0 10px;
  text-align: left;

  li {
    display: inline-flex;
    flex-direction: row;
    width: 46%;
    margin: 0 8px 8px 0;
    color: #666;
    cursor: pointer;
    border: 1px solid #e5e6e8;
    border-radius: 6px;
    padding: 0 8px;
    height: 36px;
    align-items: center;

    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }

    .iconfont {
      font-size: 12px;
      line-height: 36px;
    }

    .icon-text {
      font-size: 12px;
      line-height: 36px;
      margin-left: 8px;
      white-space: nowrap;
    }
  }
}
</style>
