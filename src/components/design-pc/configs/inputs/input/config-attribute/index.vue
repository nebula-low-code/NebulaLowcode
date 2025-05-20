<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标签名称">
        <ValueInput :options="options" value-key="label" en-value-key="enLabel"></ValueInput>
      </a-form-item>
      <a-form-item label="标签显示">
        <LabelDisplay :options="options" value-key="labelAlign" width-key="width" label-show-key="labelShow"> </LabelDisplay>
      </a-form-item>
      <a-form-item label="输入提示">
        <ValueInput :options="options" value-key="placeholder" en-value-key="enPlaceHolder"></ValueInput>
      </a-form-item>
      <a-form-item label="类型">
        <ValueSelect :options="options" value-key="inputType" :select-option="inputTypeOptions"></ValueSelect>
      </a-form-item>
      <a-form-item label="自适应" v-if="options.inputType == 'textarea'">
        <a-switch v-model:checked="options.autoSize" />
      </a-form-item>
      <a-form-item label="最小行数" v-if="options.inputType == 'textarea' && !options.autoSize">
        <a-input-number style="width: 100%" v-model:value.number="options.minRows" />
      </a-form-item>
      <a-form-item label="最大行数" v-if="options.inputType == 'textarea' && !options.autoSize">
        <a-input-number style="width: 100%" v-model:value.number="options.maxRows" />
      </a-form-item>

      <a-form-item label="前置">
        <InputIcon :options="options" selected-icon-key="customtimageIcon" icon-show-key="iconPreShow" addon-key="addonBefore"></InputIcon>
      </a-form-item>
      <a-form-item label="后置">
        <InputIcon :options="options" selected-icon-key="suffixIcon" icon-show-key="iconPosShow" addon-key="addonAfter"></InputIcon>
      </a-form-item>
      <a-form-item label="最大字数">
        <a-input-number style="width: 100%" v-model:value.number="options.maxlength" />
      </a-form-item>
      <a-form-item label="控件大小">
        <RadioButton :options="options" value-key="size" :radio-options="sizeOptions"></RadioButton>
      </a-form-item>
      <a-form-item>
        <InputValidate :options="options"></InputValidate>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import ValueSelect from '@/components/common-attribute-config/value-select.vue'
import LabelDisplay from '@/components/common-attribute-config/label-display.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import InputIcon from '@/components/common-attribute-config/input-icon.vue'
import InputValidate from '@/components/common-attribute-config/value-validate.vue'

const store = useDataStore()
const inputTypeOptions = [
  {
    label: '单行文本',
    value: 'text'
  },
  {
    label: '多行文本',
    value: 'textarea'
  },
  {
    label: '密码',
    value: 'password'
  },
  {
    label: '数字',
    value: 'number'
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

const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
