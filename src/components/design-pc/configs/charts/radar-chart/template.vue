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
import { isEmpty } from 'lodash'
export default {
  type: 'nebula-component-chart-radar',
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
      let metrics: any[] = []
      // 最大值
      let max = ''
      let id = options.interfaceDataConfig.uuid || options.interfaceDataConfig.id
      if (id) {
        dimension = options.interfaceDataConfig.chartSettings.dimension || ''
        metrics = options.interfaceDataConfig.chartSettings.metrics || []
        max = options.interfaceDataConfig.chartSettings.max || ''

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
        echartsOption.radar = { shape: options.shape, indicator: [] }
        echartsOption.radar.indicator = []
        metrics.forEach((metric) => {
          echartsOption.radar.indicator.push({
            name: metric
          })
        })
        echartsOption.series = []
        let data: any[] = []
        if (!isEmpty(dimension) && !isEmpty(metrics)) {
          resp.forEach((dataItem: any) => {
            let sList: any[] = []
            metrics.forEach((item, index) => {
              sList.push(dataItem[item])
              if (!isEmpty(max) && index < echartsOption.radar.indicator.length) {
                let indicator = echartsOption.radar.indicator[index]
                indicator.max = dataItem[max]
              }
            })

            data.push({
              name: dataItem[dimension],
              value: sList
            })
          })
        }

        echartsOption.series.push({
          type: 'radar',
          data: data
        })
      }
      // console.log('radar echartsOption----', echartsOption)

      return echartsOption
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style scoped></style>
