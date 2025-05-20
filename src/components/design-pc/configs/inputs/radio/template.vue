<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        fontSize: themeConfig.token.fontSize + 'px',
        display: options.labelShow ? '' : 'none',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
      }"
    >
      {{ options.label }}
    </label>
    <div style="flex: 1">
      <a-radio-group v-if="options.contentDataSource === 'radio-button-dictionary'" :size="options.size" style="vertical-align: middle" v-model:value="options.value" :disabled="options.disabled">
        <template v-for="(item, key) in extraData.dicData" :key="item.entryCode">
          <a-radio-button v-if="options.radioStyleType === 'button'" style="padding: 0 12px" :value="item.entryCode">
            {{ item.entryName }}
          </a-radio-button>
          <a-radio v-else :value="item.entryCode">
            {{ item.entryName }}
          </a-radio>
        </template>
      </a-radio-group>
      <a-radio-group v-else :size="options.size" style="vertical-align: middle" v-model:value="options.value" :disabled="options.disabled">
        <template v-for="(item, key) in radioOptions" :key="item.value">
          <a-radio-button style="padding: 0 12px" v-if="options.radioStyleType === 'button'" :value="item.value"> {{ item.label }} </a-radio-button>
          <a-radio v-else :value="item.value">
            {{ item.label }}
          </a-radio>
        </template>
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions, mapState } from 'pinia'
import { useThemeStore } from '@/stores'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-radio',
  components: {},
  data() {
    return {
      options: optionsConfig,
      extraData: {
        dicData: null as any
      }
    }
  },
  computed: {
    ...mapState(useThemeStore, ['themeConfig']),
    flexStyle() {
      if (this.options.labelAlign != 'top') {
        return {
          display: 'flex'
        }
      }
      return {}
    },
    radioOptions() {
      let radio = this.options.defaultTableData as any[]
      if (this.options.interfaceDataConfig.uuid && this.options.interfaceDataConfig.uuid.length > 0) {
        radio = []
        let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            let respData = resp[this.options.interfaceDataConfig.key]
            if (respData && Array.isArray(respData)) {
              for (const item of respData) {
                radio.push({
                  label: item[this.options.labelKey],
                  value: item[this.options.valueKey]
                })
              }
            }
          }
        }
      }
      return radio
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style scoped>
:deep(.ant-radio-wrapper) {
  display: inline-flex;
}
</style>
