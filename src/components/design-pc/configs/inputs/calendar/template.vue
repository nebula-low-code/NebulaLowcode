<template>
  <a-calendar :fullscreen="options.fullScreen" style="pointer-events: none" />
</template>

<script lang="ts">
import optionsConfig from './options-config'
export default {
  name: 'nebula-component-calendar',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  watch: {},
  mounted() {},
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
