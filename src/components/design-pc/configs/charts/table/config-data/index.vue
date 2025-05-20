<template>
  <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off" layout="vertical" style="margin-left: 24px">
    <a-form-item label="值配置">
      <DataValueSelect
        :component-options="options"
        :param-item="options.interfaceDataConfig"
        :hide-page-param="true"
        :hide-page-variable="true"
        :hide-component="true"
        :hide-global="true"
        @onChange="onDataSelectChange"
      />
    </a-form-item>
    <a-form-item label="表格列">
      <!-- <a-select v-model:value="state.columnValue" mode="multiple" placeholder="请选择最大值" key="maxValue" @change="onColunmChange">
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
          {{ item.columnName }}
        </a-select-option>
      </a-select> -->
      <ColumnSelect />
    </a-form-item>
    <div class="event-div">
      <div class="event-div-col" @click="onEventClick('column')">
        <i class="event-icon iconfont iconsettings" />
        表格列配置
      </div>
      <div class="event-div-col" @click="onEventClick('operate')">
        <i class="event-icon iconfont iconbiangengguanli" />
        操作项配置
      </div>
    </div>

    <!-- <div class="event-div-row" @click="onEventClick('trRender')">
      <i class="event-icon iconfont iconbiangengguanli" />
      行渲染器
    </div>
     -->
  </a-form>
  <a-form labelAlign="left" :label-col="labelCol">
    <div class="page-config-div">分页配置</div>
    <a-form-item label="默认行数：">
      <a-select v-model:value="options.pagination.pageSize">
        <a-select-option value="5">5</a-select-option>
        <a-select-option value="10">10</a-select-option>
        <a-select-option value="20">20</a-select-option>
        <a-select-option value="50">50</a-select-option>
        <a-select-option value="100">100</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="后端分页">
      <div style="display: flex; align-items: center">
        <a-switch v-model:checked="options.paginationInterfaceSwitch"></a-switch>
        <!-- TODO 后期最好隐藏别的接口，只剩下一个和表格同步的接口 -->
        <DataValueSelect
          :component-options="options"
          :param-item="options.pagingTotalKeyConfig"
          :hide-page-param="true"
          :hide-page-variable="true"
          :hide-component="true"
          :hide-global="true"
          @onChange="onPageSelectChange"
          style="width: 170px"
        />
      </div>
    </a-form-item>
    <div class="page-config-div">表格数据选择</div>
    <a-form-item label="选中列值：">
      <a-select v-model:value="options.rowSelectKey" allowClear placeholder="选择列值" @change="onRowSelectChange">
        <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
     
    </a-form-item>
    <a-form-item label="是否可选择" v-if="options.rowSelectKey">
      <!-- <a-switch v-model:checked="options.rowSelectSingleSwitch"></a-switch> -->
      <a-select v-model:value="options.rowSelectMethod" placeholder="选择列值">
        <a-select-option value="none">不显示</a-select-option>
        <a-select-option value="single">单选</a-select-option>
        <a-select-option value="multiple">多选</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="回显配置：">
      <!-- <StatusValueSelect
        :echoValue="options.echoRowKey_id"
        :hideComponent="true"
        :hidePageParam="true"
        :hidePageVariable="true"
        :hideGlobal="true"
        :param-item="options.echoRowConfig"
        style="width: 215px"
        @onChange="onRowEchoSelectChange"
      ></StatusValueSelect> -->
      <DataValueSelect
        :component-options="options"
        :param-item="options.echoRowConfig"
        :hide-page-param="true"
        :hide-page-variable="true"
        :hide-component="true"
        :hide-global="true"
        @onChange="onRowEchoSelectChange"
        style="width: 215px"
      />
    </a-form-item>
    <a-form-item label="合计：">
      <div style="display: flex; align-items: center">
        <a-switch v-model:checked="options.isSum"></a-switch>
          <a-tooltip>
            <template #title>
              <span>打开合计后，不能配置选中行，不然会导致合计行错位</span>
            </template>
            <QuestionCircleOutlined style="margin-left: 5px" />
          </a-tooltip>
        </div>
    </a-form-item>
    <a-form-item label="合计配置：" v-if="options.isSum">
      <a-radio-group size="mini" v-model:value="options.summaryType" button-style="solid" style="margin-bottom: 10px">
        <a-radio-button value="interface">接口合计</a-radio-button>
        <a-radio-button value="column">前端合计</a-radio-button>
      </a-radio-group>

      <DataValueSelect :component-options="options" :param-item="options.summaryRowConfig" v-if="options.summaryType == 'interface'" @onChange="onRowSummarySelectChange" />
      <a-select v-model:value="options.summaryRowList" mode="multiple" placeholder="选择需要合计的列" v-if="options.summaryType == 'column'">
        <a-select-option v-for="item in summaryFieldList" :value="item.columnName">
          {{ item.columnName }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <!-- <a-form-item label="合计配置：">
      
    </a-form-item> -->

    <!-- 一维数组树形显示 -->
    <a-form-item label="树形显示：">
      <a-switch v-model:checked="options.expandSwitch"></a-switch>
    </a-form-item>
    <a-form-item label="数据结构：" v-if="options.expandSwitch">
      <a-segmented v-model:value="options.expandDataFormat" :options="segData" />
    </a-form-item>
    <div v-if="options.expandSwitch && options.expandDataFormat === '树形数据'">
      <a-form-item label="子节点：">
        <a-select v-model:value="options.expandChildren" allowClear placeholder="子节点：">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div v-else-if="options.expandSwitch && options.expandDataFormat === '一维数组'">
      <a-form-item label="节点ID：">
        <a-select v-model:value="options.expandId" allowClear placeholder="节点ID：">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="父节点ID：">
        <a-select v-model:value="options.expandParentId" allowClear placeholder="父节点ID：">
          <a-select-option v-for="item in state.tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <a-form-item label="左侧固定：">
      <a-input-number v-model:value="options.leftFixedIndex" :min="0" addon-after="列" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import draggable from 'vuedraggable'
import DataValueSelect from '@/components/data-value-select/index.vue'
import StatusValueSelect from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-value-select/index.vue'
import ColumnSelect from './colunm-select.vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const summaryFieldList = computed(() => {
    let temp=[]
    // 合计的列，必须是表格选择的列
    options.value.columnsConfigList.filter((item: any) => {
      temp.push({columnName:item.dataIndex})
    })
    return temp;
})
let state = reactive({
  tableFieldList: [] as any,
  columnValue: [] as any,
  pageNum: 5
})
let echoConfig = {}
const labelCol = { style: { width: '80px' } }
const segData = reactive(['一维数组', '树形数据'])
// let columnValue= [] as any
function onDataSelectChange(selectedOptions: any) {
  if (selectedOptions && selectedOptions.length > 1) {
    initTableFieldList(selectedOptions[0].value, selectedOptions[1].value)
  }
}
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  state.tableFieldList = []
  if (interfaceData) {
    let respList = interfaceData.data.responseData[key]
    if (respList && respList.length > 0) {
      let temp = respList[0]
      for (let k in temp) {
        state.tableFieldList.push({
          columnName: k
        })
      }
    }
  }
}

