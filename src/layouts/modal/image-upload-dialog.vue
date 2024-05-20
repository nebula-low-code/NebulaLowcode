<template>
  <a-modal v-model:open="visibleModal" title="图片" cancelText="取消" okText="确定" :width="850" :closable="true" :maskClosable="true" @ok="onSelectImage" :bodyStyle="{ padding: '0px' }">
    <a-form ref="imgDialogForm" :inline="true" label-position="center" label-width="120px">
      <a-upload accept="image/*" :action="action" :headers="headers" :showUploadList="false" @change="handlePicSuccess">
        <a-button style="margin-left: 140px; background-color: white; border: 1px solid #d9d9d9; color: #333; width: 500px" type="primary">
          <cloud-upload-outlined />
          上传新图片
        </a-button>
      </a-upload>
      <a-col style="height: 400px; overflow-y: auto; overflow-x: hidden; float: none">
        <a-form-item ref="uploadElement" style="margin-bottom: 20px !important" class="imgList">
          <ul>
            <li v-for="(items, index) in imgList" :key="index" @click="selectCurrentImg(items, index)">
              <img :src="items.url" />
              <span v-show="index === selectedIndex" :class="index === selectedIndex ? 'select_current_main' : ''">
                <check-outlined :class="selectedIndex == index ? 'icon-current-check' : ''" />
              </span>
              <span class="image-cover">
                <span>
                  <i class="iconfont icontrash" style="font-size: 16px" @click.stop="handleRemove(items, index)"></i>
                </span>
              </span>
            </li>
          </ul>
        </a-form-item>
      </a-col>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { message } from 'ant-design-vue'
import { useDataStore } from '@/stores'
import { imageList, deleteUploadImage } from '@/api/file'
import { CheckOutlined, CloudUploadOutlined } from '@ant-design/icons-vue'

let store = useDataStore()
let visibleModal = ref(false)

const imgList = ref<any[]>([])
let selectedIndex = ref(-1)
let iconName = ref('')
let selectedImage = ref()

const emit = defineEmits(['selectImage'])

const baseUrl = 'https://api.xingyunzuo.com/platform/api'
// const baseUrl = 'http://lowcode.goodbabyint.com/platform/api'


const action = computed(() => {
  return baseUrl + '/file/v2/upload?type=custom&merchantId=' + store.merchantId + '&projectId=' + store.projectId
})

const headers = computed(() => {
  return {
    'X-AUTH-TOKEN': store.token,
    'X-AUTH-KEY': store.phone,
    'X-PROJECT-ID': store.projectId,
    'X-MERCHANT-ID': store.merchantId,
    'X-AUTH-SOURCE': 'PORTAL_PC'
  }
})

function handlePicSuccess() {
  getImageList()
}

function selectCurrentImg(item: any, index: number) {
  selectedIndex.value = index
  selectedImage.value = item
}

function handleRemove(item: any, index: number) {
  deleteUploadImage({ fileId: item.fileId }).then((res: any) => {
    if (res.code === 0) {
      getImageList()
    } else {
      message.error(res.message)
    }
  })
}

function onSelectImage() {
  if (!selectedImage.value) {
    message.warning('请选择图片')
  } else {
    visibleModal.value = false
    emit('selectImage', selectedImage.value)
  }
}

function getImageList() {
  imageList({
    type: 'custom'
  }).then((res: any) => {
    if (res.code === 0) {
      imgList.value = res.dataList
      selectedIndex.value = -1
    } else {
      message.error(res.message)
    }
  })
}

function onOpen() {
  store = useDataStore();
  visibleModal.value = true
  getImageList()
}

defineExpose({
  onOpen
})
</script>

<style lang="scss" scoped>
.imgDialogCustom {
  .dialogImg {
    height: 400px;
    overflow: auto;
  }
}

.imgList {
  width: 100%;
  ul {
    width: 100%;
    li {
      margin: 10px 10px 10px 5px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 6px;
      width: 245px;
      height: 140px;
      float: left;
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
        width: 245px;
        height: 140px;
        display: inline-block;
        border-radius: 6px;
      }
      .image-cover:hover {
        opacity: 1;
      }
      .image-cover:hover span {
        display: inline-block;
      }
      .image-cover {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        cursor: default;
        text-align: left;
        color: #fff;
        opacity: 0;
        font-size: 20px;
      }
      .image-cover span {
        background-color: rgba(0, 0, 0, 0.2);
        transition: opacity 0.3s;
        cursor: pointer;
        position: relative;
        top: 0;
        left: 0;
        padding: 0 10px;
        border-top-left-radius: 6px;
      }
    }
  }
}
</style>
