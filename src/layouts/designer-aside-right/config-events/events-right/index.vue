<template>
  <div style="overflow: auto">
    <div id="container" style="background-color: white"></div>
    <div id="menu">
      <div>
        <button id="delete-button" @click="deleteDiagram">删除</button>
      </div>
    </div>
    <a-drawer title="Basic Drawer" placement="bottom" :closable="true" :open="openJSDrawer" :get-container="false" :style="{ position: 'absolute' }" @close="openJSDrawer = false">
      <EventJavascript ref="jsEvent"></EventJavascript>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, computed } from 'vue'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import EventFlow from './eventFlow'
import EventJavascript from '../events-left/config-event/event-javascript.vue'
import { CustomEventsType } from '@/utils/constants'

const props = defineProps({
  draggingNode: String,
  draggingNodeName: String
})

const openJSDrawer = ref(false)
const jsEvent = ref()
const eventList = computed(() => store.eventList)
const eventType = computed(() => store.eventType)
const pageConfig = computed(() => store.pageConfig)
const store = useDataStore()
const route = useRoute()
const deviceType = route.params.device
let currentCheckedComponent = store.currentCheckedComponent
let nextflow = ref(undefined) as any
// const eventList = ref([]);
// const eventList = props.eventList
const showDelete = ref(false)
const selectedDiagram = ref({}) as any

// const draggingNode = ref(null) as any;
// const draggingNodeName = ref(null) as any;

function onSelect(diagram: any) {
  console.log('onSelect', diagram)
  store.isShowEventLeftMenu = false
  store.curDiagram = diagram
  if (diagram.type === 'event-operate-javascript') {
    openJSDrawer.value = true
    setTimeout(() => {
      jsEvent.value.onOpen(diagram.properties.sourceCodeStr || '')
    }, 100)
  }
}

function drop(e: any) {
  e.preventDefault()
  nextflow.value.stage.setPointersPositions(e)
  const pos = nextflow.value.stage.getPointerPosition()
  nextflow.value.createDiagram(props.draggingNode, props.draggingNodeName, pos.x, pos.y)
  if (CustomEventsType.indexOf(props.draggingNode as string) > -1) {
    store.saveCustomEvent(props.draggingNode, props.draggingNodeName)
  }
}

function deleteDiagram() {
  var r = confirm('是否删除该组件?')
  if (r == true) {
    if (selectedDiagram.value !== undefined) {
      //删除组件的时候，需要将对应的变量一起删除
      nextflow.value.deleteDiagram(selectedDiagram.value)
      store.deleteCustomEvent(selectedDiagram.value.type)
    }
  }
}

