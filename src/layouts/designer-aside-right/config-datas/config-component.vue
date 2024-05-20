<template>
  <div>
    <div>
      <PcConfigText v-if="type === 'van-design-text'" />
      <PcConfigInput v-else-if="type === 'van-design-field'" />
      <PcConfigMultiInput v-else-if="type === 'van-design-multi-input'" />
      <PcConfigTable v-else-if="type === 'van-design-table'" />
      <PcConfigSelect v-else-if="type === 'van-design-select'" />
      <PcConfigDatePicker v-else-if="type === 'van-design-calendar'" />
      <PcConfigTimePicker v-else-if="type === 'van-design-datetime-picker'" />
      <PcConfigList v-else-if="type === 'van-design-list'" />
      <PcConfigImage v-else-if="type === 'van-design-image'" />
      <PcConfigRadio v-else-if="type === 'van-design-radio'" />
      <PcConfigCheckbox v-else-if="type === 'van-design-checkbox'" />
      <PcConfigSwitch v-else-if="type === 'van-design-switch'" />
      <PcConfigSlider v-else-if="type === 'van-design-slider'" />
      <PcConfigTreeSelect v-else-if="type === 'van-design-tree-select'" />
      <PcConfigRichText v-else-if="type === 'van-design-editor'" />
      <PcConfigLineChart v-else-if="type === 'van-design-chart-line'" />
      <PcConfigHistogramChart v-else-if="type === 'van-design-chart-histogram'" />
      <PcConfigBarChart v-else-if="type === 'van-design-chart-bar'" />
      <PcConfigPieChart v-else-if="type === 'van-design-chart-pie'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'

import PcConfigText from '@/components/design-pc/configs/others/text/config-data/index.vue'
import PcConfigInput from '@/components/design-pc/configs/inputs/input/config-data/index.vue'
import PcConfigMultiInput from '@/components/design-pc/configs/inputs/multi-input/config-data/index.vue'
import PcConfigSelect from '@/components/design-pc/configs/inputs/select/config-data/index.vue'
import PcConfigDatePicker from '@/components/design-pc/configs/inputs/date-picker/config-data/index.vue'
import PcConfigTimePicker from '@/components/design-pc/configs/inputs/time-picker/config-data/index.vue'
import PcConfigImage from '@/components/design-pc/configs/others/image/config-data/index.vue'
import PcConfigCheckbox from '@/components/design-pc/configs/inputs/checkbox/config-data/index.vue'
import PcConfigRadio from '@/components/design-pc/configs/inputs/radio/config-data/index.vue'
import PcConfigSwitch from '@/components/design-pc/configs/inputs/switch/config-data/index.vue'
import PcConfigSlider from '@/components/design-pc/configs/inputs/slider/config-data/index.vue'
import PcConfigTreeSelect from '@/components/design-pc/configs/inputs/tree-select/config-data/index.vue'
import PcConfigRichText from '@/components/design-pc/configs/inputs/rich-text/config-data/index.vue'
import PcConfigList from '@/components/design-pc/configs/charts/list/config-data/index.vue'
import PcConfigTable from '@/components/design-pc/configs/charts/table/config-data/index.vue'
import PcConfigLineChart from '@/components/design-pc/configs/charts/line-chart/config-data/index.vue'
import PcConfigHistogramChart from '@/components/design-pc/configs/charts/histogram-chart/config-data/index.vue'
import PcConfigBarChart from '@/components/design-pc/configs/charts/bar-chart/config-data/index.vue'
import PcConfigPieChart from '@/components/design-pc/configs/charts/pie-chart/config-data/index.vue'

const store = useDataStore()
const route = useRoute()
const deviceType = route.params.device

const type = computed(() => store.currentCheckedComponent.type)
</script>

<style scoped></style>
