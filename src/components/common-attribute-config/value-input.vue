<template>
  <a-input-group compact>
    <a-input v-model:value="options[valueKey]" style="width: calc(100% - 32px)" />
    <a-popover v-model:open="visible" trigger="click">
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
  </a-input-group>
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
  const hasI18N =
    props.options[props.valueKey] != null &&
    props.options[props.valueKey].length > 0 &&
    props.options[props.enValueKey] != null &&
    props.options[props.enValueKey].length > 0

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
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border: 1px solid #d9d9d9;
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
