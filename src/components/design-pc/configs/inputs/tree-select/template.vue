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
    <div style="flex: 1">
      <a-tree-select
        style="width: 100%"
        :multiple="options.multiple"
        :tree-data="optionsData"
        :placeholder="options.placeholder"
        :size="options.size"
        :allowClear="options.clearable"
        :disabled="options.disabled"
        :field-names="{ label: options.setOptions.name, value: options.setOptions.value, children: options.setOptions.childrenId }"
      />
    </div>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { transformDataListToCascade } from '@/utils/transform-data-list'
export default {
  type: 'nebula-component-tree-select',
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
    optionsData() {
      let data = []
      let options = this.options
      let id = options.interfaceDataConfig.uuid || options.interfaceDataConfig.id
      if (id && id.length > 0) {
        let interfaceData = this.interfaceDataById(id)
        if (interfaceData) {
          let result = interfaceData.data.responseData
          if (result) {
            let respData = result[options.interfaceDataConfig.key]
            let setOptions = options.setOptions
            if (options.dataFormat === '树形数据') {
              if (setOptions.value && setOptions.name && setOptions.childrenId) {
                data = respData
              }
            } else {
              if (setOptions.value && setOptions.name && setOptions.id && setOptions.parentId) {
                data = transformDataListToCascade(respData, setOptions)
              }
            }
          }
        }
      }
      return data
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style lang=""></style>
