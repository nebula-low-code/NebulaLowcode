<template>
  <div class="layout-template-page">
    <a-tabs v-model:activeKey="options.value" :type="options.type" :tabPosition="options.tabPosition">
      <template v-if="tableData && tableData.length > 0">
        <a-tab-pane :tab="col[options.labelKey]" v-for="(col, colIndex) in tableData" :key="col[options.valueKey]"> </a-tab-pane>
      </template>
      <template v-else>
        <a-tab-pane :tab="col.value" v-for="(col, colIndex) in options.columns" :key="colIndex"> </a-tab-pane>
      </template>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'
import { isNetworkDatasource } from '@/utils/string-utils'
export default {
  type: 'nebula-component-dynamic-tabs',
  components: {
    DynamicComponent
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    tableData() {
      let value = new Array()
      if (isNetworkDatasource(this.options.contentDataSource)) {
        let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            value = resp[this.options.interfaceDataConfig.key]
          }
        }
      }
      return value
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style lang=""></style>
