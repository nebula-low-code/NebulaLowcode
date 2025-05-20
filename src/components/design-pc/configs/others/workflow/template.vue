<template>
  <div>
    <a-row><span style="font-weight: bold">审核意见</span></a-row>
    <a-row>
      <a-textarea v-model:value="options.value" placeholder="审批意见" :auto-size="{ minRows: 3, maxRows: 5 }" />
    </a-row>
    <a-row>
      <a-button type="primary" style="margin: 10px"> 同意 </a-button>
      <a-button type="primary" style="margin: 10px"> 拒绝 </a-button>
    </a-row>
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-workflow',
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
