<template>
  <div style="height: 100%; overflow: auto; scrollbar-color: #c1c1c1 transparent">
    <a-tree
      v-if="optionsData.length"
      style="width: 100%"
      :multiple="options.multiple"
      :default-expand-all="options.expandAll"
      :tree-data="optionsData"
      :placeholder="options.placeholder"
      :size="options.size"
      :disabled="options.disabled"
      :field-names="{ title: options.setOptions.name, key: options.setOptions.value, children: options.setOptions.childrenId }"
    />
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { transformDataListToCascade } from '@/utils/transform-data-list'
export default {
  type: 'nebula-component-tree',
  components: {},
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    optionsData() {
      let options = this.options
      let data = options.defaultTableData as any[]
      if (options.interfaceDataConfig.uuid && options.interfaceDataConfig.uuid.length > 0) {
        data = []
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
      }
      return data
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style scoped></style>
