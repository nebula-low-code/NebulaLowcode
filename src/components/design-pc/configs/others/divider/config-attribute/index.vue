<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标题">
        <a-input v-model:value="options.title" />
      </a-form-item>
      <a-form-item label="文案位置">
        <RadioButton :options="options" value-key="orientation" :radio-options="alignOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="样式">
        <DividerStyle :border-config="options.borderConfig"></DividerStyle>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import DividerStyle from '@/components/common-attribute-config/divider-style.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const alignOptions = [
  {
    value: 'left',
    icon: 'iconzuoduiqi1'
  },
  {
    value: 'center',
    icon: 'iconjuzhongduiqi'
  },
  {
    value: 'right',
    icon: 'iconyouduiqi1'
  }
]
</script>

<style lang="less" scoped></style>
