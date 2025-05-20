<template>
  <div>
    <template v-if="fileList && fileList.length > 0">
      <div v-for="(item, index) in fileList" :key="index" class="file-item">
        <LinkOutlined />
        <div style="margin-left: 8px">
          {{ item.fileName }}
        </div>
      </div>
    </template>
    <div v-else>附件查看</div>
  </div>
</template>

<script lang="ts">
import { getComponentValue } from '@/utils/component-value'
import optionsConfig from './options-config'
import { LinkOutlined } from '@ant-design/icons-vue'

export default {
  name: 'nebula-component-file',
  components: {
    LinkOutlined
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    fileList() {
      let value = getComponentValue(this.options, this.options.value)
      let fileList = []
      if (value && value.length > 0) {
        if (typeof value === 'string') {
          fileList = JSON.parse(value)
        } else if (Array.isArray(value)) {
          fileList = value
        }
      }
      return fileList
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.file-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  cursor: pointer;
  color: #1677ff;
}
</style>