function onEventClick(type: any) {
  if (type == 'column') {
    store.showTableColumnConfig()
  } else if (type == 'operate') {
    store.showTableOperateConfig()
  }
}
// pagingTotalKey_id 是记录行数的数据回显值
function onPageSelectChange(selectedOptions: any) {
  console.log('---onPageSelectChange-----', selectedOptions)
  if (selectedOptions) {
    if (selectedOptions.length > 1) {
      options.value.pagingTotalKey = selectedOptions[1].label
    }
  } else {
    // 说明清空了
    options.value.pagingTotalKey = ''
  }
}
function onRowEchoSelectChange(selectedOptions: any) {
  console.log('---onRowEchoSelectChange----', selectedOptions)

  //   options.value.echoRowKey_id = []
  //   state.selectList = []
  //   if (selectedOptions && selectedOptions.length == 2) {
  //     options.value.echoRowKey_id = [selectedOptions[0].value, selectedOptions[1].value]
  //   }
}
function onRowSummarySelectChange(selectedOptions: any) {
  console.log('---onRowSummarySelectChange----', selectedOptions)

  //   options.value.summaryRowKey_id = []
  //   state.selectList = []
  //   if (selectedOptions && selectedOptions.length == 2) {
  //     options.value.summaryRowKey_id = [selectedOptions[0].value, selectedOptions[1].value]
  //   }
}

function handleOldVersion() {
  if (options.value.pagingTotalKey_id.length > 0) {
    options.value.paginationInterfaceSwitch = true
    options.value.pagingTotalKeyConfig.uuid = options.value.pagingTotalKey_id[0]
    options.value.pagingTotalKeyConfig.key = options.value.pagingTotalKey_id[1]
  }
  let operateApiId = options.value.interfaceDataConfig.uuid
  if (operateApiId) {
    initTableFieldList(operateApiId, options.value.interfaceDataConfig.key)
  }
}
function onRowSelectChange(value){
    if(!value){
        options.value.rowSelectMethod=""
    }
}
onMounted(() => {
  //老版本回显处理
  handleOldVersion()
})
</script>

<style lang="less" scoped>
:deep(.ant-form-item-control-input-content) {
  text-align: left;
}

.table-column-item {
  padding: 5px;
  .iconfont {
    &.active {
      color: #197aff;
    }
  }
}
.event-div {
  display: flex;
  justify-content: space-between;
}
.event-div-row {
  display: flex;
  flex-direction: row;
  cursor: pointer;
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
.event-icon {
  margin-right: 10px;
}
.page-config-div {
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  flex: 1;
}
</style>
