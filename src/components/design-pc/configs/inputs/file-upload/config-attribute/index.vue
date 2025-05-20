<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="最大上传数">
        <a-input-number style="width: 100%" v-model:value.number="options.size" />
      </a-form-item>
      <a-form-item label="样式">
        <RadioButton :options="options" value-key="type" :radio-options="typeConfigs"></RadioButton>
      </a-form-item>
      <a-form-item v-if="options.type === 'card'" label="图标样式">
        <IconSelect :options="options" value-key="icon"></IconSelect>
      </a-form-item>
      <a-form-item v-if="options.type === 'card'" label="图标颜色">
        <ColorConfig :color="options.iconColor" @changeColor="changeColor" :options="options" />
      </a-form-item>
      <a-form-item v-if="options.type === 'card'" label="图标大小">
        <a-input-number style="width: 100%" v-model:value.number="options.iconSize" />
      </a-form-item>
      <a-form-item v-if="options.type === 'card'" label="提示文本">
        <a-input style="width: 100%" v-model:value="options.text" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import IconSelect from '@/components/common-attribute-config/icon-select.vue'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

const typeConfigs = [
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '卡片式',
    value: 'card'
  }
]

initDefault()

function initDefault() {
  if (!options.value.type) {
    options.value.type = 'default'
  }
  if (!options.value.text) {
    options.value.text = '点击上传或拖拽文件到此区域'
  }
  if (!options.value.icon) {
    options.value.icon = {
      name: 'cloud-upload',
      fontClass: 'iconfont ant-cloud-upload',
      unicode: 'e827'
    }
  }
  if (!options.value.iconColor) {
    options.value.iconColor = '#000000'
  }
  if (!options.value.iconSize) {
    options.value.iconSize = '32'
  }
}

function changeColor(color: any) {
  options.value.iconColor = color
}
</script>

<style scoped></style>
