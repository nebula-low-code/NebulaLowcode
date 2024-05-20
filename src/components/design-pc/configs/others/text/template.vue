<template>
  <div style="text-overflow: ellipsis; overflow: hidden" :style="textStyle">
    {{ dislayText }}
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
    ...mapState(useDataStore, ['componentListMap']),
    textStyle() {
      return `white-space: ${this.options.nowrap ? 'nowrap' : 'normal'};` + textStyleConfig(this.options.styleEditorConfig)
    },
    dislayText() {
      let text = getComponentValue(this.options, this.options.value, this.options._data_origin_component_uuid)
      return formatText(text, this.options.textFormat)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
