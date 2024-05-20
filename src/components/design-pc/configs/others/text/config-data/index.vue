<template>
  <a-form style="margin-right: 8px" labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <!-- 列表组件中的数据绑定 -->
    <a-form-item v-if="componentOptions._data_origin_component_uuid">
      <DataBind :component-options="componentOptions"> </DataBind>
    </a-form-item>

    <a-form-item v-else label="值配置">
      <DataValueSelect :component-options="componentOptions" :param-item="componentOptions.interfaceDataConfig" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import DataBind from '@/components/common-data-config/data-bind.vue'

const store = useDataStore()

const componentOptions = computed(() => store.currentCheckedComponent.options)
</script>

<style lang="less" scoped></style>
