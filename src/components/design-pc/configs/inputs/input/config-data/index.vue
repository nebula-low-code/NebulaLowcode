<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <!-- 列表组件中的数据绑定 -->
    <a-form-item v-if="options._data_origin_component_uuid">
      <DataBind :component-options="options"> </DataBind>
    </a-form-item>
    <div v-else>
      <a-form-item label="默认值">
        <a-input v-model:value="options.value" />
      </a-form-item>
      <a-form-item label="组件设值">
        <DataValueSelect :component-options="options" :param-item="options.interfaceDataConfig" />
      </a-form-item>
    </div>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import DataBind from '@/components/common-data-config/data-bind.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
