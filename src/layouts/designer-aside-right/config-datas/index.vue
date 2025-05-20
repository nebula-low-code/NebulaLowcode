<template>
  <div class="config-datas">
    <div style="display: flex; align-items: center">
      <div class="config-datas-title">
        后端数据
        <a-tooltip>
          <template #title>
            <span>配置后端数据的获取方式</span>
          </template>
          <exclamation-circle-filled />
        </a-tooltip>
      </div>
      <div>
        <a-button type="link" @click="addMockData">MOCK</a-button>
      </div>
    </div>

    <!-- Modal -->
    <AddMockModal ref="mockModalRef" :use-mock-data="useMockData" />
    <!-- 接口列表 -->
    <a-collapse :bordered="false" v-model:activeKey="activeKey" expandIconPosition="right" style="min-height: 260px; background-color: white">
      <a-collapse-panel :header="(interfaceItem.data.isMockData ? 'MOCK数据: ' : '后端服务: ') + interfaceItem.data.name" v-for="(interfaceItem, key) in interfaceList" :key="key">
        <template #extra>
          <div>
            <i
              title="编辑"
              class="iconfont iconbianji"
              v-if="interfaceItem.data.isMockData"
              style="font-size: 16px; cursor: pointer; margin-right: 8px"
              @click.stop="editInterface(interfaceItem, false)"
            ></i>
            <i
              title="编辑"
              class="iconfont iconbianji"
              v-else-if="interfaceItem.type == 'radio-button-interface'"
              style="font-size: 16px; cursor: pointer; margin-right: 8px"
              @click.stop="toProcess(interfaceItem)"
            ></i>
            <i title="删除" class="iconfont icontrash" style="font-size: 16px; cursor: pointer" @click.stop="deleteInterface(interfaceItem)"></i>
          </div>
        </template>
        <InterfaceDataConfig :interfaceDataConfig="interfaceItem"></InterfaceDataConfig>
        <div style="display: flex" v-if="!interfaceItem.data.isMockData">
          <a-checkbox style="flex: 1" v-model:checked="interfaceItem.data.useMockData">使用MOCK数据</a-checkbox>
          <i title="编辑" class="iconfont iconbianji" style="font-size: 16px; cursor: pointer; margin-right: 8px" @click.stop="editInterface(interfaceItem, true)"></i>
        </div>
      </a-collapse-panel>
    </a-collapse>

    <div v-if="store.currentCheckedComponent.options" style="padding-top: 10px">
      <div class="config-datas-title">
        数据配置
        <a-tooltip>
          <template #title>
            <span>配置组件的数据使用方式</span>
          </template>
          <exclamation-circle-filled />
        </a-tooltip>
      </div>
      <ConfigComponent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores'

import AddMockModal from './modal/add-mock.vue'
import InterfaceDataConfig from './config-interface.vue'
import ConfigComponent from './config-component.vue'
import { ExclamationCircleFilled } from '@ant-design/icons-vue'
import { type interfaceDataConfig } from '@/utils/type'

const store = useDataStore()

let activeKey = ref([])
let useMockData = ref(false) //是否是后端接口的mock数据
const interfaceModalRef = ref()
const mockModalRef = ref()
const interfaceList = computed(() => store.interfaceList as interfaceDataConfig[])

function openInterfaceModal() {
  interfaceModalRef.value.onOpen()
}

function addMockData() {
  useMockData.value = false
  mockModalRef.value.onOpen()
}

function editInterface(interfaceItem: interfaceDataConfig, mockData: boolean) {
  useMockData.value = mockData
  mockModalRef.value.onOpen(interfaceItem)
}
function toProcess(interfaceItem: interfaceDataConfig) {
  const data = {
    id: interfaceItem.data.id,
    dataType: 'process',
    subType: 'process',
    queryId: interfaceItem.data.id,
    name: interfaceItem.data.name, //processName
    treeId: interfaceItem.data.id,
    version: 'V5'
  }

  store.nebulaMessage = {
    type: 'process',
    data: data
  }
}
function deleteInterface(interfaceItem: interfaceDataConfig) {
  delete store.interfaceMap[interfaceItem.id]
}
</script>

<style scoped>
.config-datas {
  text-align: left;
}

.config-datas-title {
  font-weight: 500;
  height: 32px;
  line-height: 32px;
  flex: 1;
  margin-left: 8px;
}
</style>
