<template>
  <div>
    <draggable
      style="min-height: 50px; background-color: #f5f5f5"
      class="draggable"
      v-bind="{
        group: 'component',
        ghostClass: 'ghost',
        animation: 200,
        handle: '.drag-handle'
      }"
      @start="onDragStart"
      @end="onDragEnd"
      @add="onDragAdd"
      component="div"
      itemKey="index"
      :list="componentList"
    >
      <template #item="{ element, index }">
        <DynamicComponent class="drag-handle" :componentConfig="element" :index="index" :component-list="componentList" />
      </template>
    </draggable>
  </div>
</template>
<script lang="ts">
import optionsConfig from './options-config'
import { mapState, mapActions } from 'pinia'
import { useDataStore } from '@/stores'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'
import draggable from 'vuedraggable'
export default {
  type: 'nebula-component-list',
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
    }
  },
  methods: {
    ...mapActions(useDataStore, ['onChangeCurrentComponentUUID']),
    onDragStart() {},
    onDragEnd(item: any) {
      // console.log('end', item, props.componentTreeList)
    },
    onDragAdd(item: any) {
      let currentItemIndex = item.newIndex
      let currentItem = this.componentList[currentItemIndex]

      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options._data_origin_component_uuid = this.options.commonConfigAssignSign

        this.componentList[currentItemIndex] = copyItem

        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
        console.log('list add', copyItem)
      }
    }
  }
}
</script>
<style lang=""></style>
