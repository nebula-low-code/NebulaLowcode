<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
    <a-form-item label="默认值">
      <a-input v-model:value="options.value" />
    </a-form-item>
    <a-form-item label="组件设值">
      <DataValueSelect
        :component-options="options"
        :param-item="options.interfaceDataEchoConfig"
        :echo-config="true"
      />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import DataValueSelect from '@/components/data-value-select/index.vue'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
