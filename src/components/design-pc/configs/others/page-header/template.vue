<template>
  <a-page-header
    style="border: 1px solid rgb(235, 237, 240); background-color: transparent"
    :title="options.title"
    :sub-title="options.subTitle"
    @back="() => null"
  />
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-page-header',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
