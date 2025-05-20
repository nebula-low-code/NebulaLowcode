<template>
  <div>
    <div style="display: flex; align-items: center">
      <div style="font-size: 14px; width: 70px; margin-left: 16px">背景</div>
      <a-input placeholder="请输入url或Base64" v-model:value="configOptions.backgroundImage" style="margin-right: 8px"> </a-input>
      <ColorConfig :color="configOptions.backgroundColor" :opacity="configOptions.backgroundOpacity" :offset="-200" @changeColor="changeBgColor" />
    </div>
    <div class="image-container" :style="bgImageStyle">
      <!-- <span class="plus-icon" v-if="!configOptions.backgroundImage || configOptions.backgroundImage.length == 0">
        <PlusCircleOutlined />
      </span> -->
      <!-- <span class="image-cover">
        <span class="image-select" @click="openImageSelect">选择图像</span>
        <span class="image-delete" @click="deleteImage">
          <i class="iconfont icontrash" style="font-size: 16px"></i>
        </span>
      </span> -->
    </div>
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="定位">
        <a-select v-model:value="configOptions.backgroundPositionType" placeholder="请选择" style="width: 100%" allowClear @change="changeBackgroundPositionType">
          <a-select-option v-for="configItem in absoluteConfigList" :value="configItem.value">{{ configItem.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <div v-if="configOptions.backgroundPositionType == 'initial'" style="margin-bottom: 8px">
        <div class="initial-div">
          <a-input-number v-model:value="positionX" style="width: 80px" @change="changePositionX" />
          <a-input-number v-model:value="positionY" style="width: 80px" @change="changePositionY" />
          <a-select v-model:value="configOptions.backgroundPositionUnit" placeholder="单位" style="width: 80px" clearable @change="changePositionUnit">
            <a-select-option v-for="configItem in absoluteUnitList" :value="configItem.value">{{ configItem.label }}</a-select-option>
          </a-select>
        </div>
        <div class="initial-div">
          <div class="initial-tips">X轴</div>
          <div class="initial-tips">Y轴</div>
          <div class="initial-tips"></div>
        </div>
      </div>
      <a-form-item label="背景重复">
        <a-select v-model:value="configOptions.backgroundRepeat" placeholder="请选择" style="width: 100%" allowClear>
          <a-select-option v-for="configItem in backgroundRepeatConfigList" :value="configItem.value">{{ configItem.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="显示尺寸">
        <a-select v-model:value="configOptions.backgroundSizeType" placeholder="请选择" style="width: 100%" allowClear @change="changeBackgroundSizeType">
          <a-select-option v-for="configItem in backgroundSizeConfigList" :value="configItem.value">{{ configItem.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <div v-if="configOptions.backgroundSizeType == 'initial'" style="margin-bottom: 8px">
        <div class="initial-div">
          <a-input-number v-model:value="bgWidth" style="width: 80px" @change="changeBackgroundWidth" />
          <a-input-number v-model:value="bgHeight" style="width: 80px" @change="changeBackgroundHeight" />
          <a-select v-model:value="configOptions.backgroundSizeUnit" placeholder="单位" style="width: 80px" clearable @change="changeSizeUnit">
            <a-select-option v-for="configItem in absoluteUnitList" :value="configItem.value">{{ configItem.label }}</a-select-option>
          </a-select>
        </div>
        <div class="initial-div">
          <div class="initial-tips">宽度</div>
          <div class="initial-tips">高度</div>
          <div class="initial-tips"></div>
        </div>
      </div>
    </a-form>
    <ImageSelectDialog ref="imageRef" @select-image="selectImage"></ImageSelectDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'
import ImageSelectDialog from '@/layouts/modal/image-upload-dialog.vue'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { bgImageStyleConfig } from '@/utils/common-style'
import { absoluteConfigList, absoluteUnitList, backgroundRepeatConfigList, backgroundSizeConfigList } from '@/utils/constants'
import { isEmpty } from 'lodash'
const props = defineProps<{
  configOptions: any
}>()

const imageRef = ref()
const positionX = ref(0)
const positionY = ref(0)
const bgWidth = ref(100)
const bgHeight = ref(100)

const bgImageStyle = computed(() => {
  return bgImageStyleConfig(props.configOptions)
})

function changeBgColor(color: string, opacity: number) {
  props.configOptions.backgroundColor = color
  // 判断opacity是否为undifined
  if (typeof opacity != 'undefined') {
    props.configOptions.backgroundOpacity = opacity
  }
}

function openImageSelect() {
  imageRef.value.onOpen()
}

function selectImage(img: any) {
  props.configOptions.backgroundImage = img.url
}

function deleteImage() {
  props.configOptions.backgroundImage = ''
}

function changeBackgroundPositionType(type: string) {
  props.configOptions.backgroundPosition = type.replace('-', ' ')
}

function changeBackgroundSizeType(type: string) {
  if (type === 'initial') {
    changeBackgroundSize()
  } else {
    props.configOptions.backgroundSize = type
  }
}

function changePositionX(value: number) {
  changeBackgroundPositon()
}

function changePositionY(value: number) {
  changeBackgroundPositon()
}

function changePositionUnit() {
  changeBackgroundPositon()
}

function changeBackgroundWidth() {
  changeBackgroundSize()
}

function changeBackgroundHeight() {
  changeBackgroundSize()
}

function changeSizeUnit() {
  changeBackgroundSize()
}

function changeBackgroundPositon() {
  let unit = 'px'
  if (!isEmpty(props.configOptions.backgroundPositionUnit)) {
    unit = props.configOptions.backgroundPositionUnit
  }
  props.configOptions.backgroundPosition = positionX.value + unit + ' ' + positionY.value + unit
}

function changeBackgroundSize() {
  let unit = 'px'
  if (!isEmpty(props.configOptions.backgroundSizeUnit)) {
    unit = props.configOptions.backgroundSizeUnit
  }
  props.configOptions.backgroundSize = bgWidth.value + unit + ' ' + bgHeight.value + unit
}
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 120px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #e2e2e2;
  overflow: hidden;
  position: relative;
}
.image-cover:hover {
  opacity: 1;
}
.image-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
}

.image-select {
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  height: 30px;
  width: 100%;
  color: white;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.image-delete {
  position: absolute;
  right: 8px;
  top: 8px;
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
  border-radius: 4px;
}

.plus-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
}

.initial-div {
  display: flex;
  justify-content: space-around;
}
.initial-tips {
  width: 80px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
