<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="标签项">
        <ColumnConfig :options="options" button-text="添加tab"></ColumnConfig>
      </a-form-item>
      <a-form-item label="标签风格">
        <RadioButton :options="options" value-key="type" :radio-options="typeConfigs"></RadioButton>
      </a-form-item>
      <a-form-item label="标签位置">
        <RadioButton :options="options" value-key="tabPosition" :radio-options="positionConfigs"></RadioButton>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import ColumnConfig from '@/components/common-attribute-config/column-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

const typeConfigs = [
  {
    label: '默认',
    value: 'line'
  },
  {
    label: '卡片式',
    value: 'card'
  }
]

const positionConfigs = [
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
  }
]
</script>

<style scoped></style>
