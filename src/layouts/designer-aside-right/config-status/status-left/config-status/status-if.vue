<template>
    <div>
      <EventValueSelect :param-item="properties" style="margin: 8px 0"></EventValueSelect>
      <a-input v-model:value="properties.logicValue">
        <template #addonBefore>
          <a-select v-model:value="properties.logicOperator" :dropdownMatchSelectWidth="false">
            <a-select-option v-for="(item, index) in logicOptions" :key="index" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </template>
      </a-input>
    </div>
  </template>
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useDataStore } from '@/stores'
  import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'
  
  const store = useDataStore()
  const properties = computed(() => store.curDiagram.properties)
  
  const logicOptions = [
    {
      value: '=',
      label: '='
    },
    {
      value: '>',
      label: '>'
    },
    {
      value: '>=',
      label: '>='
    },
    {
      value: '<',
      label: '<'
    },
    {
      value: '<=',
      label: '<='
    },
    {
      value: '!=',
      label: '!='
    },
    {
      value: 'isNull',
      label: 'isNull'
    },
    {
      value: 'isNotNull',
      label: 'isNotNull'
    }
  ]
  </script>
  <style scoped></style>
  