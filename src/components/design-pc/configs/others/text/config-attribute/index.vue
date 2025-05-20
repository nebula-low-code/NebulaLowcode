<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="文本内容">
        <a-textarea v-model:value="options.value" />
      </a-form-item>
      <a-form-item label="富文本">
        <a-switch v-model:checked="options.richText" />
      </a-form-item>
      <a-form-item>
        <TextStyleEditor :options="options"></TextStyleEditor>
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
      <a-form-item label="渲染器" v-if="options._data_origin_component_uuid">
        <div class="event-div-col" @click="onEventClick">
          <i class="event-icon iconfont iconbiangengguanli" />
          渲染器
        </div>
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

function onEventClick() {
  store.openStatusDialog()
}
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

.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 44%;
  align-items: center;
  color: #666;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}

.event-icon {
  margin-right: 10px;
}
</style>
