<template>
  <div>
    <a-table :dataSource="options.columnsConfigList" :columns="options.header" >
      <template #bodyCell="{ text, record, index, column }">
        <div  v-if="column&&column.dataIndex">
          <!-- {{ text }}||
            {{ record }}||
            {{ index }}||
            {{column}} -->
          <!-- {{options.columnsConfigList[0][column.dataIndex]}} -->
          <!-- {{ getColumnIndex(column) }} -->

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
            @add="onDragAdd($event, column)"
            component="div"
            itemKey="index"
            :list="options.columnsConfigList[0][column.dataIndex]"
          >
            <template #item="{ element, index }">
              <DynamicComponent class="drag-handle" :componentConfig="element" :index="index" :component-list="options.columnsConfigList[0][column.dataIndex]"/>
            </template>
          </draggable>
        </div>
      </template>
    </a-table>
    <a-button type="dashed" :block="true" v-if="options.addRowSwitch"> 添加行 </a-button>
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
  type: 'nebula-component-custom-table',
  components: {
    DynamicComponent,
    draggable
  },
  data() {
    return {
      options: optionsConfig
    }
  },
  created() {
    // if (this.options.header && this.options.header.length > 0) {
    //   this.options.header = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       key: 'name'
    //     },
    //     {
    //       title: 'Age',
    //       dataIndex: 'age',
    //       key: 'age'
    //     },
    //     {
    //       title: 'Address',
    //       dataIndex: 'address',
    //       key: 'address'
    //     },
    //     {
    //       title: 'Tags',
    //       key: 'tags',
    //       dataIndex: 'tags'
    //     },
    //     {
    //       title: 'Action',
    //       key: 'action',
    //       dataIndex: 'action'
    //     }
    //   ]
    //   this.options.columnsConfigList = [
    //     {
    //       name: [],
    //       age: [],
    //       address: [],
    //       tags: [],
    //       action: []
    //     }
    //   ]
    // }
  },
  computed: {
    ...mapState(useDataStore, ['componentListMap']),
  },
  methods: {
    ...mapActions(useDataStore, ['onChangeCurrentComponentUUID']),
    onDragAdd(item: any, column) {
      console.log('add', item, this.options)
      let currentItemIndex = item.newIndex
      let currentItem = this.options.columnsConfigList[0][column.dataIndex][currentItemIndex]
      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options._data_origin_component_uuid = this.options.commonConfigAssignSign

        this.options.columnsConfigList[0][column.dataIndex][currentItemIndex] = copyItem

        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
        console.log('list add', copyItem)
      }
    },
    // 获取第几列
    getColumnIndex(column) {
      return this.options.header.indexOf(column)
    }
  }
}
</script>
<style lang=""></style>
