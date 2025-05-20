<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <!-- 列表组件中的数据绑定 -->
    <a-form-item v-if="options._data_origin_component_uuid" style="margin-bottom: 50px">
      <DataBind :component-options="options" :customFlag="true" > </DataBind>
    </a-form-item>
    <div v-else>
      <a-form-item label="默认值">
        <a-input v-model:value="options.value" />
      </a-form-item>
      <a-form-item label="组件设值">
        <DataValueSelect :component-options="options" :param-item="options.interfaceDataEchoConfig" :echo-config="true" @onChange="onChange" />
      </a-form-item>
    </div>
    <a-form-item label="回显label" v-if="options.interfaceSearch">
      <div style="display: flex; align-items: center">
        <DataValueSelect :component-options="options" :param-item="options.interfaceSearchEchoConfig" :echo-config="true" @onChange="onSearchChange" />
        <a-tooltip :arrow="false">
          <template #title>
            <span>远程搜索打开后，需要配置回显对应的名称</span>
          </template>
          <QuestionCircleOutlined />
        </a-tooltip>
      </div>
    </a-form-item>

    <a-form-item label="选项数据">
      <ValueOptions :options="options"></ValueOptions>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ValueOptions from '@/components/common-data-config/options-config.vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import DataBind from '@/components/common-data-config/data-bind.vue'
const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
function onChange(selectedOptions: any) {
  if (!selectedOptions) {
    options.value.contentDataEcho = ''
    options.value.interfaceDataEchoConfig = {}
  }
}
function onSearchChange(selectedOptions: any) {
  if (!selectedOptions) {
    options.value.interfaceSearchEchoConfig = {}
  }
}
</script>

<style scoped></style>
