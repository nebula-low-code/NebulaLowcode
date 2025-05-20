<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        fontSize: themeConfig.token.fontSize + 'px',
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        display: options.labelShow ? '' : 'none',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <div style="flex: 1; min-width: 0" v-if="options.contentDataSource === 'radio-button-default'">
      <a-select
        allow-clear
        v-model:value="options.value"
        :size="options.size"
        :mode="options.mode"
        :placeholder="options.placeholder"
        style="width: 100%"
        :style="disableStyle"
        :disabled="options.disabled"
        :dropdownStyle="dropdownStyle"
        @change="onSelect"
      >
        <a-select-option :value="item.value" :label="item.label" v-for="(item, key) in options.defaultTableData" :key="key">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <div style="flex: 1; min-width: 0" v-else-if="options.contentDataSource === 'radio-button-dictionary'">
      <a-select
        allow-clear
        v-model:value="options.value"
        :size="options.size"
        :mode="options.mode"
        :placeholder="options.placeholder"
        style="width: 100%"
        :style="disableStyle"
        :disabled="options.disabled"
        :dropdownStyle="dropdownStyle"
        @change="onSelect"
      >
        <a-select-option :value="item.entryCode" :label="item.entryName" v-for="(item, key) in extraData.dicData" :key="key">
          {{ item.entryName }}
        </a-select-option>
      </a-select>
    </div>
    <div style="flex: 1; min-width: 0" v-else>
      <a-select
        allow-clear
        v-model:value="options.value"
        :size="options.size"
        :mode="options.mode"
        :placeholder="options.placeholder"
        style="width: 100%"
        :style="disableStyle"
        :disabled="options.disabled"
        :dropdownStyle="dropdownStyle"
        @change="onSelect"
      >
        <a-select-option :value="item[options.valueKey]" :label="item[options.labelKey]" v-for="(item, key) in selectData" :key="key">
          {{ item[options.labelKey] }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions, mapState } from 'pinia'
import { useThemeStore } from '@/stores'
import { useDataStore } from '@/stores'
export default {
  type: 'nebula-component-select',
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
    selectData() {
      let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
      if (interfaceData) {
        let resp = interfaceData.data.responseData
        if (resp) {
          return resp[this.options.interfaceDataConfig.key]
        }
      }

      return []
    },
    dropdownStyle() {
      if (this.options.dropdownWidth && this.options.dropdownWidth > 0) {
        return {
          minWidth: this.options.dropdownWidth + 'px'
        }
      }
      return {}
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById']),
    onSelect(selectedKeys: any, selectedLabels: any) {
      if (selectedLabels) {
        if (Array.isArray(selectedLabels)) {
          let labels = []
          selectedLabels.forEach((labelItem) => {
            labels.push(labelItem.label)
          })
          this.options.outputLabel = labels
        } else {
          this.options.outputLabel = selectedLabels.label
        }
      } else {
        this.options.outputLabel = undefined
      }
      console.log('--onSelect---', selectedKeys, selectedLabels, this.options)
    }
  }
}
</script>
<style lang=""></style>
