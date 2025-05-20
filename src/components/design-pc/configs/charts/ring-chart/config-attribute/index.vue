<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="配色方案">
        <ChartsColor :options="options" value-key="chartColors"></ChartsColor>
      </a-form-item>
      <a-form-item label="图例">
        <RadioButton :options="options" size="small" value-key="legendAlign" :radio-options="legendAlign"></RadioButton>
      </a-form-item>
      <a-form-item label="显示标签">
        <a-switch v-model:checked="options.labelShow" />
      </a-form-item>
      <a-form-item label="标签位置">
        <RadioButton :options="options" size="small" value-key="labelPosition" :radio-options="labelPosition"></RadioButton>
      </a-form-item>
      <a-form-item label="标签大小">
        <a-input-number style="width: 100%" v-model:value="options.labelFontSize" :min="0" :max="100" />
      </a-form-item>
      <a-form-item label="标签颜色">
        <ColorConfig :color="options.labelColor" @changeColor="changeLabelColor" :options="options" />
      </a-form-item>
      <a-form-item label="X轴中心">
        <a-input-number v-model:value="options.centerX" :min="0" :max="100">
          <template #addonAfter>%</template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="Y轴中心">
        <a-input-number v-model:value="options.centerY" :min="0" :max="100">
          <template #addonAfter>%</template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="内部直径">
        <a-input-number v-model:value="options.insideRadius" :min="0" :max="100">
          <template #addonAfter>%</template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="外部直径">
        <a-input-number v-model:value="options.outsideRadius" :min="0" :max="100">
          <template #addonAfter>%</template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="扇区圆角">
        <a-input-number v-model:value="options.borderRadius" :min="0">
          <template #addonAfter>px</template>
        </a-input-number>
      </a-form-item>
      <a-form-item label="扇区间隔">
        <a-input-number v-model:value="options.padAngle" :min="0" :max="360">
          <template #addonAfter>度</template>
        </a-input-number>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ChartsColor from '@/components/common-attribute-config/select-color-charts.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

initDefault()

function initDefault() {
  if (options.value.labelShow === undefined) {
    options.value.labelShow = true
  }
  if (options.value.labelPosition === undefined) {
    options.value.labelPosition = 'outside'
  }
  if (options.value.labelFontSize === undefined) {
    options.value.labelFontSize = 12
  }
  if (options.value.labelColor === undefined) {
    options.value.labelColor = '#000000'
  }
  if (options.value.insideRadius === undefined) {
    options.value.insideRadius = 50
  }
  if (options.value.outsideRadius === undefined) {
    options.value.outsideRadius = 70
  }
  if (options.value.borderRadius === undefined) {
    options.value.borderRadius = 0
  }
  if (options.value.padAngle === undefined) {
    options.value.borderWidth = 0
  }
  if (options.value.centerX === undefined) {
    options.value.borderWidth = 50
  }
  if (options.value.centerY === undefined) {
    options.value.borderWidth = 50
  }
}

function changeBorderColor(color: any) {
  options.value.borderColor = color
}

function changeLabelColor(color: any) {
  options.value.labelColor = color
}

const labelPosition = [
  {
    label: '外部',
    value: 'outside'
  },
  {
    label: '内部',
    value: 'inside'
  }
]
const legendAlign = [
  {
    label: '上',
    value: 'top'
  },
  {
    label: '下',
    value: 'bottom'
  },
  {
    label: '左',
    value: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '无',
    value: 'none'
  }
]
</script>

<style scoped></style>
