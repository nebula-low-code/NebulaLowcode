<template>
  <div class="extend-div">
    <p class="extend-label">扩展字段</p>
    <div style="flex: 1">
      <a-input />
    </div>
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'
import { textStyleConfig } from '@/utils/common-style'
import { formatText } from '@/utils/text-formatter'
import { getComponentValue } from '@/utils/component-value'
import { type componentOptionsType } from '@/utils/type'

export default {
  name: 'nebula-component-text',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    dislayText() {
      let text = getComponentValue(this.options, this.options.value, this.options._data_origin_component_uuid)
      return formatText(text, this.options.textFormat)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.extend-div {
  display: flex;
}
.extend-label {
  line-height: 32px;
  margin-right: 20px;
}
</style>
