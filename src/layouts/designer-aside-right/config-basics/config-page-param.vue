<template>
  <a-collapse v-model:activeKey="paramsActiveNames" :bordered="false" expandIconPosition="end" style="background-color: white">
    <a-collapse-panel key="1" header="页面入参">
      <div v-for="(item, index) in pageParamsList" :key="index">
        <a-input placeholder="请输入参数名" v-model:value="item.operateHrefPageParamName" style="width: 200px; margin-bottom: 4px" size="mini"></a-input>
        <a-button type="text" size="mini" @click="removePageParam(index)" style="margin-left: 20px; color: #666666">
          <template #icon> <i class="iconfont icontrash"></i> </template>
        </a-button>
      </div>
      <a-button type="link" size="mini" @click="addPageParam">添加入参</a-button>
    </a-collapse-panel>
    <a-collapse-panel key="2" header="页面变量">
      <div v-for="(item, index) in pageVariableList" :key="index">
        <a-input placeholder="变量名" v-model:value="item.variableName" style="width: 92px; margin-bottom: 4px; margin-right: 8px" size="mini"></a-input>
        <a-input placeholder="默认值" v-model:value="item.variableValue" style="width: 100px; margin-bottom: 4px" size="mini"></a-input>
        <a-button type="text" size="mini" @click="removePageVariable(index)" style="margin-left: 20px; color: #666666">
          <template #icon> <i class="iconfont icontrash"></i> </template>
        </a-button>
      </div>
      <a-button type="link" size="mini" @click="addPageVariable">添加变量</a-button>
    </a-collapse-panel>
  </a-collapse>
</template>
<script setup lang="ts">
import { useDataStore } from '@/stores'
import { ref, computed } from 'vue'
import { type paramConfig } from '@/utils/type'

const store = useDataStore()

const pageParamsList = computed(() => {
  if (store.globalConfig) {
    return store.globalConfig.pageParamsList
  } else {
    return []
  }
})

const pageVariableList = computed(() => {
  if (store.globalConfig) {
    return store.globalConfig.pageVariableList
  } else {
    return []
  }
})

let paramsActiveNames = ref(['1', '2'])

function removePageParam(index: number) {
  store.globalConfig.pageParamsList.splice(index, 1)
}

function addPageParam() {
  if (!store.globalConfig.pageParamsList) {
    store.globalConfig.pageParamsList = []
  }
  store.globalConfig.pageParamsList.push({
    operateHrefPageParamName: '',
    operateHrefPageParamValue: ''
  } as paramConfig)
}

function removePageVariable(index: number) {
  store.globalConfig.pageVariableList.splice(index, 1)
}

function addPageVariable() {
  if (!store.globalConfig.pageVariableList) {
    store.globalConfig.pageVariableList = []
  }
  store.globalConfig.pageVariableList.push({
    variableName: '',
    variableValue: '',
    defaultValue: ''
  } as paramConfig)
}
</script>
<style scoped></style>
