<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标签名称">
        <ValueInput :options="options" value-key="label" en-value-key="enLabel"></ValueInput>
      </a-form-item>
      <a-form-item label="标签显示">
        <LabelDisplay :options="options" value-key="labelAlign" width-key="width" label-show-key="labelShow"> </LabelDisplay>
      </a-form-item>
      <a-form-item>
        <InputValidate :options="options" :hideValidator="true" :hideReg="true"></InputValidate>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import LabelDisplay from '@/components/common-attribute-config/label-display.vue'
import InputValidate from '@/components/common-attribute-config/value-validate.vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
