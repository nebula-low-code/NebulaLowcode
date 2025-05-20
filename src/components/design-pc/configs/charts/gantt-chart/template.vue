<template>
  <g-gantt-chart :style="{ width: chartWidth }" :chart-start="options.chartStartDate" :chart-end="options.chartEndDate" precision="day" bar-start="beginDate" bar-end="endDate">
    <template #upper-timeunit="headerProps">
      <div>{{ getFormatTime(headerProps.date, 'YYYY-MM') }}</div>
    </template>
    <template #timeunit="headerProps">
      <div>{{ getFormatTime(headerProps.date, 'DD') }}</div>
    </template>
    <template #bar-tooltip="headerProps">
      <div>{{ headerProps.bar.ganttBarConfig.label + ':' + headerProps.bar.beginDate + '-' + headerProps.bar.endDate }}</div>
    </template>
    <g-gantt-row v-for="(item, index) in rowList" :key="index" :label="item.name" :bars="item.value" />
  </g-gantt-chart>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import dayjs from 'dayjs'
import { getComponentValue } from '@/utils/component-value'

export default {
  type: 'nebula-component-chart-gantt',
  components: {},
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
    rowList() {
      let id = this.options.interfaceDataConfig.uuid || this.options.interfaceDataConfig.id
      if (id) {
        let value = getComponentValue(this.options, this.options.value)
        let list = [] as any
        if (value && Array.isArray(value) && value.length > 0) {
          for (let index = 0; index < value.length; index++) {
            const row = value[index]
            let item = {
              name: row.name,
              value: [] as any[]
            }
            if (row.value && Array.isArray(row.value) && row.value.length > 0) {
              for (const rowValue of row.value) {
                item.value.push({
                  beginDate: rowValue.beginDate,
                  endDate: rowValue.endDate,
                  ganttBarConfig: {
                    id: rowValue.id,
                    label: rowValue.label,
                    style: {
                      fontSize: '12px',
                      background: this.options.chartColors[index % 12],
                      borderRadius: '20px'
                    }
                  }
                })
              }
            }
            list.push(item)
          }
        }
        return list
      } else {
        return this.options.defaultData
      }
    }
  },
  mounted() {},
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    getFormatTime(date: any, format: string) {
      return dayjs(date).format(format)
    }
  }
}
</script>
<style lang=""></style>
