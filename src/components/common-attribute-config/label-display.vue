<template>
  <div style="display: flex; align-items: center">
    <a-radio-group v-model:value="options[valueKey]" size="small" button-style="solid">
      <a-radio-button v-for="(item, key) in alignConfigs" :value="item.value">
        <i :class="item.icon" class="iconfont" />
      </a-radio-button>
    </a-radio-group>
    <a-input-number
      style="margin: 0 10px; width: 80px"
      v-model:value.number="options[widthKey]"
      :min="0"
      :step="1"
    />
    <i
      style="font-size: 20px; cursor: pointer"
      :class="options[labelShowKey] ? 'iconfont iconkejian' : 'iconfont iconbukejian'"
      @click="options[labelShowKey] = !options[labelShowKey]"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: any
  valueKey: string
  widthKey: string
  labelShowKey: string
}>()

const alignConfigs = [
  {
    label: '左对齐',
    value: 'left',
    icon: 'iconzuoduiqi1'
  },
  {
    label: '顶部对齐',
    value: 'top',
    icon: 'iconjuzhongduiqi'
  },
  {
    label: '右对齐',
    value: 'right',
    icon: 'iconyouduiqi1'
  }
]
</script>

<style scoped></style>
