<template>
  <div class="designer-pc i-scrollbar-hide" :style="pageStyle">
    <a-config-provider :locale="zhCN">
      <draggable
        style="height: 100%"
        v-bind="{
          group: 'component',
          ghostClass: 'ghost',
          animation: 200,
          handle: '.drag-handle'
        }"
        @start="onDragStart"
        @end="onDragEnd"
        @add="onDragAdd"
        @change="onDragChanged"
        itemKey="index"
        :list="componentTreeList"
      >
        <template #item="{ element, index }">
          <DynamicComponent v-if="element.options" class="drag-handle" :componentConfig="element" :index="index" :component-list="componentTreeList" />
        </template>
      </draggable>
    </a-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { pageStyleConfig, bgImageStyleConfig } from '@/utils/common-style'
import { componentCopyConfig } from '@/utils/component-copy-config'
import { commonly, charts, inputs, others } from '@/components/design-pc/configs/index'
import draggable from 'vuedraggable'
import DynamicComponent from './dynamic-component.vue'
import { componentListTreeToStore, findInterfaceDataConfigs } from '@/utils/transform-data-list'
import { fetchApi } from '@/api/fetch-api'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn' // 当时不加日期内部的年月没有汉化
import bus from '@/utils/mitt'
const props = defineProps<{
  componentTreeList: any
}>()
const store = useDataStore()
const businesesRef = ref()
const businessComponentConfig = ref()

const pageStyle = computed(() => {
  return pageStyleConfig(store.globalConfig) + bgImageStyleConfig(store.globalConfig)
})

onMounted(() => {
  bus.all.clear()
  bus.on('saveToBusiness', (componentConfig: any) => {
    businessComponentConfig.value = componentConfig
    businesesRef.value.onOpen()
  })
})

// 拖拽操作
function onDragStart(item: any) {
  console.log('start', item)
}
function onDragEnd(item: any) {
  console.log('end', item, props.componentTreeList)
}

async function onDragChanged(item: any) {
  console.log('onDragChanged=', item)
  if (item.added) {
    let element = item.added.element
    // console.log('onDragChanged=', item)
    if (element.subType === 'business') {
      let currentItemIndex = item.added.newIndex
      //业务组件
      let detail = await getBusinessComponentDetail(element.id)
      let configJsonObj = JSON.parse(detail.data.configJson || '{}')
      // console.log('configJsonObj=', JSON.stringify(configJsonObj))
      let copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], configJsonObj.type, configJsonObj.options)

      //查找业务组件中绑定的接口,判断是否已经添加到页面中,若无,则添加到页面
      let interfaceList = findInterfaceDataConfigs(copyItem)
      for (const interfaceElement of interfaceList) {
        fetchApi(interfaceElement.paramsConfigs, interfaceElement.id, store.pageConfig.config.reportId).then((res) => {
          store.setInterfaceData(interfaceElement.uuid, {
            type: 'radio-button-interface',
            id: interfaceElement.uuid,
            data: {
              id: interfaceElement.id,
              name: interfaceElement.name,
              type: 'radio-button-interface',
              paramsConfigs: interfaceElement.paramsConfigs,
              responseData: res.data
            }
          })
        })
      }
      // console.log('copyItem=', JSON.stringify(copyItem))

      props.componentTreeList[currentItemIndex] = copyItem
      store.componentListMap[copyItem.uuid] = copyItem
      store.componentTreeList = props.componentTreeList

      componentListTreeToStore(props.componentTreeList)

      store.onChangeCurrentComponentUUID(copyItem.uuid)
    } else {
      //基础组件
      let currentItemIndex = item.added.newIndex
      let currentItem = element
      if (currentItem) {
        let copyItem
        if (currentItem.uuid) {
          copyItem = currentItem
        } else {
          copyItem = componentCopyConfig([...commonly, ...charts, ...inputs, ...others], currentItem.type, currentItem.options)
        }
        copyItem.options._data_origin_component_uuid = ''
        props.componentTreeList[currentItemIndex] = copyItem
        store.componentListMap[copyItem.uuid] = copyItem
        store.componentTreeList = props.componentTreeList
        store.onChangeCurrentComponentUUID(copyItem.uuid)
      }
    }
  }
}
function onDragAdd(item: any) {
  // console.log('onDragAdd=', item)
}
</script>

<style scoped>
.ghost {
  background-color: #f56c6c;
  border: 2px solid #f56c6c;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
  margin: 2px;
}
.designer-pc {
  height: calc(100vh - 72px);
  overflow-y: auto;
  text-align: left;
  /* padding: 15px 20px; */
  margin: 0 auto;
  box-shadow: 0 0 2px 1px #ccc;
  background-color: rgb(240, 242, 245);
  border-radius: 5px;
}
</style>
