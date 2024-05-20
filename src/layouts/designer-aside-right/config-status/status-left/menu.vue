<template>
  <draggable
    tag="ul"
    class="menu-item-wrap"
    :list="list"
    v-bind="{
      group: { name: 'event', pull: 'clone', put: false },
      sort: false,
      ghostClass: 'ghost'
    }"
    itemKey="name"
    @start="onDragMoveStart($event)"
  >
    <template #item="{ element, index }">
      <li>
        <div class="icon-wrap">
          <img
            class="drag-shape-icon"
            :data-shape-type="element.type"
            :data-shape-name="element.name"
            :src="element.url"
          />
        </div>
        <div class="icon-text">
          <span>{{ element.name }}</span>
        </div>
      </li>
    </template>
  </draggable>
</template>

<script lang="ts">
import { loginServer } from '@/api/api'
import { ref, defineComponent } from 'vue'
import draggable from 'vuedraggable'

import useDragNode from '../hooks/use-drag-node'

export default defineComponent({
  name: 'DesignerAsideLeftMenu',
  components: {
    draggable: draggable
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, context) {
    const { draggingNode, draggingNodeName } = useDragNode()
    console.log('+++++++++++',props.list)
    function getNodeData(target: any, attr: any) {
      var node = target.attributes[attr]
      if (node) {
        return node.nodeValue
      } else {
        return ''
      }
    }

    // const draggingNode = ref(null);
    // const draggingNodeName = ref(null);

    return {
      onDragMoveStart(e: any) {
        // console.log("onDragMoveStart", e);
        // var _this = this;
        var imgs = e.item.getElementsByClassName('drag-shape-icon')
        if (imgs !== undefined && imgs.length > 0) {
          draggingNode.value = getNodeData(imgs[0], 'data-shape-type')
          draggingNodeName.value = getNodeData(imgs[0], 'data-shape-name')

          // console.log('xxxx', draggingNode)
        }

        context.emit('onDragNode', {
          draggingNode: draggingNode.value,
          draggingNodeName: draggingNodeName.value
        })
      }
    }
  }
})
</script>

<style lang="less" scoped>

.ghost {
  // visibility: hidden;
 
}
.menu-item-wrap {
  padding: 0 10px;
  text-align: left;

  li {
    display: inline-flex;
    flex-direction: row;
    width: 38%;
    margin: 0 8px 8px 0;
    color: #666;
    cursor: pointer;
    border: 1px solid #e5e6e8;
    border-radius: 6px;
    padding: 0 8px;
    height: 36px;
    align-items: center;

    &:hover {
      color: #409eff;
      border: 1px dashed #409eff;
    }

    // .iconfont {
    //     font-size: 12px;
    //     line-height: 36px;
    // }

    .icon-wrap {
      text-align: center;
      position: relative;
      overflow: hidden;
      .drag-shape-icon {
        width: 16px;
        height: 36px;
        margin: auto;
        margin-top:5px;
      }
    }

    .icon-text {
      font-size: 12px;
      line-height: 36px;
      margin-left: 8px;
      white-space: nowrap;
    }
  }
}
</style>
