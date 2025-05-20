<template>
  <div class="text-config">
    <a-config-provider :locale="zhCN">
      <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
        <a-form-item label="开始时间">
          <a-date-picker :value="startDate" show-time placeholder="选择开始时间" @ok="onSelectStartDate" />
        </a-form-item>
        <a-form-item label="结束时间">
          <a-date-picker :value="endDate" show-time placeholder="选择结束时间" @ok="onSelectEndDate" />
        </a-form-item>
      </a-form>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ChartsColor from '@/components/common-attribute-config/select-color-charts.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import ChartsOffset from '@/components/common-attribute-config/grid-offset-charts.vue'
import XAxisConfig from '@/components/common-attribute-config/xaxis-config.vue'
import YAxisConfig from '@/components/common-attribute-config/yaxis-config.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn' // 当时不加日期内部的年月没有汉化
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

const startDate = computed(() => {
  return options.value.chartStartDate.length > 0 ? dayjs(options.value.chartStartDate) : null
})

const endDate = computed(() => {
  return options.value.chartEndDate.length > 0 ? dayjs(options.value.chartEndDate) : null
})

function onSelectStartDate(value: Dayjs) {
  options.value.chartStartDate = dayjs(value).format('YYYY-MM-DD HH:MM')
}
function onSelectEndDate(value: Dayjs) {
  options.value.chartEndDate = dayjs(value).format('YYYY-MM-DD HH:MM')
}
</script>

<style scoped></style>
