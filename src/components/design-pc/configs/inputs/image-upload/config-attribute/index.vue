<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="宽度">
        <a-input-number style="width: 100%" v-model:value.number="options.width" />
      </a-form-item>
      <a-form-item label="高度">
        <a-input-number style="width: 100%" v-model:value.number="options.height" />
      </a-form-item>
      <a-form-item label="背景图片">
        <IconSelect :options="options" value-key="icon"></IconSelect>
      </a-form-item>
      <a-form-item label="最大上传数">
        <a-input-number style="width: 100%" v-model:value.number="options.size" />
      </a-form-item>
      <a-form-item label="是否多选">
        <a-switch v-model:checked="options.isMultiple" />
      </a-form-item>
      <a-form-item label="头像上传">
        <a-switch v-model:checked="options.showUploadList" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import IconSelect from '@/components/common-attribute-config/icon-select.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
