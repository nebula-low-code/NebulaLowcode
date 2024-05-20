<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="图标样式">
        <IconSelect :options="options" value-key="icon"></IconSelect>
      </a-form-item>
      <a-form-item label="图标颜色">
        <ColorConfig :color="options.color" @changeColor="changeColor" :options="options" />
      </a-form-item>
      <a-form-item label="图标大小">
        <a-input-number style="width: 100%" v-model:value.number="options.size" />
      </a-form-item>
      <a-form-item label="绝对定位">
        <a-switch v-model:checked="options.commonConfig.postionAbsolute" @change="handlePositionAbsoluteChange" />
        <a-tooltip>
          <template #title>使用绝对定位需要取消勾选容器</template>
          <QuestionCircleOutlined style="margin-left: 5px" />
        </a-tooltip>
      </a-form-item>
      <a-form-item label="Z-index" v-if="options.commonConfig.postionAbsolute">
        <a-input-number v-model:value="options.commonConfig.zIndex" />
      </a-form-item>
      <a-form-item label="位置" v-if="options.commonConfig.postionAbsolute">
        <a-select v-model:value="state.postionConfig.type" placeholder="请选择" style="width: 180px" clearable>
          <a-select-option v-for="configItem in absoluteConfigList" :value="configItem.value">{{ configItem.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <div v-if="options.commonConfig.postionAbsolute && state.postionConfig.type == 'initial'">
        <div class="initial-div">
          <a-input-number v-model:value="state.postionConfig.top" style="width: 50px" />
          <a-input-number v-model:value="state.postionConfig.right" style="width: 50px" />
          <a-input-number v-model:value="state.postionConfig.bottom" style="width: 50px" />
          <a-input-number v-model:value="state.postionConfig.left" style="width: 50px" />
          <a-select v-model:value="state.postionConfig.unit" placeholder="请选择" style="width: 60px" clearable>
            <a-select-option v-for="configItem in absoluteUnitList" :value="configItem.value">{{ configItem.label }}</a-select-option>
          </a-select>
        </div>
        <div class="initial-div">
          <div class="initial-tips">上</div>
          <div class="initial-tips">右</div>
          <div class="initial-tips">下</div>
          <div class="initial-tips">左</div>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useDataStore } from '@/stores'
import IconSelect from '@/components/common-attribute-config/icon-select.vue'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { absoluteConfigList, absoluteUnitList } from '@/utils/constants'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)

function changeColor(color: any) {
  options.value.color = color
}
let state = reactive({
  postionConfig: options.value.commonConfig.postionConfig
})

function handlePositionAbsoluteChange(checked: boolean) {
  if (checked) {
    options.value.commonConfigAssignIsCol = false
  }
}
</script>

<style lang="less" scoped>
.iconStyle {
  display: inline-block;
  margin-top: 4px;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  border: 1px solid #e2e2e2;
}
.initial-div {
  display: flex;
}
.initial-tips {
  width: 50px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
