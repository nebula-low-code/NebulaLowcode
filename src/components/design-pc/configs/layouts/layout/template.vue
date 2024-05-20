<template>
  <div :style="pageStyle">
    <a-row
      type="flex"
      :justify="options.justify"
      :align="options.align"
      :gutter="options.gutter"
      :style="{
        display: 'flex',
        alignItems: options.labelVerticalAlign
      }"
    >
      <a-col
        :span="col.value"
        v-for="(col, colIndex) in options.columns"
        :key="colIndex"
        :style="{
          border: col.componentList.length ? '' : '1px dashed #ccc',
          textAlign: options.labelAlign
        }"
        class="layout-col"
      >
        <draggable
          :style="{
            backgroundColor: col.componentList.length ? '' : '#f2f3f5',
            minHeight: options.layoutHeight + layoutUnit
          }"
          class="draggable"
          v-bind="{
            group: 'component',
            ghostClass: 'ghost',
            animation: 200,
            handle: '.drag-handle'
          }"
          component="div"
          itemKey="index"
          :list="col.componentList"
          @start="onDragStart"
          @end="onDragEnd"
          @add="onDragAdd($event, col.componentList)"
        >
          <template #item="{ element, index }">
            <DynamicComponent class="drag-handle" :componentConfig="element" :index="index" :component-list="col.componentList" />
          </template>
        </draggable>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateUUID } from '@/utils/uuid'
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import { bgImageStyleConfig } from '@/utils/common-style'
import optionsConfig from './options-config'

import draggable from 'vuedraggable'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'

export default defineComponent({
  name: 'nebula-component-layout',
  components: {
    DynamicComponent,
    draggable
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  computed: {
    ...mapState(useDataStore, ['componentListMap']),
    componentList() {
      return this.options.columns[0].componentList as any[]
    },
    pageStyle() {
      return bgImageStyleConfig(this.options) + `textAlign: ${this.options.labelAlign};`
    },
    layoutUnit() {
      let unit = this.options.layoutHeightUnit
      if (!unit || unit.length === 0) {
        unit = 'px'
      }
      return unit
    }
  },
  methods: {
    ...mapActions(useDataStore, ['onChangeCurrentComponentUUID']),
    onDragStart() {},
    onDragEnd(item: any) {
      // console.log('end', item, props.componentTreeList)
    },
    onDragAdd(item: any, componentList: any) {
      let currentItemIndex = item.newIndex
      let currentItem = componentList[currentItemIndex]

      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options._data_origin_component_uuid = ''
        copyItem.options.commonConfigAssignSign = copyItem.uuid
        copyItem.options._data_origin_component_uuid = this.options._data_origin_component_uuid
        componentList[currentItemIndex] = copyItem

        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
        console.log('layout add', copyItem)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
// .layout-col {
//   &:hover {
//     border: 1px dashed #ccc !important;
//   }
// }
</style>
