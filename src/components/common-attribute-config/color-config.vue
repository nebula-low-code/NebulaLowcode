<template>
  <span class="colorStyle" @click.stop="showColorPicker = !showColorPicker">
    <div
      class="iconStyle"
      :style="{
        backgroundColor: currentColor
      }"
    ></div>
    <ColorPicker
      :key="1"
      :value="currentColor"
      :opacity="props.opacity"
      style="visibility: hidden"
      :leftPadding="offset"
      :topPadding="10"
      @change="changeColor"
      :openStatus="showColorPicker"
    />
  </span>
</template>
<script setup lang="ts">
import ColorPicker from '@/components/tools/color-picker/index.vue'
import { ref, watch } from 'vue'
const emit = defineEmits(['changeColor'])
const showColorPicker = ref(false)
const props = withDefaults(
  defineProps<{
    color: string
    opacity:number
    offset?: number
  }>(),
  {
    offset: -100
  }
)

const currentColor = ref('')

watch(
  () => props.color,
  () => {
    currentColor.value = props.color
  },
  {
    immediate: true
  }
)
function changeColor(color: string,opacity: number) {
  showColorPicker.value = false
  currentColor.value = color
  emit('changeColor', color,opacity)
}
</script>
<style scoped>
.iconStyle {
  display: inline-block;
  margin-top: 4px;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  border: 1px solid #e2e2e2;
}
</style>
