<template>
  <div>
    <img v-if="props.options[props.valueKey]" :src="props.options[props.valueKey]" class="select-image" @click="openImageSelect" />
    <PlusOutlined v-else class="avatar-uploader" @click="openImageSelect" />
    <ImageSelectDialog ref="imageRef" @select-image="selectImage"></ImageSelectDialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImageSelectDialog from '@/layouts/modal/image-upload-dialog.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
const props = defineProps<{
  options: any
  valueKey: string
}>()

const imageRef = ref()

function openImageSelect() {
  imageRef.value.onOpen()
}

function selectImage(img: any) {
  props.options[props.valueKey] = img.url
  props.options.contentDataSource = 'radio-button-default'
}
</script>

<style scoped>
.select-image {
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
}

.avatar-uploader {
  font-size: 20px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}
</style>
