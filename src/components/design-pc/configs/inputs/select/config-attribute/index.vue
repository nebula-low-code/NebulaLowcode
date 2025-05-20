<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标签名称">
        <ValueInput :options="options" value-key="label" en-value-key="enLabel"></ValueInput>
      </a-form-item>
      <a-form-item label="标签显示">
        <LabelDisplay :options="options" value-key="labelAlign" width-key="width" label-show-key="labelShow"> </LabelDisplay>
      </a-form-item>
      <a-form-item label="提示信息">
        <ValueInput :options="options" value-key="placeholder" en-value-key="enPlaceHolder"></ValueInput>
      </a-form-item>
      <a-form-item label="模式">
        <RadioButton :options="options" value-key="mode" :radio-options="modeOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="远程搜索">
        <div style="display: flex">
          <a-switch v-model:checked="options.interfaceSearch"  style="margin-right: 8px"/>
          <a-tooltip :arrow="false">
            <template #title>
              <span>远程搜索打开后，需要在后端数据接口入参中配置选择器对应的搜索值</span>
            </template>
            <QuestionCircleOutlined />
          </a-tooltip>
        </div>
      </a-form-item>
      <a-form-item label="尺寸">
        <RadioButton :options="options" value-key="size" :radio-options="sizeOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="选项宽度">
        <div style="display: flex">
          <a-input-number placeholder="下拉选项宽度" style="margin-right: 8px" :min="0" v-model:value="options.dropdownWidth" addon-after="px"></a-input-number>
          <a-tooltip :arrow="false">
            <template #title>
              <span>下拉选项的宽度,不设置时默认与选择器等宽</span>
            </template>
            <QuestionCircleOutlined />
          </a-tooltip>
        </div>
      </a-form-item>
      <a-form-item>
        <InputValidate :options="options" :hide-validator="true" :hide-reg="true"></InputValidate>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import LabelDisplay from '@/components/common-attribute-config/label-display.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import InputValidate from '@/components/common-attribute-config/value-validate.vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

const modeOptions = [
  {
    label: '单选',
    value: 'default'
  },
  {
    label: '多选',
    value: 'multiple'
  }
]

const sizeOptions = [
  {
    label: '大',
    value: 'large'
  },
  {
    label: '中',
    value: 'default'
  },
  {
    label: '小',
    value: 'small'
  }
]
</script>

<style scoped></style>
