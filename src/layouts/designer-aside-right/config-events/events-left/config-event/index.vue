<template>
  <div style="padding-right: 8px; height: 100%; overflow-y: auto">
    {{ curDiagram.title }}
    <EventRefresh v-if="curDiagram.type == 'event-operate-refresh'" />
    <EventInterface v-else-if="curDiagram.type == 'event-operate-interface'" />
    <EventSetValue v-else-if="curDiagram.type == 'event-operate-set'" />
    <EventTableExport v-else-if="curDiagram.type == 'event-operate-table-export'" />
    <EventImport v-else-if="curDiagram.type == 'event-operate-import'" />
    <EventLink v-else-if="curDiagram.type == 'event-operate-link'" />
    <EventHLink v-else-if="curDiagram.type == 'event-operate-hlink'" />
    <EventMessage v-else-if="curDiagram.type == 'event-operate-dialog-box-msg'" />
    <EventConfirm v-else-if="curDiagram.type == 'event-operate-dialog-box-confirm'" />
    <EventPrint v-else-if="curDiagram.type == 'event-operate-print'" />
    <EventDisplay v-else-if="curDiagram.type == 'event-operate-display'" />
    <EventDisable v-else-if="curDiagram.type == 'event-operate-disable'" />
    <EventLogic v-else-if="curDiagram.type == 'event-operate-logic-judgment'" />
    <EventTimeout v-else-if="curDiagram.type == 'event-operate-timeout'" />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores'
import EventRefresh from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-refresh.vue'
import EventInterface from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-interface.vue'
import EventSetValue from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-set-value.vue'
import EventTableExport from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-table-export.vue'
import EventImport from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-import.vue'
import EventLink from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-link.vue'
import EventHLink from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-hlink.vue'
import EventMessage from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-message.vue'
import EventConfirm from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-confirm.vue'
import EventPrint from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-print.vue'
import EventDisplay from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-display.vue'
import EventDisable from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-disable.vue'
import EventLogic from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-logic.vue'
import EventTimeout from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-timeout.vue'

const store = useDataStore()
let curDiagram = computed(() => store.curDiagram)
</script>

<style scoped></style>
