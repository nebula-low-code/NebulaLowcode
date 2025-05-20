<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        fontSize: themeConfig.token.fontSize + 'px',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        display: options.labelShow ? '' : 'none',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : options.size == 'small' ? '24px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <a-range-picker
      style="width: 100%"
      :size="options.size"
      :disabled="options.disabled"
      :allowClear="options.clearable"
      :placeholder="[options.startPlaceholder, options.endPlaceholder]"
      :picker="options.format"
      :style="disableStyle"
      :disabledDate="disabledDate"
      :defaultPickerValue="defaultValue"
      :value="value"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import dayjs from 'dayjs'
import { mapActions, mapState } from 'pinia'
import { useThemeStore } from '@/stores'
import { useDataStore } from '@/stores'
import { getComponentEchoValue } from '@/utils/component-value'

export default {
  name: 'nebula-component-date-range',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    ...mapState(useThemeStore, ['themeConfig']),
    disableStyle() {
      if (this.options.disabled) {
        return {
          pointerEvents: 'none'
        }
      }
      return {}
    },
    flexStyle() {
      if (this.options.labelAlign != 'top') {
        return {
          display: 'flex'
        }
      }
      return {}
    },
    value() {
      const optionsValue = this.options.value
      if (optionsValue && optionsValue.length === 2 && optionsValue[0] && optionsValue[1]) {
        return [dayjs(optionsValue[0]), dayjs(optionsValue[1])]
      } else {
        return null
      }
    },
    defaultValue() {
      let val = getComponentEchoValue(this.options, this.options.value)
      if (val) {
        return val.length > 0 ? [dayjs(val[0]), dayjs(val[1])] : null
      }
      return this.options.value && this.options.value.length > 0 ? [dayjs(this.options.value[0]), dayjs(this.options.value[1])] : null
    }
  },
  mounted() {
    const day = new Date()
    // getDate表示几号，getDay表示周几
    const today = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
    const monday = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + (day.getDate() - day.getDay() + 1)
    const monthStart = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + '1'
    if (this.options.defaultValueType == 'Today') {
      this.options.value = today
    } else if (this.options.defaultValueType == 'Monday') {
      this.options.value = monday
    } else if (this.options.defaultValueType == 'MonthStart') {
      this.options.value = monthStart
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    disabledDate(current: any) {
      if (this.options.forbidRange === 'before') {
        return current && current < dayjs().endOf('day')
      } else if (this.options.forbidRange === 'after') {
        return current && current > dayjs().endOf('day')
      } else {
        return false
      }
    },
    onChange(time: any, timeString: string) {
      this.options.value = timeString
    }
  }
}
</script>

<style lang="scss" scoped></style>
