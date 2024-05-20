<template>
  <a-radio-group v-model:value="options[valueKey]" button-style="solid" :size="size" @change="onChange">
    <a-radio-button v-for="(item, index) in radioOptions" :key="index" :value="item.value">
      <div :title="item.label" v-if="item.label">
        {{ item.label }}
      </div>
      <div :title="item.label" v-if="item.icon">
        <i :class="item.icon" class="iconfont" />
      </div>
    </a-radio-button>
  </a-radio-group>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    options: any
    valueKey: string
    radioOptions: any
    size?: string
  }>(),
  {
    size: 'default'
  }
)

const emit = defineEmits(['onChange'])
function onChange(e: any) {
  emit('onChange', e)
}
</script>

<style scoped></style>
