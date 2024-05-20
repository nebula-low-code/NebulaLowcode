<template>
  <div style="display: flex">
    <a-input-group compact>
      <a-input v-model:value="options[labelKey]" style="width: 80px" placeholder="文本" />
      <a-popover v-model:open="visible" trigger="click">
        <template #content>
          <div class="row">
            <div class="title">中文</div>
            <a-input v-model:value="options[labelKey]" placeholder="请输入中文"></a-input>
          </div>
          <div class="row" style="margin-top: 16px">
            <div class="title">英文</div>
            <a-input v-model:value="options[enLabelKey]" placeholder="请输入英文"></a-input>
          </div>
          <a-button @click="visible = false" type="primary" class="confirm-button">确定</a-button>
        </template>
        <i :style="style" style="cursor: pointer" class="iconfont iconglobal global"></i>
      </a-popover>
      <a-input v-model:value="options[valueKey]" placeholder="值" style="width: 80px" />
    </a-input-group>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  options: any
  labelKey: string
  enLabelKey: string
  valueKey: string
}>()

const visible = ref(false)

const style = computed(() => {
  const hasI18N =
    props.options[props.valueKey] != null &&
    props.options[props.valueKey].length > 0 &&
    props.options[props.enLabelKey] != null &&
    props.options[props.enLabelKey].length > 0

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
