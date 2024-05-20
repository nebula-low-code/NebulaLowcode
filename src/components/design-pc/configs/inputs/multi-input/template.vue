<template>
  <div>
    <draggable tag="ul" v-bind="{ group: { name: 'options' }, ghostClass: 'ghost', handle: '.drag-item' }" handle=".drag-item" itemKey="index" :list="extraData.columns">
      <template #item="{ element, index }">
        <li style="display: flex; margin-bottom: 10px">
          <a-input :value="element" style="width: 100%; margin-left: 10px" :size="options.size" :placeholder="options.placeholder" @change="handleChangeValue($event, index)" />
          <MenuOutlined class="columns-icon drag-item" />
          <DeleteOutlined class="columns-icon" @click="handleOptionsRemove(index)" />
        </li>
      </template>
    </draggable>
    <a-button type="link" @click="handleAddColumn">添加选项</a-button>
  </div>
</template>

<script lang="ts">
import optionsConfig from './options-config'
import draggable from 'vuedraggable'
import { DeleteOutlined, MenuOutlined } from '@ant-design/icons-vue'

export default {
  name: 'nebula-component-multi-input',
  components: {
    draggable,
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
  methods: {
    handleChangeValue(e: any, index: number) {
      this.extraData.columns[index] = e.target.value
    },
    handleOptionsRemove(index: number) {
      this.extraData.columns.splice(index, 1)
    },
    handleAddColumn() {
      this.extraData.columns.push('')
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
