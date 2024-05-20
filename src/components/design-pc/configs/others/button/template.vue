<template>
  <!-- <a-button :style="buttonStyle" :type="buttonType" :danger="options.type == 'danger' ? true : false" :size="options.size" :shape="options.shape">
    <template #icon>
      <i :class="options.customtimageIcon.fontClass" style="margin-right: 5px; font-size: 14px" v-if="options.iconPreShow" />
    </template>
    {{ options.text }}
  </a-button> -->

  <div :style="[buttonStyle, borderRadiusStyle]" style="cursor: pointer" class="button-view">
    <div style="display: flex; align-items: center; width: 100%; justify-content: center" :style="iconStyle">
      <i v-if="options.iconPreShow" style="text-align: center" :style="iconSize" :class="options.customtimageIcon.fontClass" />
      <div style="padding: 0 4px">
        {{ options.text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
export default {
  type: 'nebula-component-button',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  mounted() {
    this.initButtonType(this.options.type)
  },
  computed: {
    iconStyle() {
      let fontSize = `font-size: ${this.options.styleEditorConfig.textHtmlSize}px;`
      switch (this.options.iconPosition) {
        case 'left':
          return fontSize + 'flex-direction: row'
        case 'right':
          return fontSize + 'flex-direction: row-reverse'
        case 'top':
          return fontSize + 'flex-direction: column'
        case 'bottom':
          return fontSize + 'flex-direction: column-reverse'
      }
      return ''
    },
    iconSize() {
      return `font-size: ${this.options.styleEditorConfig ? this.options.styleEditorConfig.textHtmlSize : 14}px;`
    },
    buttonStyle() {
      return {
        backgroundColor: this.options.backgroundColor,
        color: this.options.color,
        fontSize: this.options.styleEditorConfig.textHtmlSize + 'px',
        display: this.options.block ? 'block' : 'inline-block'
      }
    },
    borderRadiusStyle() {
      let radius = ''
      switch (this.options.shape) {
        case 'round':
          radius = '999px'
          break
        case 'circle':
          radius = '50%'
          break
        default:
          radius = '6px'
          break
      }
      return {
        borderRadius: radius
      }
    }
  },
  methods: {
    initButtonType(type: any) {
      switch (type) {
        case 'primary':
          {
            this.options.backgroundColor = '#1677ff'
            this.options.color = '#fff'
            this.options.commonConfig.borderStyle = {}
          }
          break
        case 'dashed':
          {
            this.options.backgroundColor = '#fff'
            this.options.color = '#000000e0'

            if (!this.options.commonConfig.borderStyle || Object.keys(this.options.commonConfig.borderStyle).length === 0) {
              this.options.commonConfig.borderStyle.topDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.topSize = '1'
              this.options.commonConfig.borderStyle.topDirveType = 'dashed'

              this.options.commonConfig.borderStyle.rightDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.rightSize = '1'
              this.options.commonConfig.borderStyle.rightDirveType = 'dashed'

              this.options.commonConfig.borderStyle.bottomDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.bottomSize = '1'
              this.options.commonConfig.borderStyle.bottomDirveType = 'dashed'

              this.options.commonConfig.borderStyle.leftDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.leftSize = '1'
              this.options.commonConfig.borderStyle.leftDirveType = 'dashed'
            }
          }
          break
        case 'danger':
          {
            this.options.backgroundColor = '#ff4d4f'
            this.options.color = '#fff'
            this.options.commonConfig.borderStyle = {}
          }
          break
        case 'link':
          {
            this.options.backgroundColor = 'transparent'
            this.options.color = '#1677ff'
            this.options.commonConfig.borderStyle = {}
          }
          break
        case 'custom':
          break
        default:
          {
            this.options.backgroundColor = '#fff'
            this.options.color = '#000000e0'

            if (!this.options.commonConfig.borderStyle || Object.keys(this.options.commonConfig.borderStyle).length === 0) {
              this.options.commonConfig.borderStyle.topDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.topSize = '1'
              this.options.commonConfig.borderStyle.topDirveType = 'solid'

              this.options.commonConfig.borderStyle.rightDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.rightSize = '1'
              this.options.commonConfig.borderStyle.rightDirveType = 'solid'

              this.options.commonConfig.borderStyle.bottomDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.bottomSize = '1'
              this.options.commonConfig.borderStyle.bottomDirveType = 'solid'

              this.options.commonConfig.borderStyle.leftDirveColor = '#d9d9d9'
              this.options.commonConfig.borderStyle.leftSize = '1'
              this.options.commonConfig.borderStyle.leftDirveType = 'solid'
            }
          }
          break
      }
    }
  }
}
</script>
<style scoped>
.button-view:active {
  opacity: 0.8; /* 轻微降低透明度 */
}
</style>
