<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        display: options.labelShow ? '' : 'none',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
      }"
    >
      {{ options.label }}
    </label>
    <div style="flex: 1">
      <a-radio-group v-if="options.contentDataSource === 'radio-button-dictionary'" style="vertical-align: middle" v-model:value="options.value" :icon-size="16" :disabled="options.disabled">
        <a-radio shape="square" :value="item.entryCode" v-for="(item, key) in extraData.dicData" :key="item.entryCode">
          {{ item.entryName }}
        </a-radio>
      </a-radio-group>
      <a-radio-group v-else style="vertical-align: middle" v-model:value="options.value" :icon-size="16" :disabled="options.disabled">
        <a-radio shape="square" :value="item.value" v-for="(item, key) in radioOptions" :key="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
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
  mounted() {},
  computed: {
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
