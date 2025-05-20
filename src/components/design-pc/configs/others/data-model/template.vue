<template>
  <div style="min-height: 45px; text-align: center">
    数据模型组件
    <img src="/src/assets/images/placeholder.png" style="width: 100%; height: 45px; margin-top: 8px" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, ref, computed, watch } from 'vue'
import { getComponentDetail } from '@/api/custom-component'
import optionsConfig from './options-config'

export default {
  name: 'nebula-component-custom',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {},
  watch: {

  },
  created() {
  
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
