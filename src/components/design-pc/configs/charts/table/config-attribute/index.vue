<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="表头固定">
        <a-switch v-model:checked="options.defaultValue" />
      </a-form-item>
      <a-form-item label="分页开关">
        <a-switch v-model:checked="options.paginationSwitch" />
      </a-form-item>
      <a-form-item label="行号开关">
        <a-switch v-model:checked="options.rowIndexSwitch" />
      </a-form-item>
      <a-form-item label="列设置">
        <a-switch v-model:checked="options.columnSetSwitch" />
      </a-form-item>
      <a-form-item label="可伸缩列">
        <div style="display: flex; align-items: center">
          <a-switch v-model:checked="options.resizableSwitch" />
          <a-tooltip>
            <template #title>
              <span>当表格列数较多导致出现横向滚动条时，启用可伸缩列功能可让用户自主拖动调整列宽，优化数据浏览体验。</span>
            </template>
            <QuestionCircleOutlined style="margin-left: 5px" />
          </a-tooltip>
        </div>
      </a-form-item>
      <!-- <a-form-item label="升级">
        <a-button type="primary" @click="upgrade">一键升级</a-button>
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'
import { Modal, message } from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
function upgrade() {
  Modal.confirm({
    title: '一键升级',
    content: '一键升级为新编辑器表格数据格式，主要解决表格在老编辑环境下体积过大问题，同时处理表格列校验逻辑,该操作不可逆，升级后不能进行回退',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      upgradeTable()
    }
  })
}
function upgradeTable() {
  console.log('----upgradeTable--', options)
  //1 删columns
  delete options.value.columns
  let columnsConfigList = options.value.columnsConfigList
  let specialColumnsConfigs = options.value.specialColumnsConfigs
  let tempSpecialList = [] as any
  //2 调整specialColumnsConfigs顺序
  columnsConfigList.forEach((element: any, index: any) => {
    element.version = '2.0.0'
    let existFlag = false
    specialColumnsConfigs.forEach((sItem: any) => {
      // 子列不处理，在渲染处
      if (!sItem[0].parentIndex) {
        if (element.dataIndex === sItem[0].dataIndex) {
          existFlag = true
          // 如果存在子列会有bug
          tempSpecialList.push(sItem)
        }
      }
    })
    if (element.children && element.children.length > 0) {
      element.children.forEach((child) => {
        child.width = '200'
        child.colIndex = index
        child.align = 'center'
      })
    }
    if (!existFlag) {
      let tempItem = [
        {
          colValue: element.dataIndex,
          dataIndex: element.dataIndex,
          statusConfigList: [],
          tableBindDataRowKeyList: [],
          tableDataRowKeyList: [],
          valueType: 'value'
        }
      ]
      tempSpecialList.push(tempItem)
    }

    handleStatus(element, tempSpecialList)
    delete element.componentList
    delete element.interfaceDataConfig
    delete element.specialColumnsConfigs
  })
  options.value.specialColumnsConfigs = tempSpecialList
  console.log('----specialColumnsConfigs--', tempSpecialList)
  //3 迁移special 里面的status的状态渲染事件  TODO

  //4 最后把表version 升级到2.0.0 下次不允许升级了
  options.value.version = '2.0.0'
}

function handleStatus(columnItem: any, tempSpecialList: any) {
  if (columnItem.dataIndex !== '操作') {
    let statusEventList = columnItem.statusEventList
    statusEventList &&
      statusEventList.forEach((statusItem: any) => {
        if (statusItem.type === 'status-operate-set') {
          if (columnItem._statusOperateSetValueOfType) {
            console.log('----handleStatus--', statusItem, columnItem)
            statusItem.properties._statusOperateSetValueOfRelationColumns = columnItem._statusOperateSetValueOfRelationColumns
            statusItem.properties._statusOperateSetValueOfRelationKey = columnItem._statusOperateSetValueOfRelationKey
            statusItem.properties._statusOperateSetValueOfRelationKeyToValue = columnItem._statusOperateSetValueOfRelationKeyToValue
            statusItem.properties._statusOperateSetValueOfRelationToKeyArr = columnItem._statusOperateSetValueOfRelationToKeyArr
            statusItem.properties._statusOperateSetValueOfStaticValue = columnItem._statusOperateSetValueOfStaticValue
            statusItem.properties._statusOperateSetValueOfType = columnItem._statusOperateSetValueOfType
            statusItem.properties.tableKey = columnItem.dataIndex
          }
        }
      })
  } else {
    let componentList = columnItem.componentList
    componentList &&
      componentList.forEach((colItem: any, index: number) => {
        let _statusEventList = colItem._statusEventList
        _statusEventList &&
          _statusEventList.forEach((sItem: any) => {
            if (sItem.type == 'status-operate-operate') {
              sItem.properties._statusOperateSetTextOfType = colItem._statusOperateSetTextOfType
              sItem.properties._statusOperateSetTextOfStaticValue = colItem._statusOperateSetTextOfStaticValue
              sItem.properties._statusOperateSetTextOfLogicKey = colItem._statusOperateSetTextOfLogicKey
              sItem.properties._statusOperateSetTextOfLogicValue = colItem._statusOperateSetTextOfLogicValue
              sItem.properties._statusOperateSetTextOfLogicOperator = colItem._statusOperateSetTextOfLogicOperator
              sItem.properties._statusOperateSetTextOfDynamicValue = colItem._statusOperateSetTextOfDynamicValue
            }
          })
        let lastSpecial = tempSpecialList[tempSpecialList.length - 1]
        lastSpecial[index].statusEventList = _statusEventList
        lastSpecial[index].version = '2.0.0'
      })
  }
}
</script>

<style lang="less" scoped></style>
