<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :style="{
        display: options.labelShow ? '' : 'none',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <div
      style="flex: 1"
      :style="{
        height: options.vertical ? '200px' : '',
        width: options.vertical ? '' : '-webkit-fill-available',
        display: 'inline-block'
      }"
    >
      <a-slider v-model:value="options.value" :step="options.step" :vertical="options.vertical" :min="options.min" :max="options.max" :default-value="options.value" :disabled="options.disabled" />
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-slider',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    flexStyle() {
      if (this.options.labelAlign != 'top') {
        return {
          display: 'flex'
        }
      }
      return {}
    }
  }
}
</script>
<style lang=""></style>
