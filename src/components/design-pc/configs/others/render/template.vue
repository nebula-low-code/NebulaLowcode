<template>
  <div style="min-height: 45px; text-align: center">
    自定义组件
    <img src="/src/assets/images/placeholder.png" style="width: 100%; height: 45px; margin-top: 8px" />
    <!-- <component style="pointer-events: none" :is="extraData.customComponent"></component> -->
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
      // extraData: {
      //   customComponent: null
      // }
    }
  },
  computed: {},
  watch: {
    // 'options.customComponentId': {
    //   handler: function (val) {
    //     if (val) {
    //       this.extraData.customComponent = defineAsyncComponent(async () => {
    //         const res = await getComponentDetail({
    //           businessId: val
    //         })
    //         if (res.data) {
    //           const fn = new Function(`return ${res.data.componentConfig}`)
    //           const customComp = fn()
    //           return customComp
    //         } else {
    //           return { template: `` }
    //         }
    //       })
    //     }
    //   }
    // }
  },
  created() {
    // this.extraData.customComponent = defineAsyncComponent(async () => {
    //   const customComponentId = this.options.customComponentId
    //   if (customComponentId) {
    //     const res = await getComponentDetail({
    //       businessId: customComponentId
    //     })
    //     if (res.data) {
    //       const fn = new Function(`return ${res.data.componentConfig}`)
    //       const customComp = fn()
    //       return customComp
    //     } else {
    //       return { template: `` }
    //     }
    //   } else {
    //     return { template: `` }
    //   }
    // })
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
