<template>
  <a-steps :current="options.value" :direction="options.direction" :size="options.size">
    <a-step v-for="(step, index) in options.steps" :key="index" :title="step.value" :description="step.description" />
  </a-steps>
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-steps',
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
