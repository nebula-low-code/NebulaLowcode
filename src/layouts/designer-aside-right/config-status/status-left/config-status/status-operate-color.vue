<template>
  <div>
    <div class="colorSetting" style="margin-right: 8px" @click.stop="showColorPicker = !showColorPicker">
      <span title="请选择字体颜色">
        <i
          class="iconfont iconzitiyanse"
          :style="{
            fontSize: '40px',
            border: '1px solid #ebeef5',
            borderRadius: '4px',
            marginRight: '10px',
            color: properties.textColor
          }"
        />
        <ColorPicker :key="1" :value="properties.textColor" style="visibility: hidden" :leftPadding="-50" :topPadding="10" @change="changeColor" :openStatus="showColorPicker" />
      </span>
      <span style="line-height: 40px">请选择字体颜色</span>
    </div>
    <div class="colorSetting" @click.stop="showBGColorPicker = !showBGColorPicker">
      <span class="colorStyle" title="按钮文字颜色">
        <i
          class="iconfont iconzitiyanse"
          :style="{
            fontSize: '40px',
            border: '1px solid #ebeef5',
            borderRadius: '4px',
            marginRight: '10px',
            background: properties.textBgColor
          }"
        />
        <ColorPicker :key="1" :value="properties.textBgColor" style="visibility: hidden" :leftPadding="-50" :topPadding="10" @change="changeBGColor" :openStatus="showBGColorPicker" />
      </span>
      <span>请选择背景颜色</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ColorPicker from '@/components/tools/color-picker/index.vue'
const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
const showColorPicker = ref(false)
const showBGColorPicker = ref(false)
function changeColor(color: any) {
  showColorPicker.value = false
  properties.value.textColor = color
}
function changeBGColor(color: any) {
  showBGColorPicker.value = false
  properties.value.textBgColor = color
}
</script>
<style lang="scss" scoped>
.colorSetting {
  position: relative;
  vertical-align: middle;
  display: flex;
  align-items: center;
}

.icon-styles {
  font-size: 40px !important;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  margin-right: 10px;
}
</style>
