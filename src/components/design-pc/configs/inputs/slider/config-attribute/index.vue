<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标签名称">
        <ValueInput :options="options" value-key="label" en-value-key="enLabel"></ValueInput>
      </a-form-item>
      <a-form-item label="标签显示">
        <LabelDisplay :options="options" value-key="labelAlign" width-key="width" label-show-key="labelShow"> </LabelDisplay>
      </a-form-item>
      <a-form-item label="最小值">
        <a-input-number style="width: 100%" v-model:value.number="options.min" />
      </a-form-item>
      <a-form-item label="最大值">
        <a-input-number style="width: 100%" v-model:value.number="options.max" />
      </a-form-item>
      <a-form-item label="步长">
        <a-input-number style="width: 100%" :min="0" v-model:value.number="options.step" />
      </a-form-item>
      <a-form-item label="竖向显示">
        <a-switch v-model:checked="options.vertical" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import LabelDisplay from '@/components/common-attribute-config/label-display.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
