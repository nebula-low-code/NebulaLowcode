<template>
  <a-modal
    v-model:open="visibleModal"
    title="选择图标"
    cancelText="取消"
    okText="确定"
    :width="600"
    :closable="true"
    :maskClosable="true"
    @ok="onSelectIcon"
    :bodyStyle="{ padding: '0px' }"
  >
    <a-input-search
      v-model:value="iconName"
      placeholder="请输入图标名称搜索"
      style="width: 400px; margin-left: 50px; margin-bottom: 20px"
      @search="searchIcon"
    />
    <div class="icon-list-view">
      <ul style="height: 450px; overflow: auto">
        <li
          class="icon-item"
          v-for="(item, idx) in listData"
          :key="idx"
          @click="selectCurrentIcon(item, idx)"
        >
          <i :class="item.fontClass" class="avatar-uploader-icon"></i>
          <div class="icon-name">
            {{ item.name }}
          </div>
          <span v-show="idx === index" :class="idx === index ? 'select_current_main' : ''">
            <check-outlined :class="idx == index ? 'icon-current-check' : ''" />
          </span>
        </li>
      </ul>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconList } from '@/api/api'
import { CheckOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useDataStore } from '@/stores'

const store = useDataStore()
let visibleModal = ref(false)

const listData = ref<any[]>([])
let index = ref(-1)
let iconName = ref('')
let selectIcon = ref('')

const emit = defineEmits(['selectIcon'])

function selectCurrentIcon(item: any, idx: number) {
  index.value = idx
  selectIcon.value = item
}
function searchIcon() {
  let param = {
    type: 'custom',
    name: iconName.value
  }
  iconList(param).then((res) => {
    listData.value = res.data.iconList
  })
}
function onSelectIcon() {
  if (!selectIcon.value) {
    message.warning('请选择图标')
  } else {
    visibleModal.value = false
    emit('selectIcon', selectIcon.value)
  }
}
function onOpen() {
  visibleModal.value = true
  listData.value = store.iconList
}

defineExpose({
  onOpen
})
</script>

<style scoped>
.avatar-uploader-icon {
  margin-top: 10px;
  display: inline-block;
  font-size: 28px;
  color: #8c939d;
  width: 85px;
  height: 35px;
  line-height: 35px;
  text-align: center;
}

.imgDialogCustom {
  .el-form-item__content {
    width: 100%;
  }

  .dialogImg {
    height: 400px;
    overflow: auto;
  }

  .avatar-uploader {
    width: 80px;
    border-radius: 6px;
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    margin-right: 10px;
    float: left;
  }
}

.icon-item {
  margin: 10px 10px 10px 5px;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  width: 85px;
  height: 85px;
  display: inline-block;
  position: relative;

  .select_current_main {
    position: absolute;
    right: -15px;
    top: -6px;
    width: 40px;
    height: 24px;
    background: #13ce66;
    text-align: center;
    transform: rotate(45deg);
    box-shadow: 0 0 1pc 1px rgba(0, 0, 0, 0.2);

    .icon-current-check {
      color: #fff;
      font-size: 12px;
      margin-top: 11px;
      transform: rotate(-45deg);
    }
  }

  img {
    width: 80px;
    height: 80px;
    display: inline-block;
  }
}

.icon-name {
  width: 75px;
  margin-left: 5px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
}
.icon-list-view {
  width: 100%;
}
</style>
