<template>
  <a-tabs :activeKey="options.value" :type="options.type" :tabPosition="options.tabPosition" @change="onChange">
    <a-tab-pane v-for="(col, index) in options.columns" :key="index.toString()" :tab="col.value">
      <draggable
        style="min-height: 50px"
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
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { generateUUID } from '@/utils/uuid'
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import draggable from 'vuedraggable'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'
export default {
  type: 'nebula-component-tabs',
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
    ...mapState(useDataStore, ['componentListMap'])
  },
  methods: {
    ...mapActions(useDataStore, ['onChangeCurrentComponentUUID']),
    onDragStart() {},
    onDragEnd(item: any) {
      // console.log('end', item, props.componentTreeList)
    },
    onDragAdd(item: any, componentList: any) {
      console.log('item=', item)

      let currentItemIndex = item.newIndex
      let currentItem = componentList[currentItemIndex]

      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options.commonConfigAssignSign = copyItem.uuid
        copyItem.options._data_origin_component_uuid = ''

        componentList[currentItemIndex] = copyItem

        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
        console.log('layout add', copyItem)
      }
    },
    onChange(activeKey: any) {
      this.options.value = activeKey
    }
  }
}
</script>
<style lang=""></style>
