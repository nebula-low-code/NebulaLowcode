<template>
  <div>
    数据透视表
    <pivot-table :data="tableData" :row-fields="rowFields" :col-fields="colFields" :reducer="reducer" :default-show-settings="true" :is-data-loading="false">
      <template v-slot:value="{ value }">
        {{ value | number }}
      </template>
      <template v-slot:loading>
        <div class="text-center">Loading...</div>
      </template>
      <template v-slot:computing>
        <div class="position-absolute w-100 h-100 text-center" style="z-index: 1">
          <div class="position-sticky bg-white d-inline-block mt-5 p-3" style="top: 0">Loading table values...</div>
        </div>
      </template>
    </pivot-table>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'
import draggable from 'vuedraggable'
import PivotTable from './components/PivotTable.vue'
export default {
  type: 'nebula-component-pivot-table',
  components: {
    DynamicComponent,
    draggable,
    PivotTable
  },
  data() {
    return {
      options: optionsConfig,
      colFields: [],
      tableRowFields: [],
      defaultShowSettings: true,
      isDataLoading: false
    }
  },
  created() {
    // this.handleColFields()
    // this.handleRowFields()
    console.log('-----------options', this.options)
    this.options.tableRowFields = [
      {
        getter: (item) => item.country,
        label: 'Country'
      },
      {
        getter: (item) => item.gender,
        label: 'Gender'
      }
    ]
    this.options.colFields = [
      {
        getter: (item) => item.year,
        label: 'Year'
      }
    ]
  },
  computed: {
    ...mapState(useDataStore, ['componentListMap']),
    tableData() {
      let interfaceTableData: any = []

      if (this.options.interfaceDataConfig.uuid) {
        let resp = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        interfaceTableData = []

        if (resp && resp.data.responseData) {
          interfaceTableData = resp.data.responseData[this.options.interfaceDataConfig.key]
          console.log('resp', resp, interfaceTableData)
        }
      } else {
        interfaceTableData = this.options.defaultTableData
      }
      const totalByDateAndMan = {}
      console.log('interfaceTableData', interfaceTableData)

      if (interfaceTableData && this.options.sum) {
        // 处理小计 -未完成，原因是行列转换后，0怎么处理合计，如果都有值，那是没问题的，但是小计的计算方式需要调整，否则小计会重复计算，导致结果不正确。
        // 2024-12-8
        interfaceTableData &&
          interfaceTableData.forEach((item) => {
            // 使用 colSelectKey 和 rowSelectKey 作为复合键
            const dateKey = item[this.options.colSelectKey[0]]
            const manKey = item[this.options.rowSelectKey[0]]
            const subKey = `${dateKey}-${manKey}` // 创建一个复合键
            const value = parseInt(item[this.options.valSelectKey[0]], 10) || 0
            // 如果该复合键已存在于合计对象中，则累加其值；否则初始化为该值
            if (totalByDateAndMan[subKey]) {
              totalByDateAndMan[subKey] += value
            } else {
              totalByDateAndMan[subKey] = value
            }
          })
        // 将合计结果转换成与原始数据相同的格式
        const totalSubData = Object.keys(totalByDateAndMan).map((subKey) => {
          const [date, man] = subKey.split('-') // 分解复合键
          return {
            [this.options.colSelectKey[0]]: date,
            [this.options.rowSelectKey[0]]: man,
            [this.options.rowSelectKey[1]]: '合计',
            [this.options.valSelectKey[0]]: totalByDateAndMan[subKey] // 动态设置 sale_price
          }
        })

        // 输出每个日期和每个销售员的合计
        console.log('totalSubData', totalByDateAndMan, totalSubData)

        // interfaceTableData.push(...totalSubData)

        // 初始化一个空对象来存储每个日期的合计
        const totalByDate = {}

        // 聚合数据
        interfaceTableData.forEach((item) => {
          // 使用 colSelectKey 作为键，这里假设 sale_price 字段存在
          const dateKey = item[this.options.colSelectKey[0]]
          const value = parseInt(item[this.options.valSelectKey[0]], 10) // 假设 sale_price 字段是数值类型

          // 如果该日期已存在于合计对象中，则累加其值；否则初始化为该值
          if (totalByDate[dateKey]) {
            totalByDate[dateKey] += value
          } else {
            totalByDate[dateKey] = value
          }
        })

        // 将合计结果转换成与原始数据相同的格式
        const totalData = Object.keys(totalByDate).map((date) => {
          return {
            [this.options.colSelectKey[0]]: date,
            [this.options.rowSelectKey[0]]: '合计', // 动态设置 sale_man
            [this.options.valSelectKey[0]]: totalByDate[date] // 动态设置 sale_price
          }
        })

        // 输出每个日期的合计
        console.log('totalData', totalData)

        interfaceTableData.push(...totalData)
      }

      return interfaceTableData
    },
    colFields() {
      let temp = []
      if (this.options.colSelectKey && this.options.colSelectKey.length > 0) {
        let colSelectKey = this.options.colSelectKey
        colSelectKey &&
          colSelectKey.forEach((colKey) => {
            temp.push({
              getter: (item) => item[colKey],
              label: colKey
            })
          })
      } else {
        temp = [
          {
            getter: (item) => item.year,
            label: 'Year'
          }
        ]
      }
      return temp
    },
    rowFields() {
      let temp = []
      if (this.options.rowSelectKey && this.options.rowSelectKey.length > 0) {
        let rowSelectKey = this.options.rowSelectKey
        rowSelectKey &&
          rowSelectKey.forEach((rowKey) => {
            temp.push({
              getter: (item) => item[rowKey],
              label: rowKey
            })
          })
      } else {
        temp = [
          {
            getter: (item) => item.country,
            label: 'Country'
          },
          {
            getter: (item) => item.gender,
            label: 'Gender'
          }
        ]
      }
      return temp;
    },
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    reducer (acc, item) {
        if(this.options.valSelectKey&&this.options.valSelectKey.length>0){
            let vKey = this.options.valSelectKey[0]
            return acc + item[vKey]
        }

        return acc + item.count;
    },
    handleColFields() {
      this.options.colFields = []
      let colSelectKey = this.options.colSelectKey
      colSelectKey &&
        colSelectKey.forEach((colKey) => {
          this.options.colFields.push({
            getter: (item) => item[colKey],
            label: colKey
          })
        })
    },
    handleRowFields() {
      this.options.tableRowFields = []
      let rowSelectKey = this.options.rowSelectKey
      rowSelectKey &&
        rowSelectKey.forEach((rowKey) => {
          this.options.tableRowFields.push({
            getter: (item) => item[rowKey],
            label: rowKey
          })
        })
    }
  }
}
</script>
<style lang=""></style>
