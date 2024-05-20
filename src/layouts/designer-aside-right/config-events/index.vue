<template>
  <a-modal class="event-config" wrap-class-name="full-modal" width="100%" title="事件行为配置" :maskClosable="false" :footer="null" :destroyOnClose="true" @cancel="cancel">
    <div class="events">
      <EventsLeft ref="leftMenu" class="events-left" @onDragNode="onDragNode" />
      <EventsRight ref="eventsRightRef" class="events-right" :draggingNode="draggingNode" :draggingNodeName="draggingNodeName" />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores'
import EventsLeft from './events-left/index.vue'
import EventsRight from './events-right/index.vue'
const draggingNode = ref(null) as any
const draggingNodeName = ref(null) as any
const eventsRightRef = ref()

function onDragNode(dragNode: any) {
  draggingNode.value = dragNode.draggingNode
  draggingNodeName.value = dragNode.draggingNodeName
}
function cancel() {
  eventsRightRef.value.onHandleClose()
}
</script>

<style lang="less">
.events {
  display: flex;
  height: 100%;
  &-left {
    width: 260px;
  }
  &-right {
    position: relative;
    flex: 1;
    border-left: 1px solid #f0f0f0;
    padding: 10px;
  }
}

.full-modal {
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
    top: 0;
  }
  .ant-modal-body {
    padding: 0px;
    height: calc(100% - 40px);
  }

  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
}
</style>
