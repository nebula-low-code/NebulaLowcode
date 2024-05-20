<template>
  <div v-if="isMultiPic" style="display: flex">
    <img v-for="(item, index) in extraData.columns" :src="item" :style="style" style="margin-right: 4px" />
  </div>
  <img v-else :src="imageUrl" :style="style" />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { getComponentValue } from '@/utils/component-value'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-image',
  components: {},
  data() {
    return {
      options: optionsConfig,
      extraData: {
        columns: [] as any[]
      }
    }
  },
  computed: {
    isMultiPic() {
      return this.extraData.columns.length > 1
    },
    imageUrl() {
      let url = getComponentValue(this.options, this.options.src, this.options._data_origin_component_uuid)
      if (Array.isArray(url)) {
        this.extraData.columns = url
      } else if (typeof url === 'string') {
        this.extraData.columns = url.split(',')
      }
      return url
    },
    imgWidth() {
      const margin = this.options.commonConfig.leftSpaceDistance + this.options.commonConfig.rightSpaceDistance + 'px'
      return `calc(100% - ${margin})`
      let width = this.options.commonConfigCompWidth + this.options.commonConfigCompWidthUnit
      // if (this.options.commonConfigCompWidthUnit == 'auto') {
      //   return `calc(100% - ${margin})`
      // }
      // return `calc(${width} - ${margin})`
    },
    imgHeight() {
      if (this.options.commonConfigCompHeightUnit == 'auto') {
        return '100%'
      }
      return this.options.commonConfigCompHeight + this.options.commonConfigCompHeightUnit
    },
    style() {
      let value = { width: this.imgWidth, height: this.imgHeight }
      //   if (this.options.commonConfig.postionAbsolute) {
      //     value.position = 'absolute'
      //   }
      //   value.zIndex = this.options.commonConfig.zIndex
      //   if (this.options.commonConfig.postionConfig.type == 'center-center') {
      //     value.top = '50%'
      //     value.left = '50%'
      //     value.transform = 'translate(-50%,-50%)'
      //   } else if (this.options.commonConfig.postionConfig.type == 'center-left') {
      //     value.top = '50%'
      //     value.left = 0
      //     value.transform = 'translateY(-50%)'
      //   } else if (this.options.commonConfig.postionConfig.type == 'center-right') {
      //     value.top = '50%'
      //     value.right = 0
      //     value.transform = 'translateY(-50%)'
      //   } else if (this.options.commonConfig.postionConfig.type == 'top-center') {
      //     value.top = 0
      //     value.left = '50%'
      //     value.transform = 'translate(-50%, -50%)'
      //   } else if (this.options.commonConfig.postionConfig.type == 'top-left') {
      //     value.top = 0
      //     value.left = 0
      //   } else if (this.options.commonConfig.postionConfig.type == 'top-right') {
      //     value.top = 0
      //     value.right = 0
      //   } else if (this.options.commonConfig.postionConfig.type == 'bottom-center') {
      //     value.inset= null;
      //     value.bottom = 0
      //     value.left = '50%'
      //     value.transform = 'translate(-50%, 0)'
      //   } else if (this.options.commonConfig.postionConfig.type == 'bottom-left') {
      //     value.inset= null;
      //     value.bottom = 0;
      //     value.left = 0;
      //   } else if (this.options.commonConfig.postionConfig.type == 'bottom-right') {
      //     value.top= null;
      //     value.bottom = 0;
      //     value.right = 0;

      //   } else if (this.options.commonConfig.postionConfig.type == 'initial') {
      //   }

      console.log('---------', value)
      return value
    }
  }
}
</script>
<style lang=""></style>
