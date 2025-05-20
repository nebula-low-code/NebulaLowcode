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
import { axisFormatter } from '@/utils/charts-utils/axis-formatter'
export default {
  type: 'nebula-component-chart-scatter',
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
        const margin =
          this.options.commonConfig.leftSpaceDistance +
          this.options.commonConfig.rightSpaceDistance +
          'px'
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
      let yAxisType = options.interfaceDataConfig.yAxisType
      echartsOption.color = options.chartColors
      echartsOption.grid = options.grid
      echartsOption.tooltip = options.echartsOptions.tooltip
      echartsOption.legend = legend(options.legendAlign)
      echartsOption.yAxis = {
        name: options.yAxisConfig.nameShow ? options.yAxisConfig.name : '',
        nameTextStyle: options.yAxisConfig.nameTextStyle,
        max: options.yAxisConfig.max,
        min: options.yAxisConfig.min,
        axisLabel: options.yAxisConfig.axisLabel,
        axisLine: options.yAxisConfig.axisLine
      }
      echartsOption.yAxis.axisLabel.formatter = function (value: any) {
        return axisFormatter(value, yAxisType)
      }
      let resp: any[] = []
      // 横轴
      let dimension: any[] = []
      // 纵轴
      let metrics: any[] = []
      let id = options.interfaceDataConfig.uuid || options.interfaceDataConfig.id
      if (id) {
        dimension = options.interfaceDataConfig.chartSettings.dimension || []
        metrics = options.interfaceDataConfig.chartSettings.metrics || []
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
        echartsOption.xAxis = []
        dimension.forEach((dItem) => {
          let xList = []
          resp.forEach((dataItem) => {
            xList.push(dataItem[dItem])
          })
          let xAxisItem = {
            type: 'category',
            axisTick: { show: false },
            axisLabel: options.xAxisConfig.axisLabel,
            axisLine: options.xAxisConfig.axisLine
          }
          echartsOption.xAxis.push(xAxisItem)
        })

        if (options.regression.algorithm !== 'none') {
          echartsOption.dataset[1].transform = {
            type: 'ecStat:regression',
            config: {
              method: options.regression.algorithm,
              order: options.regression.order
            }
          }

          let data: any[] = []
          resp.forEach((dataItem) => {
            let item = []
            item.push(dataItem[dimension[0]])
            metrics.forEach((metric) => {
              item.push(dataItem[metric])
            })
            data.push(item)
          })
          echartsOption.dataset[0].source = data

          echartsOption.series = []
          metrics.forEach((item) => {
            let sList = []
            resp.forEach((dataItem) => {
              sList.push(dataItem[item])
            })
            let metricItem = {
              name: item,
              type: 'scatter'
            }
            echartsOption.series.push(metricItem)
          })

          echartsOption.series.push({
            name: 'line',
            type: 'line',
            smooth: true,
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            color: options.echartsOption.color[0],
            label: { show: true, fontSize: 16, overflow: 'break' },
            labelLayout: { dx: -80, width: 300 },
            encode: { label: 2, tooltip: 1 }
          })
        } else {
          let data: any[] = []
          resp.forEach((dataItem) => {
            let item = []
            item.push(dataItem[dimension[0]])
            metrics.forEach((metric) => {
              item.push(dataItem[metric])
            })
            data.push(item)
          })
          echartsOption.dataset = [{ source: [] }]
          echartsOption.dataset[0].source = data

          echartsOption.series = []
          metrics.forEach((item) => {
            let sList = []
            resp.forEach((dataItem) => {
              sList.push(dataItem[item])
            })
            let metricItem = {
              name: item,
              type: 'scatter'
            }
            echartsOption.series.push(metricItem)
          })
        }
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
