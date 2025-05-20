<template>
  <div v-if="options.richText" v-html="dislayText"></div>
  <div v-else style="text-overflow: ellipsis; overflow: hidden" :style="textStyle">
    {{ dislayText }}
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import { mapState } from 'pinia'
import { useDataStore, useThemeStore } from '@/stores'
import { textStyleConfig } from '@/utils/common-style'
import { formatText, FontSizeType } from '@/utils/text-formatter'
import { getComponentValue } from '@/utils/component-value'
import { isEmpty } from 'lodash'
export default {
  name: 'nebula-component-text',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  mounted() {
    this.initFontSize(this.options.fontSizeType)
  },
  watch: {
    'options.fontSizeType': {
      handler(val) {
        this.initFontSize(val)
      }
    }
  },

  computed: {
    ...mapState(useThemeStore, ['themeConfig']),
    textStyle() {
      return `white-space: ${this.options.nowrap ? 'nowrap' : 'pre-wrap'};` + textStyleConfig(this.options.styleEditorConfig)
    },
    dislayText() {
      let text = getComponentValue(this.options, this.options.value, this.options._data_origin_component_uuid)
      return formatText(text, this.options.textFormat)
    }
  },
  methods: {
    initFontSize(size: string) {
      if (!isEmpty(size)) {
        switch (size) {
          case FontSizeType.HEADING1:
            this.options.styleEditorConfig.textHtmlSize = this.themeConfig.token.fontSizeHeading1
            break
          case FontSizeType.HEADING2:
            this.options.styleEditorConfig.textHtmlSize = this.themeConfig.token.fontSizeHeading2
            break
          case FontSizeType.HEADING3:
            this.options.styleEditorConfig.textHtmlSize = this.themeConfig.token.fontSizeHeading3
            break
          case FontSizeType.HEADING4:
            this.options.styleEditorConfig.textHtmlSize = this.themeConfig.token.fontSizeHeading4
            break
          case FontSizeType.HEADING5:
            this.options.styleEditorConfig.textHtmlSize = this.themeConfig.token.fontSizeHeading5
            break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
