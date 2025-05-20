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
import { isEmpty } from 'lodash'
export default {
  type: 'nebula-component-chart-histogram',
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
      echartsOption.grid = options.grid
      echartsOption.tooltip = options.echartsOptions.tooltip
      echartsOption.legend = legend(options.legendAlign)
      let yAxisType = options.interfaceDataConfig.yAxisType
      echartsOption.yAxis = [
        {
          name: options.yAxisConfig.nameShow ? options.yAxisConfig.name : '',
          nameTextStyle: options.yAxisConfig.nameTextStyle,
          max: options.yAxisConfig.max,
          min: options.yAxisConfig.min,
          axisLabel: {
            ...options.yAxisConfig.axisLabel,
            formatter: (value: any) => {
              return axisFormatter(value, yAxisType)
            }
          },
          axisLine: options.yAxisConfig.axisLine
        }
      ]
      //多Y轴
      if (!isEmpty(options.yAxisConfig.additionalYAxisConfig)) {
        for (let index = 0; index < options.yAxisConfig.additionalYAxisConfig.length; index++) {
          const item: any = options.yAxisConfig.additionalYAxisConfig[index]
          let yAxisItem = {
            name: item.nameShow ? item.name : '',
            nameTextStyle: item.nameTextStyle,
            max: item.max,
            min: item.min,
            axisLabel: item.axisLabel,
            axisLine: item.axisLine,
            position: 'right'
          }
          if (options.interfaceDataConfig.additionalYAxis && index < options.interfaceDataConfig.additionalYAxis.length) {
            let axisItem: any = options.interfaceDataConfig.additionalYAxis[index]
            let yAxisType = axisItem.yAxisType
            yAxisItem.axisLabel.formatter = function (value: any) {
              return axisFormatter(value, yAxisType)
            }
          }
          echartsOption.yAxis.push(yAxisItem)
        }
      }
      let resp: any[] = []
      // 横轴
      let dimension: any[] = []
      // 纵轴
      let metrics: any[] = []
      //堆叠
      let stack: any[] = []
      //线性
      let line: any[] = []
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
        line = options.interfaceDataConfig.chartSettings.showLine || []
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
        echartsOption.xAxis = []
        if (dimension.length > 0) {
          dimension.forEach((dItem) => {
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
          echartsOption.dataset = [{ source: [] }]
          echartsOption.dataset[0].source = data

          echartsOption.series = []
          metrics.forEach((item) => {
            let metricItem = {
              name: item,
              yAxisIndex: 0
            } as any
            if (stack.includes(item)) {
              metricItem.stack = 'stack'
            } else {
              metricItem.stack = undefined
            }
            if (line.includes(item)) {
              metricItem.type = 'line'
            } else {
              metricItem.type = 'bar'
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
            color: echartsOption.color[0],
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
            let metricItem = {
              name: item,
              label: {
                show: !options.label || options.label === 'none' ? false : true,
                position: options.label
              },
              yAxisIndex: 0
            } as any
            if (stack.includes(item)) {
              metricItem.stack = 'stack'
            } else {
              metricItem.stack = undefined
            }
            if (line.includes(item)) {
              metricItem.type = 'line'
            } else {
              metricItem.type = 'bar'
            }
            echartsOption.series.push(metricItem)
          })
        }

        //多Y轴数据配置
        if (!isEmpty(options.yAxisConfig.additionalYAxisConfig) && !isEmpty(options.interfaceDataConfig.additionalYAxis)) {
          for (let index = 0; index < options.interfaceDataConfig.additionalYAxis.length; index++) {
            const yAxisItem: any = options.interfaceDataConfig.additionalYAxis[index]
            metrics = metrics.concat(yAxisItem.metrics || [])
            line = yAxisItem.showLine || []
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

            metrics = yAxisItem.metrics || []
            metrics.forEach((item) => {
              let metricItem = {
                name: item,
                label: {
                  show: !options.label || options.label === 'none' ? false : true,
                  position: options.label
                },
                yAxisIndex: index + 1
              } as any

              if (line.includes(item)) {
                metricItem.type = 'line'
              } else {
                metricItem.type = 'bar'
              }

              echartsOption.series.push(metricItem)
            })
          }
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
