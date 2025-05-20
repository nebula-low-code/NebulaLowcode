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
    <a-time-picker
      style="width: 100%"
      :size="options.size"
      :placeholder="options.placeholder"
      :disabled="options.disabled"
      :allowClear="options.clearable"
      :style="disableStyle"
      :defaultPickerValue="defaultValue"
      :value="value"
      :format="options.format"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import dayjs from 'dayjs'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { getComponentEchoValue } from '@/utils/component-value'

export default {
  name: 'nebula-component-time-picker',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
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
      return this.options.value.length > 0 ? dayjs(this.options.value, this.options.format) : null
    },
    defaultValue() {
      let val = getComponentEchoValue(this.options, this.options.value)
      if (val) {
        return val.length > 0 ? dayjs(val, this.options.format) : null
      }
      return this.options.value.length > 0 ? dayjs(this.options.value, this.options.format) : null
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    onChange(time: any, timeString: string) {
      this.options.value = timeString
    }
  }
}
</script>

<style lang="scss" scoped></style>
