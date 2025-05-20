<template>
  <v-chart :option="chartOptions" autoresize :style="{ width: chartWidth, height: chartHeight }" />
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import VChart from 'vue-echarts'
import type { echartsOptions } from '@/utils/type'
import { axisFormatter } from '@/utils/charts-utils/axis-formatter'
import { legend } from '@/utils/charts-utils/charts-legend'
export default {
  type: 'nebula-component-chart-waterfall',
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
      echartsOption.xAxis = {
        axisTick: { show: false },
        axisLabel: options.xAxisConfig.axisLabel,
        axisLine: options.xAxisConfig.axisLine
      }
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
      echartsOption.tooltip.formatter = function (params: any) {
        let tar = params[1]
        return tar?.name + '<br/>' + tar?.seriesName + ' : ' + tar?.value
      }
      let total = 0
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
        echartsOption.xAxis.data = ['总计']
        resp.forEach((dataItem: any) => {
          total = total + (dataItem[metrics] + 0)
          echartsOption.xAxis.data.push(dataItem[dimension])
        })

        let data1 = [total] //有颜色部分的数值
        resp.forEach((dataItem: any) => {
          data1.push(dataItem[metrics])
        })
        let data0 = [0, total - data1[1]] //透明部分的数值
        for (let i = 2; i < data1.length; i++) {
          data0.push(data0[i - 1] - data1[i])
        }
        echartsOption.series.push({
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: data0
        })
        echartsOption.series.push({
          name: metrics,
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'top',
            formatter: function (value: any) {
              return axisFormatter(value.value, yAxisType)
            }
          },
          data: data1
        })
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
