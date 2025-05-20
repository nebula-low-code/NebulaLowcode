<template>
  <div class="column-config">
    <div style="margin: 10px">表格子列配置</div>
    <a-form labelAlign="left" :label-col="labelCol">
      <a-form-item label="列名">
        <ValueInput :options="props.columnItem" value-key="title" en-value-key="envalue"></ValueInput>
      </a-form-item>
      <a-form-item label="列宽：">
        <a-input-number size="mini" v-model:value="props.columnItem.width" :min="50"></a-input-number>
      </a-form-item>
      <!-- 类型是在special 里面的 -->
      <a-form-item label="对齐：">
        <a-radio-group size="mini" v-model:value="props.columnItem.align">
          <a-radio-button value="left">向左</a-radio-button>
          <a-radio-button value="center">居中</a-radio-button>
          <a-radio-button value="right">向右</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <div class="event-div-col" @click="onClickChildren()">表格子列</div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import { generateUUID } from '@/utils/uuid'
import { deleteAuthorityService, saveAuthorityService } from '@/api/api'
import ValueOptions from '@/components/common-data-config/options-config.vue'
import { columnFormatTypeList } from '@/utils/constants.ts'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
let specialColumnsConfigs = options.value.specialColumnsConfigs
const props = defineProps<{
  columnItem: any
}>()
let state = reactive({
  valueType: '',
  textFormat: '',
  selectConfig: {
    labelKey: '',
    valueKey: '',
    contentDataSource: '',
    interfaceDataConfig: {},
    defaultTableData: []
  }
})
const permissionChecked = computed(() => {
  let uuid = specialColumnsConfigs[props.columnItem.colIndex][0].specialUUID
  return store.permissionList.includes(uuid)
})
const labelCol = { style: { width: '80px' } }
state.valueType = specialColumnsConfigs[props.columnItem.colIndex][0].valueType
state.textFormat = specialColumnsConfigs[props.columnItem.colIndex][0].textFormat ? specialColumnsConfigs[props.columnItem.colIndex][0].textFormat : 'NORMAL_TEXT'
function addSortFunc(sortable: any, item: any) {
  if (!sortable) {
    item.sortDirections = []
  } else {
    item.sortDirections = ['ascend', 'descend']
  }
}
function onChangeIsEdit() {
  if (props.columnItem.isEditField) {
    if (!props.columnItem.editType) {
      props.columnItem.editType = 'input'
    }
  }
}
function onChangeEditType() {
  if (props.columnItem.editType === 'select') {
    props.columnItem.selectConfig = {
      labelKey: '',
      valueKey: '',
      contentDataSource: '',
      interfaceDataConfig: {},
      defaultTableData: []
    }
  } else {
    delete props.columnItem.selectConfig
  }
}

function onChangeValueType() {
  specialColumnsConfigs[props.columnItem.colIndex][0].valueType = state.valueType
  if (state.valueType == 'value') {
  } else {
    delete specialColumnsConfigs[props.columnItem.colIndex][0].textFormat
  }
}
function onChangeTextFormat() {
  specialColumnsConfigs[props.columnItem.colIndex][0].textFormat = state.textFormat
}
function onCollectionPermission(checked: boolean) {
  let specialColumn = specialColumnsConfigs[props.columnItem.colIndex][0]
  let specialUUID = specialColumn.specialUUID
  specialColumn.isPermission = checked
  if (checked) {
    let reportId = store.pageConfig.config.reportId
    let tableName = options.value.commonConfigAssignName

    if (!specialUUID) {
      // 如果没有specicalUUID 则生成一个
      specialUUID = 'table-column-' + generateUUID()
      specialColumn.specialUUID = specialUUID
    }
    if (!store.permissionList.includes(specialUUID)) {
      store.permissionList.push(specialUUID)
    }
    let authName = tableName + '-' + props.columnItem.value
    saveAuthorityService({
      reportId: reportId,
      type: 'component',
      queryType: 'pc',
      authorityName: authName,
      authorityId: specialUUID
    })
  } else {
    store.permissionList.splice(store.permissionList.indexOf(specialUUID), 1)
    deleteAuthorityService({
      authorityId: specialUUID,
      reportId: store.pageConfig.config.reportId
    })
  }
}
function eventConfirmClick() {
  let specialColumn = specialColumnsConfigs[props.columnItem.colIndex][0]
  if (!specialColumn.confirmEventList) {
    specialColumn.confirmEventList = []
  }
  store.curColumn = specialColumn
  //confirmEventList
  store.openEventDialog('confirm', 'column')
}

function onClickChildren(){
    console.log('onClickChildren',props.columnItem)
    store.curColumn = props.columnItem
    store.showTableColumnSubChildrenConfig();
}
</script>

<style lang="less" scoped>
.column-config {
  padding: 5px;
}
.event-div {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 88%;
  margin: 20px auto;
  align-items: center;
  color: #666;
  cursor: pointer;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
.event-icon {
  font-size: 12px;
  margin: 0 10px;
}
.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 30%;
  align-items: center;
  color: #666;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
</style>
