<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="文本内容">
        <a-textarea v-model:value="options.value" />
        <a-popover v-model:open="visible" placement="bottom" trigger="click">
          <template #content>
            <div class="row">
              <div class="title">中文</div>
              <a-input v-model:value="options.value" placeholder="请输入中文"></a-input>
            </div>
            <div class="row" style="margin-top: 16px">
              <div class="title">英文</div>
              <a-input v-model:value="options.enValue" placeholder="请输入英文"></a-input>
            </div>
            <a-button @click="visible = false" type="primary" class="confirm-button">确定</a-button>
          </template>
          <i :style="style" style="cursor: pointer" class="iconfont iconglobal global"></i>
        </a-popover>
      </a-form-item>
      <a-form-item>
        <TextStyleEditor :style-editor-config="options.styleEditorConfig"></TextStyleEditor>
      </a-form-item>
      <a-form-item label="文本格式">
        <a-select v-model:value="options.textFormat">
          <a-select-option v-for="item in formatTypeList" :key="item.type" :label="item.name" :value="item.type">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关闭换行">
        <a-switch v-model:checked="options.nowrap" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import TextStyleEditor from '@/layouts/designer-aside-right/config-basics/config-text-style.vue'
import { formatTypeList } from '@/utils/text-formatter'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const style = computed(() => {
  const hasI18N = options.value.value != null && options.value.value.length > 0 && options.value.enValue != null && options.value.enValue.length > 0
  if (hasI18N) {
    return {
      backgroundColor: '#1677ff',
      color: 'white'
    }
  } else {
    return {}
  }
})
const visible = ref<boolean>(false)
</script>

<style scoped>
.global {
  font-size: 20px;
  padding: 2px;
  border-top-right-radius: 4px;
  position: absolute;
  right: 0;
  top: 0;
}

.row {
  display: flex;
  align-items: center;
}

.title {
  width: 50px;
}

.confirm-button {
  width: 100%;
  margin-top: 16px;
}
</style>
