<template>
  <div>
    <a-select @change="selectChangeValue" :value="options[valueKey].join(',')" placeholder="请选择">
      <a-select-option v-for="(item, key) in chartsColorThemeList" :value="item.type">
        <span style="float: left">{{ item.name }}</span>
        <img
          :src="getAssetsFile('color/'+ item.name + '.png')"
          style="float: right; width: 80px; height: 30px"
        />
      </a-select-option>
    </a-select>
    <div v-show="showColorSelect">
      <ColorConfig
        :color="options[props.valueKey][0]"
        @changeColor="changeConfigValue($event, 0)"
        :options="options"
      />
      <ColorConfig
        :color="options[valueKey][1]"
        @changeColor="changeConfigValue($event, 1)"
        :options="options"
      />
      <ColorConfig
        :color="options[valueKey][2]"
        @changeColor="changeConfigValue($event, 2)"
        :options="options"
      />
      <ColorConfig
        :color="options[valueKey][3]"
        @changeColor="changeConfigValue($event, 3)"
        :options="options"
      />
      <ColorConfig
        :color="options[valueKey][4]"
        @changeColor="changeConfigValue($event, 4)"
        :options="options"
      />
      <ColorConfig
        :color="options[valueKey][5]"
        @changeColor="changeConfigValue($event, 5)"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import { chartsThemeList } from '@/utils/charts-utils/charts-theme'
import { getAssetsFile } from '@/utils/pub-use'
import ColorConfig from './color-config.vue'

const props = defineProps<{
  options: any
  valueKey: string
}>()

const showColorSelect = ref(false)
const chartsColorThemeList = ref(chartsThemeList)

onMounted(() => {
  if (props.options.isCustomChartColor) {
    chartsColorThemeList.value[0].type = props.options[props.valueKey].join(',')
    showColorSelect.value = true
  } else {
    showColorSelect.value = false
  }
})

onUpdated(() => {
  if (props.options.isCustomChartColor) {
    chartsColorThemeList.value[0].type = props.options[props.valueKey].join(',')
    showColorSelect.value = true
  } else {
    showColorSelect.value = false
  }
})

function changeConfigValue(color: string, index: number) {
  props.options[props.valueKey].splice(index, 1, color)
}

function selectChangeValue(value: string) {
  if (value === chartsColorThemeList.value[0].type) {
    showColorSelect.value = true
    props.options[props.valueKey] = value.split(',')
    props.options.isCustomChartColor = true
  } else {
    showColorSelect.value = false
    props.options[props.valueKey] = value.split(',')
    props.options.isCustomChartColor = false
  }
}
</script>

<style lang="scss" scoped></style>
