import { ref } from 'vue'

export default function useDragNode() {
    const draggingNode = ref(null) as any;
    const draggingNodeName = ref(null) as any;

    return {
        draggingNode,
        draggingNodeName
    }
}
