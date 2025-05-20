<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="全屏显示">
        <a-switch v-model:checked="options.fullScreen" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

const store = useDataStore()

const options = computed(() => store.currentCheckedComponent.options)
</script>

<style scoped></style>
