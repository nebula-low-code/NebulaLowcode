<template>
  <v-chart :option="chartOptions" autoresize :style="{ width: chartWidth, height: chartHeight }" />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import type { echartsOptions } from '@/utils/type'
import VChart from 'vue-echarts'
import { axisFormatter } from '@/utils/charts-utils/axis-formatter'
import { legend } from '@/utils/charts-utils/charts-legend'
export default {
  type: 'nebula-component-chart-bar',
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
      let xAxisType = options.interfaceDataConfig.xAxisType
      echartsOption.color = options.chartColors
      echartsOption.grid = options.grid
      echartsOption.tooltip = options.echartsOptions.tooltip
      echartsOption.legend = legend(options.legendAlign)
      echartsOption.xAxis = {
        name: options.yAxisConfig.nameShow ? options.yAxisConfig.name : '',
        nameTextStyle: options.yAxisConfig.nameTextStyle,
        max: options.yAxisConfig.max,
        min: options.yAxisConfig.min,
        axisLabel: options.yAxisConfig.axisLabel,
        axisLine: options.yAxisConfig.axisLine
      }
      echartsOption.xAxis.axisLabel.formatter = function (value: any) {
        return axisFormatter(value, xAxisType)
      }
      let resp: any[] = []
      // 横轴
      let dimension: any[] = []
      // 纵轴
      let metrics: any[] = []
      //堆叠
      let stack: any[] = []
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
        stack = options.interfaceDataConfig.stack || []
      } else {
        dimension = options.defaultData.chartSettings.dimension
        metrics = options.defaultData.chartSettings.metrics
        resp = options.defaultData.chartData.rows
      }
      if (resp) {
        if (options.interfaceDataConfig.dynamicYAxis && resp.length > 0) {
          //纵轴是动态的,需要解析返回数据中所有的key,并去掉横轴
          metrics = []
          let resKeys = Object.keys(resp[0])
          resKeys.forEach((key) => {
            if (!dimension.includes(key)) {
              metrics.push(key)
            }
          })
        }
        echartsOption.series = []
        metrics.forEach((item) => {
          let sList: any[] = []
          resp.forEach((dataItem) => {
            sList.push(dataItem[item])
          })
          let metricItem = {
            name: item,
            type: 'bar',
            data: sList
          } as any
          if (stack.includes(item)) {
            metricItem.stack = 'stack'
          } else {
            metricItem.stack = undefined
          }
          echartsOption.series.push(metricItem)
        })

        echartsOption.yAxis = []
        if (dimension.length > 0) {
          dimension.forEach((dItem) => {
            let xList: any[] = []
            resp.forEach((dataItem) => {
              xList.push(dataItem[dItem])
            })
            let yAxisItem = {
              type: 'category',
              axisTick: { show: false },
              axisLabel: options.xAxisConfig.axisLabel,
              axisLine: options.xAxisConfig.axisLine,
              data: xList
            }
            echartsOption.yAxis.push(yAxisItem)
          })
        } else {
          let yAxisItem = {
            type: 'category',
            axisTick: { show: false },
            axisLabel: options.xAxisConfig.axisLabel,
            axisLine: options.xAxisConfig.axisLine
          }
          echartsOption.yAxis.push(yAxisItem)
        }
      }

      return echartsOption
    }
  },
  mounted() {},
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style lang=""></style>
