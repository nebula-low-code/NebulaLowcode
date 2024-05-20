<template>
  <div>
    <div style="margin-bottom: 10px">操作项：{{ properties.name }}</div>
    <a-radio-group v-model:value="properties._statusOperateSetTextOfType">
      <a-radio style="margin-bottom: 8px" value="static">
        <!-- 静态值配置 -->
        <a-input style="width: 227px" placeholder="静态值" v-model:value="properties._statusOperateSetTextOfStaticValue"></a-input>
      </a-radio>
      <a-radio value="dynamic">
        <a-select style="width: 100%" v-model:value="properties._statusOperateSetTextOfLogicKey" placeholder="请选择" :onClick="(e:any) => e.preventDefault()">
          <a-select-option v-for="(item, key) in state.selectList" :value="item.columnName">{{ item.columnName }}</a-select-option>
        </a-select>
        <p style="height: 10px"></p>
        <a-input v-model:value="properties._statusOperateSetTextOfLogicValue">
          <template #addonBefore>
            <a-select v-model:value="properties._statusOperateSetTextOfLogicOperator" style="width:100px" :onClick="(e:any) => e.preventDefault()">
              <a-select-option v-for="(item, index) in logicOptions" :key="index" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
        </a-input>
        <p style="height: 10px"></p>
        <a-input style="width: 100%" v-model:value="properties._statusOperateSetTextOfDynamicValue" placeholder="请输入文本值,为空则不显示" />
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
let state = reactive({
  selectList: [] as any
})
const logicOptions = [
  {
    value: '=',
    label: '='
  },
  {
    value: '>',
    label: '>'
  },
  {
    value: '>=',
    label: '>='
  },
  {
    value: '<',
    label: '<'
  },
  {
    value: '<=',
    label: '<='
  },
  {
    value: '!=',
    label: '!='
  },
  {
    value: 'isNull',
    label: 'isNull'
  },
  {
    value: 'isNotNull',
    label: 'isNotNull'
  }
]

function initSelectList(operateApiId: any,key:any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  if (interfaceData) {
    state.selectList = initTableFieldList(operateApiId,key)

  }
}
function initTableFieldList(operateApiId: any, key: any) {
  let interfaceData = store.interfaceDataById(operateApiId)
  let tableFieldList=[]
  if (interfaceData) {

      let respList = interfaceData.data.responseData[key]
      if (respList&&respList.length > 0) {
        let temp = respList[0]
        for (let k in temp) {
          tableFieldList.push({
            columnName: k
          })
        }
      }
  }
  return tableFieldList;
}
onMounted(() => {
  console.log('-------properties----', store.currentCheckedComponent)
  let operateApiId = store.currentCheckedComponent.options.interfaceDataConfig.uuid
  let key = store.currentCheckedComponent.options.interfaceDataConfig.key
  if (operateApiId) {
    initSelectList(operateApiId,key)
  }
})
</script>
<style scoped></style>
