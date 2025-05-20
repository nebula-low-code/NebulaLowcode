<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="选择组件">
        <a-cascader :value="options.echoValues" :options="componentList" :field-names="{ value: 'queryId', label: 'name' }" placeholder="请选择组件" @change="onChange" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import { getComponentList } from '@/api/custom-component'
import { message } from 'ant-design-vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const componentList = ref()

getComponentList().then((res: any) => {
  componentList.value = res.dataList || []
})

function onChange(value: any, selectedOptions: any) {
  if (Array.isArray(selectedOptions) && selectedOptions.length > 0) {
    let opt = selectedOptions[selectedOptions.length - 1]
    // console.log('selectedOptions---', opt)
    if (opt.dataType === 'scope') {
      message.error('请选择组件')
    } else {
      options.value.customComponentId = opt.queryId
      options.value.echoValues = value
    }
  } else {
    delete options.value.customComponentId
    delete options.value.echoValues
  }
}
</script>

<style lang="less" scoped></style>
