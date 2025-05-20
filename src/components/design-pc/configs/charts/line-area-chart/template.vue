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
export default {
  type: 'nebula-component-chart-line-area',
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
      let yAxisType = options.interfaceDataConfig.yAxisType
      echartsOption.color = options.chartColors
      echartsOption.grid = options.grid
      echartsOption.tooltip = options.echartsOptions.tooltip
      echartsOption.legend = this.legend()

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
        metrics.forEach((item: any) => {
          let sList: any[] = []
          resp.forEach((dataItem) => {
            sList.push(dataItem[item])
          })
          let metricItem = {
            name: item,
            type: 'line',
            areaStyle: {},
            smooth: true,
            label: {
              show: !options.label || options.label === 'none' ? false : true,
              position: options.label
            },
            data: sList
          } as any
          if (stack.includes(item)) {
            metricItem.stack = 'stack'
          } else {
            metricItem.stack = undefined
          }
          echartsOption.series.push(metricItem)
        })

        echartsOption.xAxis = []
        if (dimension.length > 0) {
          dimension.forEach((dItem: any) => {
            let xList: any[] = []
            resp.forEach((dataItem) => {
              xList.push(dataItem[dItem])
            })
            let xAxisItem = {
              type: 'category',
              axisTick: { show: false },
              axisLabel: options.xAxisConfig.axisLabel,
              axisLine: options.xAxisConfig.axisLine,
              data: xList
            }
            echartsOption.xAxis.push(xAxisItem)
          })
        } else {
          let xAxisItem = {
            type: 'category',
            axisTick: { show: false },
            axisLabel: options.xAxisConfig.axisLabel,
            axisLine: options.xAxisConfig.axisLine
          }
          echartsOption.xAxis.push(xAxisItem)
        }
      }
      return echartsOption
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    legend() {
      let legend: any
      switch (this.options.legendAlign) {
        case 'top':
          legend = {
            orient: 'horizontal',
            right: 'center',
            top: 0
          }
          break
        case 'left':
          legend = {
            orient: 'vertical',
            left: 0,
            top: 'center'
          }
          break
        case 'right':
          legend = {
            orient: 'vertical',
            right: 0,
            top: 'center'
          }
          break
        case 'bottom':
          legend = {
            orient: 'horizontal',
            right: 'center',
            bottom: 0
          }
          break
        case 'none':
          legend = undefined
          break
      }
      if (legend) {
        legend['type'] = 'scroll'
      }
      return legend
    }
  }
}
</script>
<style scoped></style>
