<template>
  <div class="column-config">
    <div style="margin: 10px">操作项配置</div>
    <a-form labelAlign="left" :label-col="labelCol">
      <a-form-item label="列名">
        <ValueInput :options="props.columnItem" value-key="colValue" en-value-key="envalue"></ValueInput>
      </a-form-item>

      <!-- TODO -->
      <a-form-item label="权限：">
        <a-switch size="mini" v-model:checked="permissionChecked" @change="onCollectionPermission"></a-switch>
      </a-form-item>
      <a-form-item label="颜色：" style="line-height: 62px">
        <div class="colorSetting" style="margin-right: 8px" @click.stop="showColorPicker = !showColorPicker">
          <span title="请选择字体颜色">
            <i
              class="iconfont iconzitiyanse"
              :style="{
                fontSize: '40px',
                border: '1px solid #ebeef5',
                borderRadius: '4px',
                marginRight: '10px',
                color: props.columnItem.textColor
              }"
            />
            <ColorPicker :key="1" :value="props.columnItem.textColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeColor" :openStatus="showColorPicker" />
          </span>
          <!-- <span style="line-height: 40px">请选择字体颜色</span> -->
        </div>
        <!-- <a-switch size="mini" v-model:checked="props.columnItem.qx"  :disabled="true"></a-switch> -->
      </a-form-item>
      <a-form-item label="图标：">
        <IconSelect :options="props.columnItem" value-key="icon" v-if="props.columnItem.icon"></IconSelect>
        <!-- <a-switch size="mini" v-model:checked="props.columnItem.qx"  :disabled="true"></a-switch> -->
      </a-form-item>
    </a-form>
    <div style="margin: 10px">更多配置</div>
    <div class="event-div">
      <div class="event-div-col" @click="onEventClick('click')">
        <i class="event-icon iconfont iconfabu1" />
        点击事件
      </div>
      <div class="event-div-col" @click="onEventClick('render')">
        <i class="event-icon iconfont iconbiangengguanli" />
        渲染器
      </div>
    </div>
  </div>
  <EventConfig :eventType="store.eventType" v-model:open="store.dialogEventVisible" />
  <StatusConfig :eventType="'render'" :isOperate="true" v-model:dialog-visible="store.dialogStatusVisible" />
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import DataValueSelect from '@/components/data-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import EventConfig from '@/layouts/designer-aside-right/config-events/index.vue'
import StatusConfig from '@/layouts/designer-aside-right/config-status/index.vue'
import { generateUUID } from '@/utils/uuid'
import { deleteAuthorityService, saveAuthorityService } from '@/api/api'
import ColorPicker from '@/components/tools/color-picker/index.vue'
import IconSelect from '@/components/common-attribute-config/icon-select.vue'
const store = useDataStore()
const props = defineProps<{
  columnItem: any
}>()

let state = reactive({
  valueType: ''
})
const showColorPicker = ref(false)
const options = computed(() => store.currentCheckedComponent.options)
const permissionChecked = computed(() => {
  console.log('----permissionChecked----', props.columnItem)
  let uuid = props.columnItem.specialUUID
  return store.permissionList.includes(uuid)
})

const labelCol = { style: { width: '80px' } }

function onEventClick(type: any) {
  if (type == 'click') {
    store.curColumn = props.columnItem
    store.openEventDialog('click', 'column')
  } else {
    store.curColumn = props.columnItem
    store.openStatusDialog()
  }
}
function onCollectionPermission(checked: boolean) {
  let specialColumn = props.columnItem
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
    let authName = tableName + '-' + props.columnItem.colValue
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
function changeColor(color: any) {
  showColorPicker.value = false
  console.log('----changeColor-----', color, props.columnItem)
  props.columnItem.textColor = color
}
onMounted(() => {
  if (!props.columnItem.icon) {
    props.columnItem.icon = {
      name: 'smile',
      fontClass: 'iconfont ant-smile',
      unicode: 'e78f'
    }
  }
  // setTimeout(() => {
  //     onHandleStatusConfigRender(state.obj)
  // }, 100);
  // nextTick(() => {

  // onHandleStatusConfigRender(state.obj)
  // });
})
</script>

<style lang="less" scoped>
.column-config {
  padding: 5px;
}
.event-div {
  display: flex;
  justify-content: space-between;
}
.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 44%;
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
ul {
  li {
    list-style: none;
    float: left;
    padding: 0 8px;
    height: 45px;
    cursor: pointer;
  }
}

.event-icon {
  margin-right: 10px;
}
</style>
