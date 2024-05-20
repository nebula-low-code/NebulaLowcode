<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="默认值">
        <a-switch v-model:checked="options.switchValue" />
      </a-form-item>
      <a-form-item label="前置标签">
        <SwitchValue :options="options" label-key="prefixLabel" en-label-key="prefixEnLabel" value-key="prefixValue"></SwitchValue>
      </a-form-item>
      <a-form-item label="后置标签">
        <SwitchValue :options="options" label-key="suffixLabel" en-label-key="suffixEnLabel" value-key="suffixValue"></SwitchValue>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import SwitchValue from '@/components/common-attribute-config/switch-value-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
