<template>
  <div>
    <span
      @click="
        (e) => {
          e.preventDefault()
          e.stopPropagation()
        }
      "
    >
      <div>
        <a-select v-model:value="properties._statusTagColorConditionKey" placeholder="请选择表格列" key="maxValue" style="width: 200px">
          <a-select-option v-for="item in tableFieldList" :value="item.columnName">
            {{ item.columnName }}
          </a-select-option>
        </a-select>
        =
        <!-- 关联值配置 -->
        <StatusValueSelect
          :echoValue="properties._statusTagColorKeyArr"
          :hideComponent="true"
          :hidePageParam="true"
          :hidePageVariable="true"
          :hideGlobal="true"
          :param-item="properties"
          style="margin: 8px 0"
          @onChange="onChange"
        ></StatusValueSelect>
        <p style="height: 0px"></p>
        <div style="margin-top: 10px">
          <div class="tag-div-label">关联值</div>
          <a-select v-model:value="properties._statusTagColorRelationKey" placeholder="请选择" style="margin-bottom: 0px; width: 100px; margin-right: 8px" :onClick="(e:any) =>e.preventDefault()">
            <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
          </a-select>
        </div>
        <div style="margin-top: 10px">
          <div class="tag-div-label">颜色</div>
          <a-select v-model:value="properties._statusTagColorKey" placeholder="请选择" style="margin-bottom: 0px; width: 100px; margin-right: 8px" :onClick="(e:any) =>e.preventDefault()">
            <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
          </a-select>
          <!-- 背景
              <a-select
                v-model:value="properties._statusOperateSetValueOfRelationKeyToValue"
                placeholder="请选择"
                style="margin-bottom: 0px; width: 100px; margin-right: 8px"
                :onClick="(e:any) =>e.preventDefault()"
              >
                <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
              </a-select> -->
        </div>
      </div>
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, onMounted, ref } from 'vue'
import { useDataStore } from '@/stores'
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'
import StatusValueSelect from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-value-select/index.vue'
import DataValueSelect from '@/components/data-value-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
const dicList = ref<any[]>([])
const options = computed(() => store.currentCheckedComponent.options)
const tableFieldList = computed(() => {
  if (options.value.contentDataSource == 'radio-button-interface') {
    return initTableFieldList(options.value.interfaceDataConfig.uuid, options.value.interfaceDataConfig.key)
  }
  return []
})
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  let tableFieldList = []
  if (interfaceData) {
    let respList = interfaceData.data.responseData[key]
    if (respList && respList.length > 0) {
      let temp = respList[0]
      for (let k in temp) {
        tableFieldList.push({
          columnName: k
        })
      }
    }
  }
  return tableFieldList
}
let state = reactive({
  selectList: [] as any
})

onMounted(() => {
  dicList.value = []
})

function onDynamicChange(selectedOptions: any) {
  properties.value._statusOperateSetValueOfDynamicToKeyArr = []

  if (selectedOptions) {
    selectedOptions.forEach((sItem: any) => {
      properties.value._statusOperateSetValueOfDynamicToKeyArr.push(sItem.value)
    })
    // properties.value._statusOperateSetValueOfRelationToKeyArr = [selectedOptions[0].value, selectedOptions[1].value]
  }
}
function onValueChange(selectedOptions: any) {
  properties.value._statusTagColorConditionKey = ''
  // 理论上如果不是3 应该清空
  if (selectedOptions && selectedOptions.length == 3) {
    properties.value._statusTagColorConditionKey = selectedOptions[2].value
  }
}
function onChange(selectedOptions: any) {
  properties.value._statusTagColorKeyArr = []
  state.selectList = []
  if (selectedOptions && selectedOptions.length == 2) {
    initSelectList(selectedOptions[0].value, selectedOptions[1].value)
    properties.value._statusTagColorKeyArr = [selectedOptions[0].value, selectedOptions[1].value]
  }
}
function initSelectList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  console.log('--initSelectList------', interfaceData, key, properties)
  //   if (interfaceData) {
  //     state.selectList = interfaceData.data.tableFieldList

  //   }
  state.selectList = []
  if (interfaceData) {
    if (interfaceData.data.tableFieldList) {
      state.selectList = interfaceData.data.tableFieldList
    } else {
      let respList = interfaceData.data.responseData[key]
      if (respList.length > 0) {
        let temp = respList[0]
        for (let k in temp) {
          state.selectList.push({
            columnName: k
          })
        }
      }
    }
  }
}
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
}
onMounted(() => {
  //老版本回显处理
  if (properties.value.operateApiId) {
    initSelectList(properties.value.operateApiId, properties.value.middle)
  }
  properties.value.tableKey = store.curColumn.dataIndex
})
</script>
<style scoped>
.status-label {
  display: inline-block;
}
.tag-div-label {
  width: 60px;
  display: inline-block;
}
</style>
