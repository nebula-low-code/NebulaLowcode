<template>
  <a-collapse v-model:activeKey="activeKey" :bordered="false" style="background-color: white">
    <a-collapse-panel key="1" header="校验">
      <div v-if="!hideRequired">
        <a-checkbox v-model:checked="options.required" @change="onChangeRuleType('required')">必填</a-checkbox>
        <br />
        <a-input size="mini" style="width: 178px; margin-left: 24px" v-model:value="options.requiredMsg" :disabled="!options.required" placeholder="自定义错误提示"></a-input>
        <div style="height: 10px"></div>
      </div>
      <div v-if="!hideValidator">
        <a-checkbox v-model:checked="options.validatorTypeFunc" @change="onChangeRuleType('validatorTypeFunc')"> </a-checkbox>
        <a-select :disabled="!options.validatorTypeFunc" placeholder="请选择" size="mini" style="width: 178px; margin-left: 8px" v-model:value="options.inputRuleType">
          <a-select-option v-for="item in validatorTypeList" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-input :disabled="!options.validatorTypeFunc" size="mini" style="width: 178px; margin-left: 24px" v-model:value="options.funcMsg" placeholder="自定义错误提示"></a-input>
        <div style="height: 10px"></div>
      </div>
      <div v-if="!hideReg">
        <a-checkbox v-model:checked="options.validatorTypeReg" @change="onChangeRuleType('validatorTypeReg')"> </a-checkbox>
        <a-input :disabled="!options.validatorTypeReg" size="mini" style="width: 178px; margin-left: 8px" placeholder="填写正则表达式" v-model:value="options.inputRuleReg"></a-input>
        <a-input :disabled="!options.validatorTypeReg" size="mini" style="width: 178px; margin-left: 24px" v-model:value="options.regMsg" placeholder="自定义错误提示"></a-input>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  options: any
  hideRequired?: boolean
  hideValidator?: boolean
  hideReg?: boolean
}>()
const activeKey = ref(['1'])
const validatorTypeList = [
  {
    label: '手机号',
    value: 'phone'
  },
  {
    label: '身份证',
    value: 'idcard'
  },
  {
    label: '字符串',
    value: 'string'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '整数',
    value: 'int'
  },
  {
    label: '浮点数',
    value: 'float'
  },
  {
    label: 'URL地址',
    value: 'url'
  },
  {
    label: '邮箱地址',
    value: 'email'
  },
  {
    label: '十六进制',
    value: 'hex'
  }
]

function onChangeRuleType(type: string) {
  if (type == 'validatorTypeReg') {
    props.options.validatorTypeFunc = false
  } else if (type == 'validatorTypeFunc') {
    props.options.validatorTypeReg = false
  }
}
</script>
<style scoped></style>
