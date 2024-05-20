<template>
  <a-divider
    :type="options.type"
    :orientation="options.orientation"
    :style="{ borderColor: options.borderConfig.color, borderStyle: options.borderConfig.style }"
    v-if="options.title"
  >
    {{ options.title }}
  </a-divider>
  <a-divider
    :type="options.type"
    :orientation="options.orientation"
    :style="{
      backgroundColor: '#fff',
      borderColor: options.borderConfig.color,
      borderStyle: options.borderConfig.style
    }"
    v-else
  ></a-divider>
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-iframe',
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