async function initEventFlow() {
  // let _this = this;
  await nextTick()
  // nextTick(() => {
  // var a = Konva;
  let width = document.body.clientWidth - 260 - 75
  let height = document.body.clientHeight - 100
  nextflow.value = new EventFlow(width, height)

  // let draggingNode = null;
  // let draggingNodeName = null;
  // document
  //   .getElementById("drag-items")
  //   .addEventListener("dragstart", _this.dragStart);

  let con = nextflow.value.stage.container()
  con.addEventListener('dragover', function (e: any) {
    e.preventDefault() // !important
  })

  con.addEventListener('drop', drop)

  // let nextflow = _this.nextflow;
  let currentShape

  nextflow.value.on('click', onSelect)

  let menuNode = document.getElementById('menu') || document.body

  window.addEventListener('click', (e: any) => {
    // hide menu
    menuNode.style.display = 'none'
  })
  nextflow.value.stage.on('click', function (e: any) {
    if (!e.target.parent) {
      console.log('stage click', store.curDiagram)
      store.isShowEventLeftMenu = true
    }
  })

  nextflow.value.stage.on('contextmenu', function (e: any) {
    // prevent default behavior
    e.evt.preventDefault()
    if (e.target === nextflow.value.stage) {
      return
    }
    currentShape = e.target.parent
    selectedDiagram.value = currentShape.diagram
    if (selectedDiagram.value !== undefined && selectedDiagram.value.type === 'start') {
      showDelete.value = false
    } else {
      showDelete.value = true
    }
    // show menu
    menuNode.style.display = 'initial'

    let pos = currentShape.absolutePosition()
    menuNode.style.top = pos.y + 10 + 'px' // currentShape. nextflow.stage.getPointerPosition().y + 10 +'px';
    menuNode.style.left = pos.x + 44 + 'px' // nextflow.stage.getPointerPosition().x + 10 + 'px';
  })

  let actionList = [] as any[]
  if (currentCheckedComponent.type == 'van-design-table') {
    if (JSON.stringify(store.curColumn) == '{}') {
      eventList.value.forEach((item: any) => {
        if (item.eventType === eventType.value) {
          actionList = item.actionList
        }
      })
    } else {
      // 表格确认事件特殊处理
      if (eventType.value == 'confirm') {
        actionList = store.curColumn.confirmEventList
      } else if (store.curColumn.eventConfig) {
        let tableEventList = store.curColumn.eventConfig.eventList
        tableEventList &&
          tableEventList.forEach((item: any) => {
            if (item.eventType === eventType.value) {
              actionList = item.actionList
            }
          })
      }
    }
  } else {
    eventList.value.forEach((item: any) => {
      if (item.eventType === eventType.value) {
        actionList = item.actionList
      }
    })
  }

  console.log('initEventFlow=', actionList, nextflow)
  if (actionList.length > 0) {
    nextflow.value.destroyChildren()
    let scheme = {
      nodes: actionList
    }
    console.log('scheme', scheme)
    nextflow.value.import(scheme)
  } else {
    // this.initData();
    nextflow.value.import({
      nodes: [
        {
          version: 1,
          id: 0,
          x: 100,
          y: 81,
          title: '开始',
          type: 'start',
          outputs: [{ id: 0, x: 280, y: 91, title: null }],
          properties: {}
        }
      ]
    })
  }
  // });
}

function onHandleClose() {
  let configJson = nextflow.value.export()
  let eventList = []
  if (currentCheckedComponent.options) {
    if (currentCheckedComponent.type == 'van-design-table') {
      if (eventType.value == 'confirm') {
        eventList = store.curColumn.confirmEventList
      } else {
        // 判断store.curColumn 为{}
        if (Object.keys(store.curColumn).length === 0) {
          //   currentCheckedComponent.options.eventConfig.eventList = eventList
          eventList = currentCheckedComponent.options.eventConfig.eventList
        } else {
          if (!store.curColumn.eventConfig) {
            store.curColumn['eventConfig'] = {
              eventList: [
                {
                  actionList: [],
                  version: '1.0.0',
                  eventType: 'click'
                },
                {
                  actionList: [],
                  version: '1.0.0',
                  eventType: 'change'
                }
              ]
            }
          }
          eventList = store.curColumn.eventConfig.eventList
        }
      }
    } else {
      // console.log('currentCheckedComponent==', currentCheckedComponent)

      eventList = currentCheckedComponent.options.eventConfig.eventList
    }
  } else {
    if (pageConfig.value && pageConfig.value.eventConfig) {
      eventList = pageConfig.value.eventConfig.eventList
    }
  }

  let eventItem = {} as any
  eventList.forEach((item: any) => {
    if (item.eventType === eventType.value) {
      eventItem = item
    }
  })

  // 确认事件特殊处理
  if (eventType.value == 'confirm') {
    store.curColumn.confirmEventList = configJson.nodes
  } else {
    eventItem.actionList = configJson.nodes
  }
  //
  // return configJson.nodes;
}

onMounted(() => {
  initEventFlow()
})
defineExpose({
  onHandleClose
})
</script>

<style lang="less" scoped>
#menu {
  display: none;
  position: absolute;
  width: 60px;
  background-color: white;
  box-shadow: 0 0 5px grey;
  border-radius: 3px;
}

#menu span {
  display: inline-block;
}
#menu button {
  width: 100%;
  background-color: white;
  border: none;
  margin: 0;
  padding: 10px;
  color: #333333;
}

#menu button:hover {
  background-color: #17678b;
}
</style>
