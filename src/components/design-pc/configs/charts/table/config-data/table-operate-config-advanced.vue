<template>
  <div class="column-config">
    <div style="margin: 10px">高级配置</div>
    <a-form labelAlign="left" :label-col="labelCol">
        <!-- 显示个数：显示前三个按钮，其他放到“更多 -->
       <a-form-item label="显示个数：">
        <a-input-number  v-model:value="props.columnItem.showLimit" :min="1"></a-input-number>
      </a-form-item>
      <a-form-item label="列宽：">
        <a-input-number  v-model:value="props.columnItem.operatorWidth" :min="50"></a-input-number>
      </a-form-item>
      <a-form-item label="列宽适应：">
        <a-switch size="mini" v-model:checked="props.columnItem.ellipsis"></a-switch>
      </a-form-item>
      <a-form-item label="右侧固定：" >
        <a-switch v-model:checked="props.columnItem.isRightFixed" ></a-switch>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, computed, reactive, onMounted } from 'vue'
import { useDataStore } from '@/stores'
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const props = defineProps<{
  columnItem: any
}>()
let state = reactive({
    valueType: "",
})
const labelCol = { style: { width: '80px' } }


</script>

<style lang="less" scoped>
.column-config {
  padding: 5px;
}
.event-div {
  display: flex;
  justify-content: space-between;
}
.event-div-col {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 44%;
  align-items: center;
  color: #666;
  border: 1px solid #e5e6e8;
  border-radius: 6px;
  padding: 0 8px;
  height: 36px;
  &:hover {
    color: #409eff;
    border: 1px dashed #409eff;
  }
}
.event-icon{
    margin-right:10px
}
</style>
