<template>
  <a-layout-sider class="sider i-scrollbar-hide" :width="store.isShowRightMenu ? 315 : 0">
    <div class="sider-top">
      <i :class="['iconfont', store.currentCheckedComponent.icon]" style="margin-right: 5px"></i>
      <a-breadcrumb separator=">" style="flex: 1" v-if="parentList.length > 0">
        <a-breadcrumb-item style="cursor: pointer" @click="selectParentNode(item)" v-for="(item, index) in parentList" :key="index">
          {{ item.options.commonConfigAssignName }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div v-else style="flex: 1">{{ pageName }}</div>
      <i class="iconfont icontree" style="cursor: pointer" title="页面结构" @click="showPageTree = !showPageTree"></i>
    </div>
    <div>
      <PageTree v-if="showPageTree" v-show="store.isShowRightMenu"></PageTree>
      <TableColumnConfig v-else-if="store.isShowTableColumnConfig" />
      <TableColumnChildrenConfig v-else-if="store.isShowTableColumnChildrenConfig" />
      <TableOperateConfig v-else-if="store.isShowTableOperateConfig" />
      <a-tabs v-else v-model:activeKey="store.rightMenuKey" centered v-show="store.isShowRightMenu">
        <a-tab-pane key="basic" tab="基础">
          <div class="sider-content i-scrollbar-hide">
            <ConfigComponentBasics />
          </div>
        </a-tab-pane>
        <a-tab-pane key="data" tab="数据" force-render>
          <div class="sider-content i-scrollbar-hide">
            <ConfigComponentDatas />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'

// Component
import ConfigComponentBasics from './config-basics/index.vue'
import ConfigComponentDatas from './config-datas/index.vue'
import PageTree from './page-tree.vue'
import TableColumnConfig from '@/components/design-pc/configs/charts/table/config-data/table-column-config.vue'
import TableColumnChildrenConfig from '@/components/design-pc/configs/charts/table/config-data/table-column-children-config.vue'
import TableOperateConfig from '@/components/design-pc/configs/charts/table/config-data/table-operate-config.vue'
const activeKey = ref('1')
const store = useDataStore()
const showPageTree = ref(false)

const parentList = computed(() => {
  let parent = store.currentComponentParentList()
  if (parent && parent.length > 5) {
    //父级太多了截取一下,否则显示不下
    parent = parent.slice(parent.length - 5, parent.length)
    parent.unshift({
      options: {
        commonConfigAssignName: '...'
      }
    })
  }
  return parent
})
const pageName = computed(() => {
  if (store.pageConfig && store.pageConfig.config) {
    return store.pageConfig.config.reportName
  }
  return ''
})

function selectParentNode(item: any) {
  store.onChangeCurrentComponentUUID(item.uuid)
}
</script>

<style lang="scss" scoped>
:deep(.ant-tabs-nav-list) {
  width: 100%;
}
:deep(.ant-tabs-tab) {
  margin: 0;
  flex: 1;
}

:deep(.ant-tabs-tab-btn) {
  width: 100%;
  text-align: center;
}
:deep(.ant-tabs-nav-operations) {
  display: none !important;
}

.sider {
  height: calc(100vh - 40px);
  overflow-y: scroll;
  overflow-x: hidden;
  background: #fff;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  &-top {
    height: 42px;
    border-bottom: 1px solid #ebeef5;
  }
  &-content {
    height: calc(100vh - 155px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0px 10px;
  }
}

.sider-top {
  height: 42px;
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
