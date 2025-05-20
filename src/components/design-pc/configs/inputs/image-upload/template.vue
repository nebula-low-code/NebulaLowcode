<template>
  <a-upload name="avatar" list-type="picture-card" style="pointer-events: none" :style="{ width: options.width + 'px', height: options.height + 'px' }">
    <div>
      <i v-if="options.icon.fontClass" :class="options.icon.fontClass" />
      <div class="upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { PlusOutlined } from '@ant-design/icons-vue'
export default {
  type: 'nebula-component-image-upload',
  components: {
    PlusOutlined
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {}
}
</script>
<style scoped>
.upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
