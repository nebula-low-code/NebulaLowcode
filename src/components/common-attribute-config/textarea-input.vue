<template>
  <a-textarea v-model:value="options[valueKey]" />
  <a-popover v-model:open="visible" placement="bottom" trigger="click">
    <template #content>
      <div class="row">
        <div class="title">中文</div>
        <a-input v-model:value="options[valueKey]" placeholder="请输入中文"></a-input>
      </div>
      <div class="row" style="margin-top: 16px">
        <div class="title">英文</div>
        <a-input v-model:value="options[enValueKey]" placeholder="请输入英文"></a-input>
      </div>
      <a-button @click="visible = false" type="primary" class="confirm-button">确定</a-button>
    </template>
    <i :style="style" style="cursor: pointer" class="iconfont iconglobal global"></i>
  </a-popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  options: any
  valueKey: string
  enValueKey: string
}>()

const visible = ref(false)

const style = computed(() => {
  const hasI18N = props.options[props.valueKey] != null && props.options[props.valueKey].length > 0 && props.options[props.enValueKey] != null && props.options[props.enValueKey].length > 0

  if (hasI18N) {
    return {
      backgroundColor: '#1677ff',
      color: 'white'
    }
  } else {
    return {}
  }
})
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
