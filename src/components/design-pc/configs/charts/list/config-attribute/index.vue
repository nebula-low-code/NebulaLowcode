<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="方向">
        <RadioButton :options="options" value-key="direction" :radio-options="directionOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="列数" v-if="options.direction === 'horizontal'">
        <a-input-number style="width: 100%" v-model:value="options.columnNumber" :min="1" :max="24" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
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

initDefault()

function initDefault() {
  if (!options.value.direction) {
    options.value.direction = 'vertical'
  }
  if (!options.value.columnNumber) {
    options.value.columnNumber = 1
  }
}
</script>

<style scoped></style>
