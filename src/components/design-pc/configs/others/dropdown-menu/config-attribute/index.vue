<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="菜单名称">
        <a-input v-model:value="options.title" />
      </a-form-item>
      <a-form-item label="菜单项">
        <ColumnConfig :options="options" button-text="添加菜单项" column-key="menus"></ColumnConfig>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import ColumnConfig from '@/components/common-attribute-config/column-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style lang="less" scoped></style>
