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
      <a-checkbox-group
        v-if="options.contentDataSource === 'radio-button-dictionary'"
        style="vertical-align: middle"
        v-model:value="options.value"
        :defaultValue="options.defaultValue"
        :icon-size="16"
        :disabled="options.disabled"
      >
        <a-checkbox shape="square" :name="item.entryName" :value="item.entryCode" v-for="(item, key) in extraData.dicData" :key="item.value">
          {{ item.entryName }}
        </a-checkbox>
      </a-checkbox-group>
      <a-checkbox-group v-else style="vertical-align: middle" v-model:value="options.value" :defaultValue="options.defaultValue" :icon-size="16" :disabled="options.disabled">
        <a-checkbox shape="square" :name="item.label" :value="item.value" v-for="(item, key) in checkOptions" :key="item.value">
          {{ item.label }}
        </a-checkbox>
      </a-checkbox-group>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-checkbox',
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
    checkOptions() {
      let check = this.options.defaultTableData as any[]
      if (this.options.interfaceDataConfig.uuid && this.options.interfaceDataConfig.uuid.length > 0) {
        check = []

        let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            let respData = resp[this.options.interfaceDataConfig.key]
            if (respData && Array.isArray(respData)) {
              for (const item of respData) {
                check.push({
                  label: item[this.options.labelKey],
                  value: item[this.options.valueKey]
                })
              }
            }
          }
        }
      }
      return check
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style scoped>
:deep(.ant-checkbox-group label) {
  display: inline-flex;
}
</style>
