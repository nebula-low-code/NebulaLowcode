<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="当前步骤">
        <a-input-number style="width: 100%" v-model:value.number="options.value" min="0" />
      </a-form-item>
      <a-form-item label="菜单项">
        <StepsConfig :options="options"></StepsConfig>
      </a-form-item>
      <a-form-item label="方向">
        <RadioButton :options="options" value-key="direction" :radio-options="directionOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="大小">
        <RadioButton :options="options" value-key="size" :radio-options="sizeOptions"></RadioButton>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import StepsConfig from './steps-config.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const directionOptions = [
  {
    label: '横向',
    value: 'horizontal'
  },
  {
    label: '竖向',
    value: 'vertical'
  }
]

const sizeOptions = [
  {
    label: '常规',
    value: 'default'
  },
  {
    label: '小',
    value: 'small'
  }
]
</script>

<style lang="less" scoped></style>
