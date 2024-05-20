<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        display: options.labelShow ? '' : 'none',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : options.size == 'small' ? '24px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <a-date-picker
      :size="options.size"
      :placeholder="options.placeholder"
      :disabled="options.disabled"
      :allowClear="options.clearable"
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
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'

export default {
  name: 'nebula-component-date-picker',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
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
      if (this.options.interfaceDataEchoConfig.uuid && this.options.interfaceDataEchoConfig.uuid.length > 0) {
        let interfaceData = this.interfaceDataById(this.options.interfaceDataEchoConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            let resValue = resp[this.options.interfaceDataEchoConfig.key]
            this.options.value = resValue
            return resValue.length > 0 ? dayjs(resValue) : null
          }
        }
      }
      return this.options.value.length > 0 ? dayjs(this.options.value) : null
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
