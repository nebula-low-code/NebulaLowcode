<template>
  <div>
    <a-collapse v-model:activeKey="activeNames" :bordered="false" expandIconPosition="end" style="background-color: white" collapsible="icon">
      <a-collapse-panel key="padding">
        <template #header>
          <div class="panel-header">
            <div class="panel-header-title">页面边距</div>
            <a-select style="width: 100%" v-model:value="paddingInfo.center" placeholder="请选择" @change="changeCenterPadding">
              <a-select-option v-for="item in paddingCenterOptions" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
          </div>
        </template>
        <div class="panel-header" style="margin-bottom: 4px">
          <div class="panel-header-title">上间距</div>
          <a-select style="width: 100%" v-model:value="paddingInfo.top" placeholder="请选择" @change="changePaddingInfo('top')">
            <a-select-option v-for="item in paddingOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="panel-header" style="margin-bottom: 4px">
          <div class="panel-header-title">右间距</div>
          <a-select style="width: 100%" v-model:value="paddingInfo.right" placeholder="请选择" @change="changePaddingInfo('right')">
            <a-select-option v-for="item in paddingOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="panel-header" style="margin-bottom: 4px">
          <div class="panel-header-title">下间距</div>
          <a-select style="width: 100%" v-model:value="paddingInfo.bottom" placeholder="请选择" @change="changePaddingInfo('bottom')">
            <a-select-option v-for="item in paddingOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
        <div class="panel-header" style="margin-bottom: 4px">
          <div class="panel-header-title">左间距</div>
          <a-select style="width: 100%" v-model:value="paddingInfo.left" placeholder="请选择" @change="changePaddingInfo('left')">
            <a-select-option v-for="item in paddingOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <div v-if="store.deviceType === 'pc'" class="panel-header">
      <span class="panel-header-title" style="margin-left: 16px">页面刷新</span>
      <a-input-number v-model:value.number="pageConfig.refreshSeconds" addon-after="秒" style="flex: 1" placeholder="请输入刷新间隔"></a-input-number>
    </div>
    <div v-if="store.deviceType === 'mobile'" class="panel-header" style="margin-top: 8px">
      <span class="panel-header-title" style="margin-left: 16px">自动保存</span>
      <a-switch v-model:checked="pageConfig.autoSave" />
    </div>
    <div v-if="store.deviceType === 'mobile'" class="panel-header" style="margin-top: 8px">
      <span class="panel-header-title" style="margin-left: 16px">隐藏导航栏</span>
      <a-switch v-model:checked="pageConfig.hideNavigator" />
    </div>
    <div v-if="store.deviceType === 'mobile'" class="panel-header" style="margin-top: 8px">
      <span class="panel-header-title" style="margin-left: 16px">导航栏颜色</span>
      <div class="colorSetting" @click.stop="showNavBGColorPicker = !showNavBGColorPicker">
        <span class="colorStyle">
          <i
            class="iconfont iconzitiyanse iconStyle"
            :style="{
              color: pageConfig.navigatorColor,
              background: pageConfig.navigatorBGColor
            }"
          />
          <ColorPicker :key="1" :value="pageConfig.navigatorBGColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeNavBGColor" :openStatus="showNavBGColorPicker" />
        </span>
        <span></span>
      </div>

      <div style="margin-left: 8px" class="colorSetting" @click.stop="showNavColorPicker = !showNavColorPicker">
        <span class="colorStyle">
          <i
            class="iconfont iconzitiyanse iconStyles"
            :style="{
              color: pageConfig.navigatorColor
            }"
          />
          <ColorPicker :key="1" :value="pageConfig.navigatorColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeNavColor" :openStatus="showNavColorPicker" />
        </span>
        <span></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useDataStore } from '@/stores'
import ColorPicker from '@/components/tools/color-picker/index.vue'

const store = useDataStore()
const showNavBGColorPicker = ref(false)
const showNavColorPicker = ref(false)

const props = defineProps<{
  pageConfig: any
}>()

let activeNames = ref([''])
const paddingInfo = reactive<any>({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  center: 0
})
const paddingCenterOptions = [
  { value: 24, label: '超大(24px)' },
  { value: 20, label: '大(20px)' },
  { value: 16, label: '中(16px)' },
  { value: 12, label: '小(12px)' },
  { value: 8, label: '超小(8px)' },
  { value: 4, label: '极小(4px)' },
  { value: 0, label: '无(0px)' },
  { value: 'custom', label: '自定义' }
]
const paddingOptions = [
  { value: 24, label: '超大(24px)' },
  { value: 20, label: '大(20px)' },
  { value: 16, label: '中(16px)' },
  { value: 12, label: '小(12px)' },
  { value: 8, label: '超小(8px)' },
  { value: 4, label: '极小(4px)' },
  { value: 0, label: '无(0px)' }
]
const paddingType = ref('')

watch(
  () => props.pageConfig,
  () => {
    paddingType.value = 'all'
    paddingInfo.left = props.pageConfig.leftPaddingDistance || 0
    paddingInfo.right = props.pageConfig.rightPaddingDistance || 0
    paddingInfo.bottom = props.pageConfig.bottomPaddingDistance || 0
    paddingInfo.top = props.pageConfig.topPaddingDistance || 0
    if (paddingInfo.left == paddingInfo.right && paddingInfo.left == paddingInfo.top && paddingInfo.left == paddingInfo.bottom) {
      paddingInfo.center = paddingInfo.left
    } else {
      paddingInfo.center = 'custom'
    }
  },
  {
    immediate: true
  }
)

function changeCenterPadding() {
  paddingType.value = 'center'
  if (paddingInfo.center == 'custom') {
    if (!activeNames.value.includes('padding')) {
      activeNames.value.push('padding')
    }
  } else {
    props.pageConfig.leftPaddingDistance = props.pageConfig.rightPaddingDistance = props.pageConfig.bottomPaddingDistance = props.pageConfig.topPaddingDistance = paddingInfo.center
    paddingInfo.center = paddingInfo.top = paddingInfo.right = paddingInfo.bottom = paddingInfo.left = paddingInfo.center
  }
}

function changePaddingInfo(type: string) {
  paddingType.value = 'all'
  if (paddingInfo.left == paddingInfo.right && paddingInfo.left == paddingInfo.top && paddingInfo.left == paddingInfo.bottom) {
    paddingInfo.center = paddingInfo.left
  } else {
    paddingInfo.center = 'custom'
  }
  props.pageConfig.leftPaddingDistance = paddingInfo.left
  props.pageConfig.rightPaddingDistance = paddingInfo.right
  props.pageConfig.bottomPaddingDistance = paddingInfo.bottom
  props.pageConfig.topPaddingDistance = paddingInfo.top
}

function changeNavBGColor(color: string) {
  showNavBGColorPicker.value = false
  props.pageConfig.navigatorBGColor = color
}

function changeNavColor(color: string) {
  showNavColorPicker.value = false
  props.pageConfig.navigatorColor = color
}
</script>
<style lang="scss" scoped>
.panel-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
}

.panel-header-title {
  width: 75px;
  font-size: 14px;
  flex-shrink: 0;
}

.colorSetting {
  display: flex;
  position: relative;
  span {
    flex: 1;
    .iconStyle {
      font-size: 26px;
      border-radius: 4px;
    }
    .iconStyles {
      font-size: 26px;
      border-radius: 4px;
      border: 1px solid #ebeef5;
    }
    .iconbottom {
      font-weight: bold;
      font-size: 12px;
    }
  }
  span:nth-child(2) {
    margin-top: -7px;
  }
  .doit {
    visibility: visible !important;
    opacity: 1 !important;
  }
}
</style>
