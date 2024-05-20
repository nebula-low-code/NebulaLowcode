<template>
  <div>
    <a-select placeholder="打开页面位置" v-model:value="properties.openType" style="margin-top: 8px; width: 100%">
      <a-select-option value="current"> 当前页面 </a-select-option>
      <a-select-option value="blank"> 新页面 </a-select-option>
    </a-select>
    <a-radio-group v-model:value="properties.dynamic">
      <a-radio :value="false">
        <a-input placeholder="请输入外链地址" v-model:value="properties.linkUrl" style="width: 227px; margin: 8px 0" />
      </a-radio>
      <a-radio :value="true">
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <EventValueSelect :param-item="properties.linkDynamic" style="width: 227px" />
        </span>
      </a-radio>
    </a-radio-group>
    <div style="margin: 8px 0">参数配置</div>
    <div v-for="(param, index) in properties.params" :key="index" style="display: flex; align-items: center; margin-bottom: 8px">
      <a-input style="width: 80px; flex-shrink: 0" placeholder="参数名" v-model:value="param.param_name"></a-input>
      <EventValueSelect :hide-event-interface="true" :param-item="param" style="margin: 0 8px; width: 130px" />
      <i class="iconfont icontrash" style="font-size: 16px; cursor: pointer" @click="delParam(index)"></i>
    </div>
    <a-button type="link" @click="addParam">添加入参</a-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)
function addParam() {
  if (!properties.value.params) {
    properties.value.params = []
  }
  properties.value.params.push({})
}
function delParam(index: number) {
  properties.value.params.splice(index, 1)
}
</script>
<style scoped></style>
