<template>
  <div>
    <a-modal v-model:open="visibleModal" title="添加接口" cancelText="取消" okText="确认" :width="850" @ok="onModalOk" :closable="false" :maskClosable="false" :bodyStyle="{ padding: '0px' }">
      <div class="interface">
        <div class="interface-left">
          <p :class="{ active: currentConnectId === 0 }" @click="onChangeServe">后端服务</p>
          <p :class="{ active: currentConnectId === connectItem.id }" v-for="(connectItem, key) in connectList" :key="key" @click="onChangeConnect(connectItem.id)">接口：{{ connectItem.name }}</p>
        </div>
        <div class="interface-right" v-if="currentConnectId === 0">
          <p class="interface-right--title">后端服务</p>
          <ul class="interface-right--content">
            <template v-for="(apiItem, key) in interfaceApiList" :key="key">
              <template v-if="apiItem.dataType === 'directory'">
                <p style="background-color: #ccc; padding: 5px 10px">{{ apiItem.name }}</p>
                <li
                  :class="{ active: currentServeInterfaceId === interfaceItem.queryId }"
                  v-for="(interfaceItem, key) in apiItem.children"
                  :key="key"
                  @click="onChangeServeInterface(interfaceItem.queryId, interfaceItem)"
                >
                  {{ interfaceItem.name }}
                </li>
              </template>
              <template v-else>
                <li
                  :class="{ active: currentServeInterfaceId === apiItem.queryId }"
                  style="display: inline-block; width: 33%; padding-bottom: 10px"
                  @click="onChangeServeInterface(apiItem.queryId, apiItem)"
                >
                  {{ apiItem.name }}
                </li>
              </template>
            </template>
          </ul>
        </div>
        <div class="interface-right" v-else>
          <p class="interface-right--title">系统连接</p>
          <ul class="interface-right--content">
            <template v-for="(connectProcessItem, key) in connectProcessList" :key="key">
              <template v-if="connectProcessItem.dataType === 'directory'">
                <p style="background-color: #ccc; padding: 5px 10px">{{ connectProcessItem.name }}</p>
                <li
                  :class="{ active: currentConnectProcessId === interfaceItem.queryId }"
                  v-for="(interfaceItem, key) in connectProcessItem.children"
                  :key="key"
                  @click="onChangeConnectProcess(interfaceItem.queryId, interfaceItem)"
                >
                  {{ interfaceItem.name }}
                </li>
              </template>
              <template v-else>
                <li
                  :class="{ active: currentConnectProcessId === connectProcessItem.queryId }"
                  style="display: inline-block; width: 33%; padding-bottom: 10px"
                  @click="onChangeConnectProcess(connectProcessItem.queryId, connectProcessItem)"
                >
                  {{ connectProcessItem.name }}
                </li>
              </template>
            </template>

            <!-- <li
              :class="{ active: currentConnectProcessId === connectProcessItem.queryId }"
              @click="onChangeConnectProcess(connectProcessItem.queryId, connectProcessItem)"
            >
            
              {{ connectProcessItem }}
            </li> -->
          </ul>
        </div>
      </div>
    </a-modal>
  </div>

  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { generateUUID } from '@/utils/uuid'
import { getConnectListService } from '@/api/api'
import { useDataStore } from '@/stores'

const dataStore = useDataStore()
const visibleModal = ref(false)

const currentApiItemData = ref({}) as any // 当前选中的api对象
const interfaceApiList = ref<any>([])
const connectList = ref<any>([])
const connectProcessList = ref<any>([])
const currentConnectId = ref(0)
const currentConnectProcessId = ref(0)
const currentServeInterfaceId = ref(0)

// 后端服务
// function queryInterfaceDataList() {
//   getProjectFileTreeList().then((res: any) => {
//     interfaceApiList.value = res.dataList
//   })
// }
// function queryConnectList() {
//   getConnectListService().then((res: any) => {
//     if (res.code == 0) {
//       connectList.value = res.dataList
//     }
//   })
// }
// // 系统连接
// function queryConnectProcessList(connectId: any) {
//   getConnectProcessList({
//     connectId
//   }).then((res: any) => {
//     connectProcessList.value = res.dataList || []
//   })
// }

function onChangeServe() {
  currentConnectId.value = 0
  currentConnectProcessId.value = 0
  currentServeInterfaceId.value = 0
  currentApiItemData.value = {}
}
function onChangeConnect(id: number) {
  currentConnectId.value = id
  queryConnectProcessList(id)
}
function onChangeConnectProcess(id: number, itemData: any) {
  currentConnectProcessId.value = id
  currentApiItemData.value = itemData
}
function onChangeServeInterface(id: number, itemData: any) {
  currentServeInterfaceId.value = id
  currentApiItemData.value = itemData
}

function onOpen() {
  visibleModal.value = true
  // queryInterfaceDataList()
  // queryConnectList()
}
function onModalOk() {
  // let interfaceData = {} as interfaceDataConfig
  // interfaceData.type = 'radio-button-interface'
  // interfaceData.id = generateUUID('data-interface-')
  let type = 'radio-button-interface'
  if (currentConnectProcessId.value) {
    type = 'radio-button-connect'
  }

  dataStore.addInterface({
    type: type,
    id: generateUUID('data-interface-'),
    data: {
      id: currentConnectProcessId.value || currentServeInterfaceId.value,
      name: currentApiItemData.value.name || '',
      responseData: {}
    }
  })
  visibleModal.value = false
}

defineExpose({
  onOpen
})
</script>

<style lang="less" scoped>
:deep(.ant-modal-header) {
  display: none;
}
.interface {
  display: flex;
  min-height: 500px;
  .active {
    color: #409eff;
  }
  &-left {
    width: 200px;
    font-weight: bold;
    border-right: 1px solid #ccc;
    p {
      cursor: pointer;
      padding: 10px;
      padding-left: 20px;
    }
  }
  &-right {
    flex: 1;
    padding: 10px;
    height: 500px;
    overflow-y: auto;
    &--title {
      font-weight: bold;
    }
    &--content {
      padding-left: 10px;
      li {
        display: inline-block;
        width: 33%;
        padding-bottom: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
@/api/api import { getProjectFileTreeList } from '@/api/getProjectFileTreeList';
