<template>
  <a-input-number
    :style="width"
    v-model:value="options.value"
    :max="options.max"
    :min="options.min"
    :step="options.step"
    :precision="!options.integer ? 0 : options.precision"
  />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-stepper',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    width() {
      const margin =
        this.options.commonConfig.leftSpaceDistance +
        this.options.commonConfig.rightSpaceDistance +
        'px'
      return `width: calc(100% - ${margin})`
    }
  }
}
</script>
<style lang=""></style>
