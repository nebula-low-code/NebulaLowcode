<template>
  <a-progress :type="options.type" :percent="percent" :showInfo="options.numberShow" :strokeColor="options.color" :strokeWidth="options.strokeWidth" :format="infoFormat" />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState, mapActions } from 'pinia'
import { useDataStore, useThemeStore } from '@/stores'
export default {
  type: 'nebula-component-progress',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  mounted() {
    this.initDefaultStyle()
  },
  computed: {
    ...mapState(useThemeStore, ['themeConfig']),
    percent() {
      let percent = (this.options.rateValue * 100) / this.options.maxValue
      if (this.options.interfaceDataConfig.uuid && this.options.interfaceDataConfig.uuid.length > 0) {
        let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            let max = parseFloat(resp[this.options.interfaceDataConfig.maxKey])
            let rate = parseFloat(resp[this.options.interfaceDataConfig.rateKey])
            percent = (rate * 100) / max
          }
        }
      }
      return percent
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    infoFormat(percent: any) {
      if (this.options.type === 'line') {
        let max = this.options.maxValue
        let rate = this.options.rateValue
        if (this.options.interfaceDataConfig.uuid && this.options.interfaceDataConfig.uuid.length > 0) {
          let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
          if (interfaceData) {
            let resp = interfaceData.data.responseData
            max = resp[this.options.interfaceDataConfig.maxKey]
            rate = resp[this.options.interfaceDataConfig.rateKey]
          }
        }
        return rate + '/' + max
      } else {
        return Math.round(percent) + '%'
      }
    },
    initDefaultStyle() {
      if (!this.options.themeChanged.color) {
        this.options.color = this.themeConfig.token.colorPrimary
      }
    }
  }
}
</script>
<style lang=""></style>
