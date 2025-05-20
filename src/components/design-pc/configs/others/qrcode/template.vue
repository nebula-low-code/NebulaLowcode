<template>
  <a-qrcode :value="value" :size="options.width" :bordered="false" />
</template>

<script lang="ts">
import optionsConfig from './options-config'
import { getComponentValue } from '@/utils/component-value'

export default {
  name: 'nebula-component-qrcode',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    value() {
      return getComponentValue(this.options, this.options.value)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
