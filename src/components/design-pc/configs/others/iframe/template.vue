<template>
  <iframe style="pointer-events: none" width="100%" height="100%" :src="url" v-show="url.length > 0"> </iframe>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'
import { getComponentValue } from '@/utils/component-value'

export default {
  name: 'nebula-component-iframe',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    url() {
      return getComponentValue(this.options, this.options.url)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
