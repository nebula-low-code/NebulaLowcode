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
    <div style="flex: 1" v-if="options.contentDataSource === 'radio-button-default'">
      <a-select allow-clear v-model:value="options.value" :size="options.size" :mode="options.mode" :placeholder="options.placeholder" style="width: 100%" :disabled="options.disabled">
        <a-select-option :value="item.value" v-for="(item, key) in options.defaultTableData" :key="key">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <div style="flex: 1" v-else-if="options.contentDataSource === 'radio-button-dictionary'">
      <a-select allow-clear v-model:value="options.value" :size="options.size" :mode="options.mode" :placeholder="options.placeholder" style="width: 100%" :disabled="options.disabled">
        <a-select-option :value="item.entryCode" v-for="(item, key) in extraData.dicData" :key="key">
          {{ item.entryName }}
        </a-select-option>
      </a-select>
    </div>
    <div style="flex: 1" v-else>
      <a-select allow-clear v-model:value="options.value" :size="options.size" :mode="options.mode" :placeholder="options.placeholder" style="width: 100%" :disabled="options.disabled">
        <a-select-option :value="item[options.valueKey]" v-for="(item, key) in selectData" :key="key">
          {{ item[options.labelKey] }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
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
    selectData() {
      let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
      if (interfaceData) {
        let resp = interfaceData.data.responseData
        if (resp) {
          return resp[this.options.interfaceDataConfig.key]
        }
      }

      return []
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style lang=""></style>
