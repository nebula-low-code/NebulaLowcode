<template>
  <div>
    <a-input placeholder="输入组件名称进行过滤" :value="filterText" style="margin: 8px" @change="filterChanged"></a-input>
    <a-tree
      class="draggable-tree"
      defaultExpandAll
      block-node
      :selected-keys="[store.currentCheckedComponentUUID]"
      :tree-data="treeData"
      :field-names="{ title: 'name', key: 'uuid', children: 'componentList' }"
      @drop="onDrop"
      @select="selectNode"
    >
      <template #title="item">
        <div style="display: flex; overflow: hidden">
          <i class="iconfont" :class="item.icon" style="font-size: 12px; margin-right: 8px" />
          <span v-if="item.name.indexOf(filterText) > -1">
            {{ item.name.substr(0, item.name.indexOf(filterText)) }}
            <span style="color: #f50">{{ filterText }}</span>
            {{ item.name.substr(item.name.indexOf(filterText) + filterText.length) }}
          </span>
          <span v-else>{{ item.name }}</span>
        </div>
      </template>
    </a-tree>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'
import type { AntTreeNodeDropEvent } from 'ant-design-vue/es/tree'
const store = useDataStore()
const filterText = ref('')

const treeData = computed(() => {
  let list = [
    {
      uuid: '1',
      name: '页面',
      componentList: [] as any[]
    }
  ]
  let treeList: any[] = []
  transforToTreeData(store.componentTreeList, treeList)
  list[0].componentList = treeList

  console.log('list=', JSON.stringify(list))

  return list
})

function getParentKey(key: string | number, tree: any): string | number | undefined {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some((item: any) => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

function filterChanged(e: any) {
  filterText.value = e.target.value
}

function onDrop(info: AntTreeNodeDropEvent) {
  console.log(info)
}

function selectNode(selectedKeys: any) {
  console.log(selectedKeys)
  store.onChangeCurrentComponentUUID(selectedKeys[0])
}

//把组件树转为[{uuid, name, componentList}]的树状结构
function transforToTreeData(componentTreeList: any[], tempList: any[]) {
  for (const comp of componentTreeList) {
    if (comp.isNestedComponent) {
      if (comp.options && comp.options.columns && comp.options.columns.length > 0) {
        let obj = {
          uuid: comp.uuid,
          name: comp.options.commonConfigAssignName,
          icon: comp.icon,
          componentList: [] as any[]
        }
        tempList.push(obj)
        for (let index = 0; index < comp.options.columns.length; index++) {
          const col = comp.options.columns[index]
          let prefixName = ''
          if (comp.type === 'van-design-layout') {
            prefixName = '容器/'
          } else if (comp.type === 'van-design-tabs') {
            prefixName = '标签页/'
          } else if (comp.type === 'van-design-list') {
            prefixName = '列表/'
          }
          let child = {
            uuid: comp.uuid + index + prefixName + col.value,
            name: prefixName + col.value,
            componentList: [] as any[]
          }
          obj.componentList.push(child)
          transforToTreeData(col.componentList, child.componentList)
        }
      }
    } else {
      tempList.push({
        uuid: comp.uuid,
        name: comp.options.commonConfigAssignName,
        icon: comp.icon,
        componentList: [] as any[]
      })
    }
  }
}
</script>
<style scoped></style>
