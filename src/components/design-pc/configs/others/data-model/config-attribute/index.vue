<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="选择模型">
        <!-- <a-cascader :value="options.echoValues" :options="modelList" :field-names="{ value: 'id', label: 'name' }" placeholder="请选择数据模型" @change="onChange" /> -->

        <a-select v-model:value="options.dataModelId" placeholder="请选择数据模型" style="width: 200px" allowClear>
          <a-select-option v-for="item in modelList" :value="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import { getModelAll } from '@/api/data-model'
import { message } from 'ant-design-vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const modelList = ref()

getModelAll().then((res: any) => {
  modelList.value = res.dataList || []
  //   modelList.value.forEach((item) => {
  //     item.id = item.scopeId
  //   })
})

function onChange(value: any, selectedOptions: any) {
  if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
    let opt = selectedOptions[selectedOptions.length - 1]
    // console.log('selectedOptions---', opt)
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
</script>

<style lang="less" scoped></style>
