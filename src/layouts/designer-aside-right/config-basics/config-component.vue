<template>
  <div>
    <div>
      <PcConfigLayout v-if="type === 'van-design-layout'" />
      <PcConfigText v-else-if="type === 'van-design-text'" />
      <PcConfigInput v-else-if="type === 'van-design-field'" />
      <PcConfigMultiInput v-else-if="type === 'van-design-multi-input'" />
      <PcConfigDatePicker v-else-if="type === 'van-design-calendar'" />
      <PcConfigTimePicker v-else-if="type === 'van-design-datetime-picker'" />
      <PcConfigButton v-else-if="type === 'van-design-button'" />
      <PcCOnfigSelect v-else-if="type === 'van-design-select'" />
      <PcConfigIcon v-else-if="type === 'van-design-icon'" />
      <PcConfigImage v-else-if="type === 'van-design-image'" />
      <PcConfigRadio v-else-if="type === 'van-design-radio'" />
      <PcConfigCheckbox v-else-if="type === 'van-design-checkbox'" />
      <PcConfigTreeSelect v-else-if="type === 'van-design-tree-select'" />
      <PcConfigSlider v-else-if="type === 'van-design-slider'" />
      <PcConfigSwitch v-else-if="type === 'van-design-switch'" />
      <PcConfigRichText v-else-if="type === 'van-design-editor'" />
      <PcConfigList v-else-if="type === 'van-design-list'" />
      <PcConfigLineChart v-else-if="type === 'van-design-chart-line'" />
      <PcConfigHistogramChart v-else-if="type === 'van-design-chart-histogram'" />
      <PcConfigBarChart v-else-if="type === 'van-design-chart-bar'" />
      <PcConfigPieChart v-else-if="type === 'van-design-chart-pie'" />
      <PcConfigTable v-else-if="type === 'van-design-table'" />
      <PcConfigDivider v-else-if="type === 'van-design-divider'" />
      <PcConfigCollapse v-else-if="type === 'van-design-collapse'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'

import PcConfigLayout from '@/components/design-pc/configs/layouts/layout/config-attribute/index.vue'
import PcConfigText from '@/components/design-pc/configs/others/text/config-attribute/index.vue'
import PcConfigIcon from '@/components/design-pc/configs/others/icon/config-attribute/index.vue'
import PcConfigButton from '@/components/design-pc/configs/others/button/config-attribute/index.vue'
import PcConfigInput from '@/components/design-pc/configs/inputs/input/config-attribute/index.vue'
import PcConfigMultiInput from '@/components/design-pc/configs/inputs/multi-input/config-attribute/index.vue'
import PcCOnfigSelect from '@/components/design-pc/configs/inputs/select/config-attribute/index.vue'
import PcConfigDatePicker from '@/components/design-pc/configs/inputs/date-picker/config-attribute/index.vue'
import PcConfigTimePicker from '@/components/design-pc/configs/inputs/time-picker/config-attribute/index.vue'
import PcConfigImage from '@/components/design-pc/configs/others/image/config-attribute/index.vue'
import PcConfigCheckbox from '@/components/design-pc/configs/inputs/checkbox/config-attribute/index.vue'
import PcConfigRadio from '@/components/design-pc/configs/inputs/radio/config-attribute/index.vue'
import PcConfigTreeSelect from '@/components/design-pc/configs/inputs/tree-select/config-attribute/index.vue'
import PcConfigSlider from '@/components/design-pc/configs/inputs/slider/config-attribute/index.vue'
import PcConfigSwitch from '@/components/design-pc/configs/inputs/switch/config-attribute/index.vue'
import PcConfigRichText from '@/components/design-pc/configs/inputs/rich-text/config-attribute/index.vue'
import PcConfigList from '@/components/design-pc/configs/charts/list/config-attribute/index.vue'
import PcConfigLineChart from '@/components/design-pc/configs/charts/line-chart/config-attribute/index.vue'
import PcConfigHistogramChart from '@/components/design-pc/configs/charts/histogram-chart/config-attribute/index.vue'
import PcConfigBarChart from '@/components/design-pc/configs/charts/bar-chart/config-attribute/index.vue'
import PcConfigPieChart from '@/components/design-pc/configs/charts/pie-chart/config-attribute/index.vue'
import PcConfigTable from '@/components/design-pc/configs/charts/table/config-attribute/index.vue'
import PcConfigDivider from '@/components/design-pc/configs/others/divider/config-attribute/index.vue'
import PcConfigCollapse from '@/components/design-pc/configs/others/collapse/config-attribute/index.vue'

const store = useDataStore()
const route = useRoute()
let deviceType = route.params.device
let type = computed(() => store.currentCheckedComponent.type)
</script>

<style scoped></style>
