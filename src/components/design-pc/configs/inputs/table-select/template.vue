<template>
  <div class="custom_component_label" :style="flexStyle">
    <label
      :class="options.required ? 'required' : ''"
      :style="{
        width: options.labelAlign == 'top' ? '100%' : options.width + 'px',
        display: options.labelShow ? '' : 'none',
        textAlign: options.labelAlign == 'top' ? 'left' : options.labelAlign as 'left' | 'center' | 'right',
        lineHeight: options.size == 'large' ? '40px' : '32px'
      }"
    >
      {{ options.label }}
    </label>
    <a-dropdown :trigger="['click']">
      <div style="flex: 1; min-width: 0">
        <a-select style="width: 100%" v-model:value="options.value" :style="disableStyle" :disabled="options.disabled" :size="options.size" :placeholder="options.placeholder" :notFoundContent="null">
        </a-select>
      </div>

      <template #overlay>
        <div class="table-container">
          <div class="left-container">
            <a-input placeholder="搜索代码或名称"> </a-input>
            <a-table style="margin-top: 8px" :scroll="{ y: 300 }" :row-selection="{ type: isMultiple ? 'checkbox' : 'radio' }" :dataSource="selectData" :columns="tableColumns" />
          </div>
          <div v-if="isMultiple" class="right-container">
            <div style="padding: 8px">已选0项</div>
          </div>
        </div>
      </template>
    </a-dropdown>
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
  computed: {
    isMultiple() {
      return this.options.mode === 'multiple'
    },
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
      if (this.options.contentDataSource === 'radio-button-default') {
        return this.options.defaultTableData
      } else if (this.options.contentDataSource === 'radio-button-dictionary') {
        return this.extraData.dicData.map((item: any) => {
          return {
            label: item.entryName,
            value: item.entryCode,
            key: item.entryCode
          }
        })
      } else {
        let interfaceData = this.interfaceDataById(this.options.interfaceDataConfig.uuid)
        if (interfaceData) {
          let resp = interfaceData.data.responseData
          if (resp) {
            return resp[this.options.interfaceDataConfig.key].map((item: any) => {
              return {
                label: item[this.options.labelKey],
                value: item[this.options.valueKey],
                key: item[this.options.valueKey]
              }
            })
          }
        }
        return []
      }
    },
    tableColumns() {
      return [
        {
          title: '代码',
          dataIndex: 'value',
          width: 100
        },
        {
          title: '名称',
          dataIndex: 'label',
          width: 200
        }
      ]
    }
  },
  methods: {
    ...mapActions(useDataStore, ['interfaceDataById'])
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  background-color: white;
  min-width: 300px;
  max-width: 800px;
  padding: 8px;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
}

.left-container {
  flex: 2;
}

.right-container {
  margin-left: 8px;
  border: 1px solid #d9d9d9;
  flex: 1;
}
</style>
