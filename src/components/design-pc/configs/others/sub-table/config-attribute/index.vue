<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="选择模型">
        <!-- <a-cascader :value="options.echoValues" :options="modelList" :field-names="{ value: 'id', label: 'name' }" placeholder="请选择数据模型" @change="onChange" /> -->
        <a-select v-model:value="options.dataModelId" placeholder="请选择数据模型" style="width: 200px" allowClear @change="onChangeDataMode">
          <a-select-option v-for="item in modelList" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关联字段">
        <a-select v-model:value="options.dataModelConnectId" placeholder="请选择数据模型关联主表字段" style="width: 200px" allowClear>
          <a-select-option v-for="item in fieldList" :value="item.fieldKey">
            {{ item.fieldLabel }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="关联值">
        <InterfaceValueSelect style="width: 180px" :param-item="options.dataModelConnectConfig"></InterfaceValueSelect>
      </a-form-item>
      <a-form-item label="新增方式">
        <a-checkbox v-model:checked="options.singleAdd">单行添加</a-checkbox>
        <a-checkbox v-model:checked="options.batchAdd">批量选择添加</a-checkbox>
        <a-select v-model:value="options.batchModelId" placeholder="请选择数据模型" style="width: 200px; margin-top: 10px" allowClear v-if="options.batchAdd">
          <a-select-option v-for="item in modelList" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <!-- 全局是数据模型带出来的，这边仅仅只是展示 -->
      <div>
        全局不允许重复输入
        <a-tooltip>
          <template #title>
            <span>以下字段在关联表中设为不允许重复。除了在本记录中不能重复输入外，也不能与关联表中的所有数据重复。</span>
          </template>
          <exclamation-circle-filled />
        </a-tooltip>
      </div>
      <a-select v-model:value="globalUniqueList" style="width: 100%; margin: 10px 0" allowClear mode="multiple" disabled>
        <a-select-option v-for="item in fieldList" :value="item.fieldKey">
          {{ item.fieldLabel }}
        </a-select-option>
      </a-select>
      <!-- 这个是选的 -->
      <div>
        本记录内不允许重复输入
        <a-tooltip>
          <template #title>
            <span>以下字段不允许在当前主记录内重复输入</span>
          </template>
          <exclamation-circle-filled />
        </a-tooltip>
      </div>
      <a-select v-model:value="options.tableUnique" style="width: 100%; margin: 10px 0" allowClear mode="multiple">
        <a-select-option v-for="item in fieldList" :value="item.fieldKey">
          {{ item.fieldLabel }}
        </a-select-option>
      </a-select>
      <!-- <div>字段</div>
      <div v-for="field in fieldList" v-if="fieldList.length > 0">
        <a-input v-model:value="field.fieldLabel" />
      </div> -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { getModelAll, getModelDetail } from '@/api/data-model'
import { message } from 'ant-design-vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import DataValueSelect from '@/components/data-value-select/index.vue'
import InterfaceValueSelect from '@/components/param-value-select/index.vue'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const modelList = ref()
const fieldList = ref([])

const globalUniqueList = computed(() => {
  let gTemp = []
  fieldList.value.forEach((item) => {
    if (!item.systemField && item.required) {
      gTemp.push(item.fieldKey)
    }
  })
  return gTemp
})
getModelAll().then((res: any) => {
  modelList.value = res.dataList || []
  //   modelList.value.forEach((item) => {
  //     item.id = item.scopeId
  //   })
})

function onChange(value: any, selectedOptions: any) {
  if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
    let opt = selectedOptions[selectedOptions.length - 1]

    if (opt.dbConfigId) {
      options.value.dataModelId = opt.id
      options.value.echoValues = value
    } else {
      message.error('请选择数据模型')
    }
  } else {
    delete options.value.dataModelId
    delete options.value.echoValues
  }
}
function onChangeDataMode(value) {
  fieldList.value = []
  if (!value) {
    return
  }
  let params = {
    id: value
  }
  getModelDetail(params).then((res) => {
    fieldList.value = res.data.fieldList.filter((item) => {
      if (!item.systemField) {
        return item
      }
    })
    // 这边要做一次判断，options.columnList 是否已经有了配置，有了就用以前的，没有就新增
    if(!options.value.columnList){
        options.value.columnList=[]
    }
    let tempList = fieldList.value.map((item) => {
      const { fieldDetailConfig, ...rest } = item
      return rest
    })
    // 遍历临时列表，补充新增字段
    tempList.forEach((tempItem) => {
      if (options.value.columnList) {
        const exists = options.value.columnList.find((c) => c.fieldKey === tempItem.fieldKey)
        if (!exists) {
          options.value.columnList.push(tempItem)
        }
      }
    })
    console.log('onChangeDataMode---', options.value.columnList)

    store.setDataModel(value, options.value.columnList)
  })
}

onMounted(() => {
  if (options.value.dataModelId) {
    onChangeDataMode(options.value.dataModelId)
  }
})
</script>

<style lang="less" scoped></style>
