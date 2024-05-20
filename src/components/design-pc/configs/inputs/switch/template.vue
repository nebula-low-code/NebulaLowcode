<template>
  <div style="display: flex; align-items: center">
    <label style="margin-right: 8px">
      {{ options.prefixLabel }}
    </label>
    <a-switch v-model:checked="options.switchValue" :size="options.size" />
    <label style="margin-left: 8px">
      {{ options.suffixLabel }}
    </label>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
export default {
  type: 'nebula-component-switch',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {},
  watch: {
    'options.switchValue': {
      handler: function (val) {
        if (val) {
          if (this.options.prefixValue != undefined && this.options.prefixValue != null) {
            this.options.value = this.options.prefixValue
          }
        } else {
          if (this.options.suffixValue != undefined && this.options.suffixValue != null) {
            this.options.value = this.options.suffixValue
          }
        }
      }
    }
  },
  mounted() {
    if (this.options.value) {
      if (this.options.prefixValue != undefined && this.options.prefixValue != null) {
        this.options.value = this.options.prefixValue
      }
    } else {
      if (this.options.suffixValue != undefined && this.options.suffixValue != null) {
        this.options.value = this.options.suffixValue
      }
    }
  }
}
</script>
<style lang=""></style>
