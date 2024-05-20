<template>
  <div>
    <a-radio-group v-model:value="properties._statusOperateSetValueOfType">
      <a-radio style="margin-bottom: 8px" value="static">
        <p class="status-label">静态数值</p>
        <!-- 静态值配置 -->
        <a-input style="width: 227px" placeholder="静态值" v-model:value="properties._statusOperateSetValueOfStaticValue"></a-input>
      </a-radio>
      <a-radio style="margin-bottom: 8px" value="dynamic">
        <!-- 动态值配置 -->
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <p class="status-label">动态数据</p>
          <div>
            <StatusValueSelect
              :echoValue="properties._statusOperateSetValueOfDynamicToKeyArr"
              :hideComponent="true"
              :hidePageParam="true"
              :hidePageVariable="true"
              :hideGlobal="true"
              :param-item="properties"
              style="margin: 8px 0"
              @onChange="onDynamicChange"
            ></StatusValueSelect></div
        ></span>
      </a-radio>

      <a-radio style="margin-bottom: 8px" value="relation">
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <p class="status-label">数据映射</p>
          <div>
            <!-- 关联值配置 -->
            <StatusValueSelect
              :echoValue="properties._statusOperateSetValueOfRelationToKeyArr"
              :hideComponent="true"
              :hidePageParam="true"
              :hidePageVariable="true"
              :hideGlobal="true"
              :param-item="properties"
              style="margin: 8px 0"
              @onChange="onChange"
            ></StatusValueSelect>
            <p style="height: 0px"></p>
            <div style="display: flex">
              <a-select
                v-model:value="properties._statusOperateSetValueOfRelationKey"
                placeholder="请选择"
                style="margin-bottom: 0px; width: 100px; margin-right: 8px"
                :onClick="(e:any) =>e.preventDefault()"
              >
                <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
              </a-select>

              <a-select
                v-model:value="properties._statusOperateSetValueOfRelationKeyToValue"
                placeholder="请选择"
                style="margin-bottom: 0px; width: 100px; margin-right: 8px"
                :onClick="(e:any) =>e.preventDefault()"
              >
                <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
              </a-select>
            </div>
          </div>
        </span>
      </a-radio>
      <a-radio value="dictionary">
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <p class="status-label">数据字典</p>
          <a-select style="width: 227px; margin: 8px 0" show-search v-model:value="properties._statusOperateSetValueOfDicId" placeholder="请选择数据字典" allow-clear :filter-option="filterOption">
            <a-select-option v-for="item in dicList" :value="item.id" :label="item.dicName">{{ item.dicName }} </a-select-option>
          </a-select>
        </span>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, onMounted, ref } from 'vue'
import { useDataStore } from '@/stores'
import StatusValueSelect from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-value-select/index.vue'
import DataValueSelect from '@/components/data-value-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
const dicList = ref<any[]>([])

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
function onChange(selectedOptions: any) {
  properties.value._statusOperateSetValueOfRelationToKeyArr = []
  state.selectList = []
  if (selectedOptions && selectedOptions.length == 2) {
    initSelectList(selectedOptions[0].value, selectedOptions[1].value)
    properties.value._statusOperateSetValueOfRelationToKeyArr = [selectedOptions[0].value, selectedOptions[1].value]
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
</style>
