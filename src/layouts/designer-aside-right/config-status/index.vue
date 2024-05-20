<template>
  <a-modal class="event-config" width="100%" wrap-class-name="full-modal" v-model:open="isShowDialog" title="事件行为配置" :maskClosable="false" :destroyOnClose="true" :footer="null" @cancel="cancel">
    <div class="events">
      <StatusLeft ref="leftMenu" class="events-left" :isOperate="isOperate" @onDragNode="onDragNode" />
      <StatusRight class="events-right" ref="eventsRightRef" :eventType="eventType" :draggingNode="draggingNode" :draggingNodeName="draggingNodeName" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { ref, defineComponent, nextTick, onMounted } from 'vue'
import { mapState } from 'pinia'
import { useDataStore } from '@/stores'

import StatusLeft from './status-left/index.vue'
import StatusRight from './status-right/index.vue'
export default defineComponent({
  name: 'ConfigEvents',
  components: {
    StatusLeft,
    StatusRight
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    eventType: {
      type: String,
      default: 'click'
    },
    isOperate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isShowDialog: {
      get() {
        return this.dialogVisible
      },
      set(val: boolean) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  setup() {
    const draggingNode = ref(null) as any
    const draggingNodeName = ref(null) as any
    const eventsRightRef = ref()

    return {
      eventsRightRef,
      draggingNode,
      draggingNodeName,
      onDragNode(dragNode: any) {
        draggingNode.value = dragNode.draggingNode
        draggingNodeName.value = dragNode.draggingNodeName
      },
      cancel() {
        eventsRightRef.value.onHandleClose()
      }
    }
  }
})
</script>

<style lang="less" scoped>
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
