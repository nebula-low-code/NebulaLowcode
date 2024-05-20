<template>
  <a-layout-sider class="sider" :width="store.isShowLeftMenu ? 260 : 0">
    <BasicComponent></BasicComponent>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDataStore } from '@/stores'
import BasicComponent from './basic-component.vue'

const store = useDataStore()

const tabsActive = ref('basic')
</script>

<style scoped>
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
:deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0px;
  overflow: hidden;
}
.sider {
  height: calc(100vh - 40px);
  overflow-y: auto;
  background: #fff;

  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
</style>
