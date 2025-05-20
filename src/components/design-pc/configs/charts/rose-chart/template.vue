<template>
  <v-chart :option="chartOptions" autoresize :style="{ width: chartWidth, height: chartHeight }" />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import VChart from 'vue-echarts'
import type { echartsOptions } from '@/utils/type'
import { legend } from '@/utils/charts-utils/charts-legend'
export default {
  type: 'nebula-component-chart-rose',
  components: {
    VChart
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    chartWidth() {
      {
        const margin = this.options.commonConfig.leftSpaceDistance + this.options.commonConfig.rightSpaceDistance + 'px'
        let width = this.options.commonConfigCompWidth + this.options.commonConfigCompWidthUnit
        if (this.options.commonConfigCompWidthUnit == 'auto') {
          return `calc(100% - ${margin})`
        }
        return `calc(${width} - ${margin})`
      }
    },
    chartHeight() {
      if (this.options.commonConfigCompHeightUnit == 'auto') {
        return '100%'
      }
      return this.options.commonConfigCompHeight + this.options.commonConfigCompHeightUnit
    },
    chartOptions() {
      let options = this.options
      let echartsOption = {} as echartsOptions
      echartsOption.color = options.chartColors
      echartsOption.tooltip = options.echartsOptions.tooltip
      echartsOption.legend = legend(options.legendAlign)
      let resp
      // 横轴
      let dimension = ''
      // 纵轴
      let metrics = ''
      let id = options.interfaceDataConfig.uuid || options.interfaceDataConfig.id
      if (id) {
        dimension = options.interfaceDataConfig.chartSettings.dimension || ''
        metrics = options.interfaceDataConfig.chartSettings.metrics || ''
        let interfaceData = this.interfaceDataById(id)
        if (interfaceData) {
          let result = interfaceData.data.responseData
          if (result) {
            resp = result[options.interfaceDataConfig.key]
          }
        }
      } else {
        dimension = options.defaultData.chartSettings.dimension
        metrics = options.defaultData.chartSettings.metrics
        resp = options.defaultData.chartData.rows
      }
      if (resp) {
        echartsOption.series = []
        let sList: any[] = []
        resp.forEach((dataItem: any) => {
          sList.push({
            name: dataItem[dimension],
            value: dataItem[metrics]
          })
        })
        let centerX = options.centerX === undefined ? 50 : options.centerX
        let centerY = options.centerY === undefined ? 50 : options.centerY
        let metricItem = {
          name: metrics,
          type: 'pie',
          roseType: 'area',
          label: {
            show: options.labelShow,
            fontSize: options.labelFontSize,
            color: options.labelColor || '#000'
          },
          padAngle: options.padAngle === undefined ? 0 : options.padAngle,
          radius: (options.radius === undefined ? 70 : options.radius) + '%',
          center: [centerX + '%', centerY + '%'],
          data: sList
        }
        echartsOption.series.push(metricItem)
      }
      return echartsOption
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style scoped></style>
