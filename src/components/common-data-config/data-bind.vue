<template>
  <div class="config-datas-title">
    <div>
      数据绑定
      <a-tooltip>
        <template #title>
          <span>使用列表的模板数据时需要配置数据绑定</span>
        </template>
        <exclamation-circle-filled />
      </a-tooltip>
    </div>
    <a-cascader
      style="width: 100%"
      :value="echoCascadeValue"
      :options="options"
      placeholder="请选择"
      @change="onChange"
    ></a-cascader>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'

const props = defineProps<{
  componentOptions: any
}>()

const store = useDataStore()

const echoCascadeValue = computed(() => {
  let echoList: any[] = []
  //找出绑定的父组件的数据源
  let comp = store.componentConfigByUuid(props.componentOptions._data_origin_component_uuid)
  if (comp) {
    let uuid = comp.options.interfaceDataConfig.uuid || comp.options.interfaceDataConfig.id
    if (
      store.interfaceMap.hasOwnProperty(uuid) &&
      props.componentOptions.interfaceDataConfig.bindDataKey
    ) {
      echoList = [
        uuid,
        comp.options.interfaceDataConfig.key,
        props.componentOptions.interfaceDataConfig.bindDataKey
      ]
    }
  }
  return echoList
})

const options = computed(() => {
  let dataConfigOptions: any[] = []
  //找出绑定的父组件的数据源
  let comp = store.componentConfigByUuid(props.componentOptions._data_origin_component_uuid)
  if (comp) {
    let uuid = comp.options.interfaceDataConfig.uuid || comp.options.interfaceDataConfig.id
    let interfaceData = store.interfaceDataById(uuid)
    console.log('interfaceData****', interfaceData)
    if (interfaceData) {
      let responseData = interfaceData.data.responseData
      let obj = {
        label: interfaceData.data.name,
        value: interfaceData.id,
        children: [] as any[]
      }
      if (responseData && typeof responseData === 'object' && !(responseData instanceof Array)) {
        for (let key in responseData) {
          if (key === comp.options.interfaceDataConfig.key) {
            let objChildrenItem = {
              label: key,
              value: key
            }
            obj.children.push(objChildrenItem)
            console.log('key=', key)

            if (
              responseData[key] &&
              typeof responseData[key] === 'object' &&
              !(responseData[key] instanceof Array)
            ) {
              console.log('deepHandleResponse=', key)

              deepHandleResponse(objChildrenItem, responseData[key], interfaceData.type)
            } else if (responseData[key] instanceof Array) {
              // 列表接口
              console.log('deepHandleListResponse=', key)
              deepHandleListResponse(objChildrenItem, responseData[key], interfaceData.type)
            }
          }
        }
      }
      dataConfigOptions.push(obj)
    }
  }
  console.log('dataConfigOptions=', dataConfigOptions)

  return dataConfigOptions
})

function onChange(values: any, selectedOptions: any) {
  // console.log('---values---', values)
  // console.log('---selectedOptions---', selectedOptions)
  if (selectedOptions && selectedOptions.length > 0) {
    delete props.componentOptions.interfaceDataConfig.bindDataKey
    delete props.componentOptions.interfaceDataConfig.value

    props.componentOptions.contentDataSource = 'radio-button-bind'
    props.componentOptions.interfaceDataConfig.bindDataKey =
      selectedOptions[selectedOptions.length - 1].value
  } else {
    delete props.componentOptions.interfaceDataConfig.bindDataKey
    delete props.componentOptions.interfaceDataConfig.value
  }
}

function deepHandleResponse(obj: any, responseData: any, type: string) {
  obj.children = []
  for (let key in responseData) {
    let objChildrenItem = {
      label: key,
      value: key
    }

    obj.children.push(objChildrenItem)
    if (
      responseData[key] &&
      typeof responseData[key] === 'object' &&
      !(responseData[key] instanceof Array)
    ) {
      deepHandleResponse(objChildrenItem, responseData[key], type)
    } else if (responseData[key] instanceof Array) {
      // 列表接口
      deepHandleListResponse(objChildrenItem, responseData[key], type)
    }
  }
}
function deepHandleListResponse(obj: any, responseData: any, type: string) {
  // 数组处理
  obj.children = []
  // 接口解析列表，默认取第一个
  let rItem = responseData[0]

  for (let key in rItem) {
    let objChildrenItem = {
      label: key,
      value: key
    }
    obj.children.push(objChildrenItem)
  }
}
</script>
<style scoped>
.config-datas-title {
  /* font-weight: 500; */
  height: 32px;
  line-height: 32px;
  margin-left: 8px;
}
</style>
