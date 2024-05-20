<template>
  <div>
    <a-cascader
      :value="echoCascadeValue"
      style="width: 100%; margin-top: 8px"
      :field-names="{ label: 'name', value: 'queryId' }"
      :options="interfaceListAll"
      placeholder="请选择"
      @change="onChange"
    ></a-cascader>
    <!-- 参数配置 -->
    <div v-if="props.interfaceDataConfig.paramsConfigs && props.interfaceDataConfig.paramsConfigs.length > 0" style="margin: 8px 0">参数配置</div>
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item :label-col="labelCol" :label="param.param_name" v-for="(param, pKey) in props.interfaceDataConfig.paramsConfigs">
        <div v-if="isImport">
          <a-radio-group v-model:value="param.custom">
            <a-radio :value="false"> 自动匹配 </a-radio>
            <a-radio style="margin-bottom: 8px" :value="true"> 自定义 </a-radio>
          </a-radio-group>
          <EventValueSelect v-if="param.custom" :param-item="param" />
        </div>
        <EventValueSelect v-else :param-item="param" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'

import { getProcessParamService } from '@/api/api'

const store = useDataStore()
const route = useRoute()
const props = defineProps<{
  interfaceDataConfig: any
  properties: any
  isImport?: boolean
}>()
const labelCol = {
  style: {
    width: '70px',
    textAlign: 'left',
    fontWeight: '500',
    whiteSpace: 'normal',
    wordBreak: 'break-all'
  }
}
let successItem = [] as any
const interfaceListAll = computed(() => store.interfaceListAll)
// number   存储当前递归的路径
// name     存储当前递归数据的根name
const findItem = function (id: number, data: any, number: any, name: string = '') {
  data.forEach((element: any, index: number) => {
    //  递归开始先判断删除number中存储的上一步的错误路径
    if (index !== 0 && number.length > 1 && name !== number[number.length - 1]) {
      number.pop()
    }
    if (element.queryId !== id) {
      if (element.children && element.children.length > 0) {
        // 这一级id不相等且还有子集，传入子集和拼接好路径继续递归
        number.push(element.queryId)
        findItem(id, element.children, number, element.queryId)
      }
      // 判断当前子集是否走到最后一次判断了，如果是最后一个判断那就意味着对比完了也没找到，意味着
      // number保存的最后一个路径中没有要找的值，所以删除最后一个
      if (data.length === index + 1) {
        number.pop()
      }
    } else {
      //   id比对成功
      number.push(element.queryId)
      successItem = JSON.parse(JSON.stringify(number))
    }
  })
}
const echoCascadeValue = computed(() => {
  let number = [] as any
  let name = ''
  successItem = []
  findItem(props.interfaceDataConfig.operateApiId, interfaceListAll.value, number, name)
  return successItem
})

function onChange(values: any, selectedOptions: any) {
  // console.log('---values---', values)
  // console.log('---selectedOptions---', selectedOptions)
  let oldValue = props.interfaceDataConfig.operateApiId
  if (selectedOptions && selectedOptions.length > 0) {
    props.interfaceDataConfig.operateApiId = values[values.length - 1]
    props.properties.operateApiId = values[values.length - 1]
    props.interfaceDataConfig.paramsConfigs = []
    queryProcessApiParamAndRes(props.interfaceDataConfig.operateApiId)
  } else {
    props.interfaceDataConfig.operateApiId = null
    props.properties.operateApiId = null
    props.interfaceDataConfig.paramsConfigs = []
  }
  if (oldValue != props.interfaceDataConfig.operateApiId) {
    //删除旧的接口值
    store.eventInterfaceList = store.eventInterfaceList.filter((item) => item.id != oldValue)
  }
}
function queryProcessApiParamAndRes(id: number) {
  const data = {
    processId: id
  }
  getProcessParamService(data).then((res) => {
    let paramsList = res.data.params
    if (store.eventInterfaceList.filter((item) => item.id == id).length == 0) {
      store.eventInterfaceList.push({
        id: id,
        name: res.data.processName,
        res: res.data.res
      })
    }

    paramsList &&
      paramsList.forEach((item: any) => {
        let param: any = {
          param_name: item.name
        }
        if (props.isImport) {
          param.custom = item.custom || false
        }
        let existFlag = false
        props.interfaceDataConfig.paramsConfigs &&
          props.interfaceDataConfig.paramsConfigs.forEach((pConfig: any) => {
            if (item.name == pConfig.param_name) {
              existFlag = true
            }
          })
        if (!existFlag) {
          props.interfaceDataConfig.paramsConfigs.push(param)
        }
      })

    props.interfaceDataConfig.paramsConfigs &&
      props.interfaceDataConfig.paramsConfigs.forEach((pConfig: any, pIndex: any) => {
        let existFlag = false
        paramsList &&
          paramsList.forEach((dItem: any) => {
            if (dItem.name == pConfig.param_name) {
              existFlag = true
            }
          })
        if (!existFlag) {
          props.interfaceDataConfig.paramsConfigs.splice(pIndex, 1)
        }
      })
  })
}
</script>

<style scoped></style>
