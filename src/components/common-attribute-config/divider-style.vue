<template>
  <div class="border-style">
    <ColorConfig :color="borderConfig.color" :offset="0" @changeColor="onChangeBorderColor" />
    <div style="margin: 0 5px">
      <a-select v-model:value="borderConfig.style" placeholder="请选择" style="width: 90px" clearable>
        <a-select-option v-for="item in borderTypeOptions" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <a-input-number :min="0" v-model:value="borderConfig.size"></a-input-number>
  </div>
</template>
<script setup lang="ts">
import ColorConfig from '@/components/common-attribute-config/color-config.vue'
const props = defineProps<{
  borderConfig: any
}>()

const borderTypeOptions = [
  {
    label: '实线',
    value: 'solid'
  },
  {
    label: '虚线',
    value: 'dashed'
  }
]

function onChangeBorderColor(color: string) {
  props.borderConfig.color = color
}
</script>
<style scoped>
.border-style {
  display: flex;
  align-items: center;
}
</style>
