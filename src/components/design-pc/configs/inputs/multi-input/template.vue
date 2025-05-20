<template>
  <div>
    <!-- <draggable tag="ul" v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }" handle=".drag-item" itemKey="index" :list="extraData.columns">
      <template #item="{ element, index }">
        <li style="display: flex; margin-bottom: 10px">
          <a-input :value="element" style="width: 100%; margin-left: 10px" :size="options.size" :placeholder="options.placeholder" @change="handleChangeValue($event, index)" />
          <MenuOutlined class="columns-icon drag-item" />
          <DeleteOutlined class="columns-icon" @click="handleOptionsRemove(index)" />
        </li>
      </template>
    </draggable> -->

    <div style="display: flex">
      <draggable
        style="min-height: 50px; background-color: #f5f5f5; flex: 1"
        class="draggable"
        v-bind="{
          group: 'component',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-handle'
        }"
        @add="onDragAdd"
        component="div"
        itemKey="index"
        :list="componentList"
      >
        <template #item="{ element, index }">
          <DynamicComponent class="drag-handle" :componentConfig="element" :index="index" :component-list="componentList" />
        </template>
      </draggable>
      <MenuOutlined class="columns-icon drag-item" />
      <DeleteOutlined class="columns-icon" />
    </div>

    <a-button type="link" :style="{ color: themeConfig.token.colorPrimary }" @click="handleAddColumn">添加选项</a-button>
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import draggable from 'vuedraggable'
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons-vue'
import { mapState, mapActions } from 'pinia'
import { useDataStore, useThemeStore } from '@/stores'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import DynamicComponent from '@/components/design-pc/dynamic-component.vue'

export default {
  name: 'nebula-component-multi-input',
  components: {
    draggable,
    DynamicComponent,
    DeleteOutlined,
    MenuOutlined
  },
  data() {
    return {
      options: optionsConfig,
      extraData: {
        columns: [] as any[]
      }
    }
  },
  watch: {
    extraData: {
      handler: function (val) {
        let col = val.columns
        if (col.length > 0) {
          this.options.value = col.join(',')
        } else {
          this.options.value = ''
        }
      },
      deep: true
    }
  },
  mounted() {
    let col: any[] = []
    if (this.options.value && this.options.value.length > 0) {
      col = this.options.value.split(',')
    } else {
      col = ['']
    }
    this.extraData.columns = col
  },
  computed: {
    ...mapState(useDataStore, ['componentListMap']),
    ...mapState(useThemeStore, ['themeConfig']),
    componentList() {
      return this.options.columns[0].componentList as any[]
    }
  },
  methods: {
    ...mapActions(useDataStore, ['onChangeCurrentComponentUUID']),
    handleChangeValue(e: any, index: number) {
      this.extraData.columns[index] = e.target.value
    },
    handleOptionsRemove(index: number) {
      this.extraData.columns.splice(index, 1)
    },
    handleAddColumn() {
      this.extraData.columns.push('')
    },
    onDragAdd(item: any) {
      let currentItemIndex = item.newIndex
      let currentItem = this.componentList[currentItemIndex]

      console.log('currentItem----', currentItem)

      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options._data_origin_component_uuid = this.options.commonConfigAssignSign

        console.log('copyItem----', copyItem)

        this.componentList[currentItemIndex] = copyItem

        this.componentListMap[copyItem.uuid] = copyItem
        this.onChangeCurrentComponentUUID(copyItem.uuid)
        console.log('list add', copyItem)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.columns-icon {
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
}
</style>
