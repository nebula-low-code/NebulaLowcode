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
    <a-date-picker
      style="width: 100%"
      :size="options.size"
      :placeholder="options.placeholder"
      :disabled="options.disabled"
      :allowClear="options.clearable"
      :show-time="options.format === 'datetime'"
      :format="format"
      :picker="options.format === 'year-month' ? 'month' : 'date'"
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
  name: 'nebula-component-date-picker',
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
      let tempValue = ''
      if (this.options.defaultValueType) {
        const day = new Date()
        // getDate表示几号，getDay表示周几
        const today = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
        const monday = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + (day.getDate() - day.getDay() + 1)
        const monthStart = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + '1'
        if (this.options.defaultValueType == 'Today') {
          tempValue = today
        } else if (this.options.defaultValueType == 'Monday') {
          tempValue = monday
        } else if (this.options.defaultValueType == 'MonthStart') {
          tempValue = monthStart
        }
      } else {
        tempValue = this.options.value
      }

      return tempValue.length > 0 ? dayjs(tempValue) : null
    },
    defaultValue() {
      let val = getComponentEchoValue(this.options, this.options.value)
      if (val) {
        return val.length > 0 ? dayjs(val) : null
      }
      return this.options.value.length > 0 ? dayjs(this.options.value) : null
    },
    format() {
      let formatType = this.options.format
      if (!this.options.format) {
        formatType = 'date'
      }
      let format = 'YYYY-MM-DD'
      if (formatType === 'date') {
        format = 'YYYY-MM-DD'
      } else if (formatType === 'year-month') {
        format = 'YYYY-MM'
      } else if (formatType === 'datetime') {
        format = 'YYYY-MM-DD HH:mm:ss'
      }

      return format
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
