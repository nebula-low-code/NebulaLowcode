<template>
  <div style="display: flex; align-items: center">
    <!-- 图标选择 -->
    <div class="input-icon-view">
      <i class="select-icon" :class="options[selectedIconKey].fontClass" @click="openIconSelect" />
      <i
        style="font-size: 24px; margin: 0 8px"
        :class="options[iconShowKey] ? 'iconfont iconkejian' : 'iconfont iconbukejian'"
        @click="options[iconShowKey] = !options[iconShowKey]"
      />
    </div>
    <a-input style="margin-left: 8px" v-if="addonKey" v-model:value="options[addonKey]" />
    <IconSelectDialog ref="iconRef" @select-icon="selectIcon"></IconSelectDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconSelectDialog from '@/layouts/modal/icon-select-dialog.vue'

const props = defineProps<{
  options: any
  iconShowKey: string
  selectedIconKey: string
  addonKey?: string
}>()

const iconRef = ref()

function openIconSelect() {
  iconRef.value.onOpen()
}

function selectIcon(icon: any) {
  props.options[props.selectedIconKey] = icon
}
</script>

<style scoped>
.select-icon {
  font-size: 24px;
  cursor: pointer;
  margin-left: 8px;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
}
.input-icon-view {
  border: 1px dashed #d9d9d9;
  /* width: 80px; */
  display: flex;
  align-items: center;
}
</style>
