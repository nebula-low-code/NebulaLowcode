<template>
  <div style="overflow: auto">
    <div id="container" style="background-color: white"></div>
    <div id="menu">
      <div>
        <button id="delete-button" @click="deleteDiagram">删除</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import StatusFlow from './statusFlow'

const props = defineProps({
  eventType: {
    type: String,
    default: 'click'
  },
  eventList: {
    type: Array,
    default: () => []
  },
  draggingNode: {},
  draggingNodeName: {}
})

const store = useDataStore()
const route = useRoute()
const deviceType = route.params.device

const currentCheckedComponent = store.currentCheckedComponent

const nextflow = ref(undefined) as any
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
  // await nextTick();
  // _this.$refs["rightMenu"].init(diagram);
}

function drop(e: any) {
  e.preventDefault()
  nextflow.value.stage.setPointersPositions(e)
  const pos = nextflow.value.stage.getPointerPosition()
  nextflow.value.createDiagram(props.draggingNode, props.draggingNodeName, pos.x, pos.y)
}

function deleteDiagram() {
  var r = confirm('是否删除该组件?')
  if (r == true) {
    if (selectedDiagram.value !== undefined) {
      //删除组件的时候，需要将对应的变量一起删除
      nextflow.value.deleteDiagram(selectedDiagram.value)
    }
  }
}

async function initStatusFlow() {
  store.isShowEventLeftMenu = true
  store.curDiagram = {}
  // let _this = this;
  await nextTick()

  // nextTick(() => {
  // var a = Konva;
  let width = document.body.clientWidth - 260 - 75
  let height = document.body.clientHeight - 100
  nextflow.value = new StatusFlow(width, height)

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

  let eventList = []
  if (currentCheckedComponent.type == 'van-design-table') {
    eventList = store.curColumn.statusEventList
  } else {
    eventList = currentCheckedComponent.options.statusEventList
  }

  console.log('----renderer----import', store.curColumn, eventList, props.eventType)
  if (eventList && eventList.length > 0) {
    nextflow.value.destroyChildren()
    let scheme = {
      nodes: eventList
    }
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

  if (currentCheckedComponent.type == 'van-design-table') {
    //表格的列渲染
    store.curColumn.statusEventList = configJson.nodes
  } else {
    //其他组件在列表中的渲染
    currentCheckedComponent.options.statusEventList = configJson.nodes
  }
  // return configJson.nodes;
}

onMounted(() => {
  initStatusFlow()
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
