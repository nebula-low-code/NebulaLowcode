<template>
  <div>
    <a-collapse class="i-scrollbar-hide" :bordered="false" v-model:activeKey="activeKey" expandIconPosition="end" v-show="store.isShowLeftMenu" style="height: calc(100vh - 50px); overflow-y: auto">
      <a-collapse-panel :style="customStyle" key="1">
        <template #header>
          <span class="aside-collapse-title">通用</span>
        </template>
        <Menu :list="commonly" />
      </a-collapse-panel>

      <a-collapse-panel :style="customStyle" key="3">
        <template #header>
          <span class="aside-collapse-title">数据录入</span>
        </template>
        <Menu :list="inputs" />
      </a-collapse-panel>

      <a-collapse-panel :style="customStyle" key="2">
        <template #header>
          <span class="aside-collapse-title">数据展示</span>
        </template>
        <Menu :list="charts" />
      </a-collapse-panel>

      <a-collapse-panel :style="customStyle" key="4">
        <template #header>
          <span class="aside-collapse-title">其他</span>
        </template>
        <Menu :list="others" />
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Menu from './menu.vue'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores'

const route = useRoute()
const store = useDataStore()

const deviceType = route.params.device
const customStyle = 'background: white;margin-bottom: 0px;border: none;overflow: hidden'
const activeKey = ref(['1', '2', '3', '4'])
</script>
<style scoped>
.aside-collapse-title {
  font-size: 14px;
  font-weight: bold;
}
</style>
