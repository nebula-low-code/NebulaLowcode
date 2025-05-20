<template>
  <!-- 组件的配置 -->
  <div class="config-basics" v-if="store.currentCheckedComponent.options">
    <ConfigGeneral />
    <ConfigComponent />
    <!-- 通用配置- margin padding 圆角 边框 其他 -->
    <ConfigCommonStyle />
    <div class="line"></div>
    <ConfigEvent type="component" />
  </div>
  <!-- 页面的配置 -->
  <div v-else>
    <ConfigPageStyle :pageConfig="pageConfig"></ConfigPageStyle>
    <div class="line"></div>
    <ConfigBGStyle :configOptions="pageConfig"></ConfigBGStyle>
    <div class="line"></div>
    <ConfigPageParam></ConfigPageParam>
    <div class="line"></div>
    <ConfigEvent type="page" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'

import ConfigGeneral from './config-general.vue'
import ConfigComponent from './config-component.vue'
import ConfigEvent from './config-event.vue'
import ConfigCommonStyle from './config-common-style.vue'
import ConfigPageStyle from './config-page-style.vue'
import ConfigBGStyle from './config-bg-style.vue'
import ConfigPageParam from './config-page-param.vue'

const store = useDataStore()

const pageConfig = computed(() => store.pageConfig.config || {})
</script>

<style scoped>
.line {
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin: 10px 0;
}
</style>
