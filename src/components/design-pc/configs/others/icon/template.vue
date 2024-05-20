<template>
  <i
    :class="options.icon.fontClass"
    :style="{ fontSize: options.size + 'px', color: options.color }"
  ></i>
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-icon',
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
