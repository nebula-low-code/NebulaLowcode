<template>
  <div>
    <EventValueSelect style="margin-bottom: 8px" placeholder="目标值" :param-item="actionSet.setInfo" :hide-interface="true" :hide-function="true" :hide-event-interface="true"></EventValueSelect>
    <a-radio-group v-model:value="actionSet.valueType">
      <a-radio style="margin-bottom: 8px" value="custom">
        <span
          @click="
            (e) => {
              e.preventDefault()
              e.stopPropagation()
            }
          "
        >
          <EventValueSelect style="width: 227px" placeholder="数据源" :param-item="actionSet.getInfo"></EventValueSelect>
        </span>
      </a-radio>
      <a-radio value="constant">
        <a-input style="width: 227px" placeholder="静态值" v-model:value="actionSet.value"></a-input>
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useDataStore } from '@/stores'
const store = useDataStore()
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'

const actionSet = computed(() => store.curDiagram.properties.actionSet)
</script>
<style scoped></style>
