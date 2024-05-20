<template>
  <div>
    <a-form-item :label-col="labelCol" :label="item.param_name" :colon="false" v-for="(item, index) in paramList" :key="index">
      <InterfaceValueSelect style="width: 180px" :param-item="item"></InterfaceValueSelect>
    </a-form-item>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { type interfaceDataConfig } from '@/utils/type'
import InterfaceValueSelect from '@/components/param-value-select/index.vue'
const props = defineProps<{
  interfaceDataConfig: interfaceDataConfig
}>()
const labelCol = {
  style: { width: '80px', textAlign: 'left', fontWeight: '500', whiteSpace: 'normal', wordBreak: 'break-all' }
}
const paramList = computed(() => props.interfaceDataConfig.data.paramsConfigs)
</script>
<style scoped></style>
