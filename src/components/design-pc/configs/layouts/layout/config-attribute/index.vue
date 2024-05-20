<template>
  <div>
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="栅格高度">
        <a-input-number style="width: 100%" v-model:value.number="options.layoutHeight">
          <template #addonAfter>
            <a-select :value="layoutHeightUnit" @change="changeLayoutHeightUnit">
              <a-select-option value="px">px</a-select-option>
              <a-select-option value="vh">vh</a-select-option>
            </a-select>
          </template>
        </a-input-number>
      </a-form-item>
      <a-form-item>
        <GridLayoutConfig :options="options"></GridLayoutConfig>
      </a-form-item>
      <a-form-item label="列配置项">
        <ColumnConfig :options="options" :is-number="true" button-text="添加列"></ColumnConfig>
      </a-form-item>
      <a-form-item label="水平对齐">
        <RadioButton :options="options" value-key="labelAlign" :radio-options="horizontalAlign"></RadioButton>
      </a-form-item>
      <a-form-item label="垂直对齐">
        <RadioButton :options="options" value-key="labelVerticalAlign" :radio-options="verticalAlign"></RadioButton>
      </a-form-item>
      <a-form-item label="固定底部">
        <a-switch v-model:checked="options.isDialogFooterContainer" />
      </a-form-item>
    </a-form>
    <div class="line"></div>
    <ConfigBGStyle :configOptions="options"></ConfigBGStyle>
    <div class="line"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import GridLayoutConfig from './grid-layout.vue'
import ColumnConfig from '@/components/common-attribute-config/column-config.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'


const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)

const layoutHeightUnit = computed(() => {
  let unit = options.value.layoutHeightUnit
  if (!unit || unit.length === 0) {
    unit = 'px'
  }
  return unit
})

function changeLayoutHeightUnit(value: string) {
  options.value.layoutHeightUnit = value
}

const horizontalAlign = [
  {
    title: '左对齐',
    value: 'left',
    icon: 'iconzuoduiqi1'
  },
  {
    title: '居中对齐',
    value: 'center',
    icon: 'iconjuzhongduiqi'
  },
  {
    title: '右对齐',
    value: 'right',
    icon: 'iconyouduiqi1'
  }
]

const verticalAlign = [
  {
    title: '上对齐',
    value: 'flex-start',
    icon: 'icondingbuduiqi'
  },
  {
    title: '居中对齐',
    value: 'center',
    icon: 'iconchuizhijuzhong'
  },
  {
    title: '下对齐',
    value: 'flex-end',
    icon: 'icondibuduiqi'
  }
]
</script>

<style scoped>
.line {
  height: 1px;
  width: 100%;
  background-color: #d9d9d9;
  margin: 10px 0;
}
</style>
