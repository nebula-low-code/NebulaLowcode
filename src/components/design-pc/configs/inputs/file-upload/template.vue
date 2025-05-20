<template>
  <div>
    <a-upload-dragger v-if="options.type === 'card'" name="file" style="pointer-events: none">
      <i :class="options.icon.fontClass" :style="{ fontSize: options.iconSize + 'px', color: options.iconColor }"></i>
      <p>{{ options.text }}</p>
    </a-upload-dragger>
    <a-upload v-else name="file" style="pointer-events: none">
      <a-button>
        <upload-outlined></upload-outlined>
        点击上传
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { UploadOutlined } from '@ant-design/icons-vue'
export default {
  type: 'nebula-component-file-upload',
  components: {
    UploadOutlined
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {}
}
</script>
<style lang=""></style>
