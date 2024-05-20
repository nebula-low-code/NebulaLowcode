<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="折叠项">
        <StepsConfig :options="options">
          <ColumnConfig :options="options" button-text="添加折叠项" value-key="title"></ColumnConfig>
        </StepsConfig>
      </a-form-item>
      <a-form-item label="手风琴">
        <a-switch v-model:checked="options.accordion"></a-switch>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import ColumnConfig from '@/components/common-attribute-config/column-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style lang="less" scoped></style>
