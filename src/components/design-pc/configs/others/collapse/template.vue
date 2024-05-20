<template>
  <a-collapse v-model="options.active" :accordion="options.accordion">
    <a-collapse-panel v-for="(col, colIndex) in options.columns" :key="colIndex.toString()" :header="col.title">
      <draggable
        style="min-height: 50px; background-color: #f5f5f5"
        class="draggable"
        v-bind="{
          group: 'component',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-handle'
        }"
        @add="onDragAdd($event, colIndex)"
        component="div"
        itemKey="index"
        :list="col.componentList"
      >
        <template #item="{ element, index }">
          <DynamicComponent class="drag-handle" :componentConfig="element" :index="index" :component-list="col.componentList" />
        </template>
      </draggable>
    </a-collapse-panel>
  </a-collapse>
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
  name: 'nebula-component-collapse',
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
    onDragAdd(item: any, colIndex: number) {
      let componentList: any[] = this.options.columns[colIndex].componentList
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
        componentList[currentItemIndex] = copyItem
        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ghost {
  background-color: #f56c6c;
  border: 2px solid #f56c6c;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  margin: 2px;
}
</style>
