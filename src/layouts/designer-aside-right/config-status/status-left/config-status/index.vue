<template>
  <div style="padding-right: 8px">
    {{ curDiagram.title }}

    <StatusIf v-if="curDiagram.type == 'status-operate-if'" />
    <StatusOperateSet v-else-if="curDiagram.type == 'status-operate-set'" />
    <StatusOperateColor v-else-if="curDiagram.type == 'status-operate-color'" />
    <StatusOperateOperate v-else-if="curDiagram.type == 'status-operate-operate'" />
    <StatusTagColor v-else-if="curDiagram.type == 'status-tag-color'" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'

import StatusIf from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-if.vue'
import StatusOperateSet from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-operate-set.vue'
import StatusTagColor from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-tag-color.vue'
import StatusOperateColor from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-operate-color.vue'
import StatusOperateOperate from '@/layouts/designer-aside-right/config-status/status-left/config-status/status-operate-operate.vue'

const store = useDataStore()
let curDiagram = computed(() => store.curDiagram)
</script>

<style scoped></style>
