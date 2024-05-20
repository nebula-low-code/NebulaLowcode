<template>
  <div>
    <!-- 新配置,有多个条件 -->
    <div v-if="properties.logicOperation">
      <div v-for="(operation, index) in properties.logicOperation" :key="index">
        <div v-if="index > 0" style="display: flex; margin-top: 8px; align-items: center">
          <label style="width: 80px">运算条件</label>
          <a-select style="width: 100%" v-model:value="operation.operator" :dropdownMatchSelectWidth="false">
            <a-select-option v-for="(item, index) in operationOptions" :key="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <EventValueSelect :param-item="operation" style="margin: 8px 0"></EventValueSelect>
        <!-- <a-input v-model:value="operation.logicValue">
          <template #addonBefore>
            <a-select v-model:value="operation.logicOperator" :dropdownMatchSelectWidth="false">
              <a-select-option v-for="(item, index) in logicOptions" :key="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
        </a-input> -->
        <a-select style="width: 100%; margin-bottom: 8px" v-model:value="operation.logicOperator" :dropdownMatchSelectWidth="false">
          <a-select-option v-for="(item, index) in logicOptions" :key="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
        <a-radio-group v-if="operation.logicOperator != 'isNull' && operation.logicOperator != 'isNotNull'" v-model:value="operation.valueType">
          <a-radio style="margin-bottom: 8px" value="custom">
            <span
              @click="
                (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }
              "
            >
              <EventValueSelect style="width: 227px" placeholder="数据源" :param-item="operation.logicValueInfo"></EventValueSelect>
            </span>
          </a-radio>
          <a-radio value="constant">
            <a-input style="width: 227px" placeholder="静态值" v-model:value="operation.logicValue"></a-input>
          </a-radio>
        </a-radio-group>
      </div>
    </div>
    <!-- 兼容旧配置 -->
    <div v-else>
      <EventValueSelect :param-item="properties" style="margin: 8px 0"></EventValueSelect>
      <a-select style="width: 100%; margin-bottom: 8px" v-model:value="properties.logicOperator" :dropdownMatchSelectWidth="false">
        <a-select-option v-for="(item, index) in logicOptions" :key="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
      <a-radio-group v-if="properties.logicOperator != 'isNull' && properties.logicOperator != 'isNotNull'" v-model:value="properties.valueType">
        <a-radio style="margin-bottom: 8px" value="custom">
          <span
            @click="
              (e) => {
                e.preventDefault()
                e.stopPropagation()
              }
            "
          >
            <EventValueSelect style="width: 227px" placeholder="数据源" :param-item="properties.logicValueInfo"></EventValueSelect>
          </span>
        </a-radio>
        <a-radio value="constant">
          <a-input style="width: 227px" placeholder="静态值" v-model:value="properties.logicValue"></a-input>
        </a-radio>
      </a-radio-group>
    </div>

    <div style="display: flex; margin-top: 16px">
      <a-button :icon="h(PlusOutlined)" type="link" @click="addLogic">添加条件</a-button>
      <a-button v-if="properties.logicOperation && properties.logicOperation.length > 1" :icon="h(DeleteOutlined)" type="link" @click="delLogic">删除条件</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, h } from 'vue'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { useDataStore } from '@/stores'
import EventValueSelect from '@/layouts/designer-aside-right/config-events/events-left/config-event/event-value-select/index.vue'

const store = useDataStore()
const properties = computed(() => store.curDiagram.properties)

function addLogic() {
  console.log('addLogic===', properties.value.logicOperation)

  if (!properties.value.logicOperation) {
    properties.value.logicOperation = [
      {
        type: properties.value.type,
        param_value_type: properties.value.param_value_type,
        relevanceComponentUuid: properties.value.relevanceComponentUuid,
        middle: properties.value.middle,
        operateApiId: properties.value.operateApiId,
        param_v_key: properties.value.param_v_key,
        param_v_name: properties.value.param_v_name,
        param_value: properties.value.param_value,
        valueType: properties.value.valueType,
        logicOperator: properties.value.logicOperator,
        logicValue: properties.value.logicValue,
        logicValueInfo: properties.value.logicValueInfo,
        echoValues: properties.value.echoValues
      },
      {
        logicValueInfo: {}
      }
    ]
  } else {
    properties.value.logicOperation.push({
      logicValueInfo: {}
    })
  }
}

function delLogic() {
  properties.value.logicOperation.pop()
}

const operationOptions = [
  {
    value: 'AND',
    label: 'AND'
  },
  {
    value: 'OR',
    label: 'OR'
  }
]

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
