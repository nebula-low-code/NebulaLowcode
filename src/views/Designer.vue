<template>
  <a-layout :style="{ textAlign: 'left' }">
    <DesignerHeader @onSave="onSave" @onReload="initPageData" @onClear="onClear" @loadConfigJson="onLoadHistory" />
    <a-layout>
      <DesignerAsideLeft />
      <a-layout-content style="position: relative">
        <div class="content" v-if="isShowDesignContent">
          <DesignerMain :componentTreeList="componentTreeList" @on-paste-page="onPastePage" />
        </div>
      </a-layout-content>
      <DesignerAsideRight />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { useDataStore } from '@/stores'

// component config
import { transformComponentConfigToFull, componentListTreeToStore, globalVariableToStore } from '@/utils/transform-data-list'
import { componentConfigMap } from '@/components/design-pc/configs'

import DesignerHeader from '@/layouts/designer-header/index.vue'
import DesignerAsideLeft from '@/layouts/designer-aside-left/index.vue'
import DesignerAsideRight from '@/layouts/designer-aside-right/index.vue'
import DesignerMain from '@/layouts/designer-content/index.vue'

// hooks
import usePageSave from '@/hooks/design-page-operate/use-save'
import usePageClear from '@/hooks/design-page-operate/use-clear'

// api
import { fetchApiList } from '@/api/fetch-api'
import { iconList } from '@/api/api'
import { loadCss } from '@/utils/load-css'
import { useRouter } from 'vue-router'
import { getStorage } from '@/utils/storage-util'
const { currentRoute } = useRouter()
const store = useDataStore()
const isShowDesignContent = ref(true) // 用于重新渲染
const componentTreeList = ref([]) as any
const route = currentRoute.value
const deviceType = route.params.device

const componentConfig = componentConfigMap
let reportId = 'nebulaSampleReportId'
let token = 'nebulaSampleToken'
let phone = 'nebulaSamplePhone'

const { onSave } = usePageSave(componentTreeList, reportId)
const { onClear } = usePageClear(componentTreeList)

watch(
  () => store.nebulaMessage,
  () => {
    let data = store.nebulaMessage
    if (Object.keys(data).length === 0) {
    } else {
      window.parent.postMessage(JSON.stringify(data), '*')
      store.nebulaMessage = {}
    }
  },
  {
    immediate: true
  }
)
onMounted(() => {
  initPageData()
})

const initPageData = async () => {
  store.deviceType = route.params.device as string
  store.phone = phone
  store.token = token

  let configJson = getStorage(reportId)
  if (!configJson) {
    configJson = JSON.stringify({
      list: [],
      config: {
        reportId: reportId
      },
      eventConfig: {}
    })
  }

  let tempConfig = JSON.parse(configJson)
  tempConfig.config.reportId = reportId

  store.pageConfig = tempConfig
  let componentConfigList = store.pageConfig.list

  //保存组件
  componentTreeList.value = []
  transformComponentConfigToFull(componentConfigList, componentTreeList.value, componentConfig)
  store.componentTreeList = componentTreeList.value
  componentListTreeToStore(componentTreeList.value)

  //请求页面接口
  store.clearInterfaceData()
  fetchApiList(store.pageConfig.config.interfaceDataConfig, reportId)

  //页面局部变量
  store.setPageVariableList(store.pageConfig.config.pageVariableList)

  //iconfont图标
  iconList({
    type: 'custom'
  }).then((res) => {
    store.iconList = res.data.iconList
    let cssUrl = res.data.cssUrl
    loadCss(cssUrl)
  })
}
function onLoadHistory(configJson: string) {
  store.pageConfig = JSON.parse(configJson)
  let componentConfigList = store.pageConfig.list

  //保存组件
  componentTreeList.value = []
  transformComponentConfigToFull(componentConfigList, componentTreeList.value, componentConfig)
  store.componentTreeList = componentTreeList.value
  componentListTreeToStore(componentTreeList.value)

  //请求页面接口
  store.clearInterfaceData()
  fetchApiList(store.pageConfig.config.interfaceDataConfig, reportId)
}

function onPastePage(pageId: any) {
  let configJson = getStorage(reportId)
  if (configJson) {
    store.pageConfig = JSON.parse(configJson)
    let componentConfigList = store.pageConfig.list

    //保存组件
    componentTreeList.value = []
    transformComponentConfigToFull(componentConfigList, componentTreeList.value, componentConfig)
    store.componentTreeList = componentTreeList.value
    componentListTreeToStore(componentTreeList.value)

    //请求页面接口
    store.clearInterfaceData()
    fetchApiList(store.pageConfig.config.interfaceDataConfig, reportId)
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 16px;
  background-color: #f5f5f5;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
}
</style>
