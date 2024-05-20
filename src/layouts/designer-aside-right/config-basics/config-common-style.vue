<template>
  <div class="config-common-style">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="Margin">
        <a-select v-model:value="marginInfo.center" placeholder="请选择" style="width: 100%" @change="changeCenterMargin">
          <a-select-option v-for="item in commonCenterOptions" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>

        <div v-if="marginInfo.center == 'custom'" style="margin-top: 8px">
          <div class="initial-div">
            <a-input-number v-model:value="commonConfig.topSpaceDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.rightSpaceDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.bottomSpaceDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.leftSpaceDistance" style="width: 50px" />
            <div style="margin-left: 4px">px</div>
          </div>
          <div class="initial-div">
            <div class="initial-tips">上</div>
            <div class="initial-tips">右</div>
            <div class="initial-tips">下</div>
            <div class="initial-tips">左</div>
          </div>
        </div>
      </a-form-item>

      <a-form-item label="Padding">
        <a-select v-model:value="paddingInfo.center" placeholder="请选择" style="width: 100%" @change="changeCenterPadding">
          <a-select-option v-for="item in commonCenterOptions" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>

        <div v-if="paddingInfo.center == 'custom'" style="margin-top: 8px">
          <div class="initial-div">
            <a-input-number v-model:value="commonConfig.topPaddingDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.rightPaddingDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.bottomPaddingDistance" style="width: 50px" />
            <a-input-number v-model:value="commonConfig.leftPaddingDistance" style="width: 50px" />
            <div style="margin-left: 4px">px</div>
          </div>
          <div class="initial-div">
            <div class="initial-tips">上</div>
            <div class="initial-tips">右</div>
            <div class="initial-tips">下</div>
            <div class="initial-tips">左</div>
          </div>
        </div>
      </a-form-item>
    </a-form>

    <a-collapse v-model:activeKey="activeNames" :bordered="false" style="background-color: white" collapsible="icon" expandIconPosition="end">
      <a-collapse-panel key="borderRadius">
        <template v-slot:header>
          <div style="display: flex; flex-direction: row; align-items: center">
            <div class="panel-title">圆角</div>
            <div @click.stop="">
              <a-input-number :min="0" v-model:value="rInfo.center" placeholder="请输入" style="width: 100%" @change="changeCenterRadius"></a-input-number>
            </div>
          </div>
        </template>
        <div style="display: flex; flex-direction: row; align-items: center; margin-bottom: 4px" v-for="(bItem, bKey) in directionRadiusList" :key="bKey">
          <div class="panel-content">{{ bItem.label }}</div>
          <a-input-number :min="0" v-model:value.number="rInfo[bItem.value]" placeholder="请输入" style="width: 100%" @change="changeRadiusInfo"></a-input-number>
        </div>
      </a-collapse-panel>
    </a-collapse>
    <div style="display: flex">
      <div style="width: 75px; margin-left: 16px; font-size: 14px">边框</div>
      <div class="set-item set-long-item">
        <div
          class="set-all"
          :class="{
            active: borderType === 'center'
          }"
          @click="onChangeBorderType('center')"
        >
          <i class="iconfont iconbiankuang"></i>
        </div>

        <div
          class="set-seperately"
          :class="{
            active: borderType === 'top'
          }"
          @click="onChangeBorderType('top')"
        >
          <i class="iconfont iconborder-top"></i>
        </div>
        <div
          class="set-seperately"
          :class="{
            active: borderType === 'right'
          }"
          @click="onChangeBorderType('right')"
        >
          <i class="iconfont iconborder-right"></i>
        </div>
        <div
          class="set-seperately"
          :class="{
            active: borderType === 'bottom'
          }"
          @click="onChangeBorderType('bottom')"
        >
          <i class="iconfont iconborder-bottom"></i>
        </div>
        <div
          class="set-seperately"
          :class="{
            active: borderType === 'left'
          }"
          @click="onChangeBorderType('left')"
        >
          <i class="iconfont iconborder-left"></i>
        </div>
      </div>
    </div>
    <div class="border-input-number">
      <ColorConfig :color="borderStyleObj.borderStyleColor" :offset="0" @changeColor="onChangeBorderColor" />
      <div style="margin: 0 5px">
        <a-select v-model:value="borderStyleObj.borderStyleType" @change="onChangeBorderStyleType" placeholder="请选择" style="width: 90px" clearable>
          <a-select-option v-for="item in borderTypeOptions" :value="item.value">
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
      <a-input-number :min="0" v-model:value="borderStyleObj.borderStyleSize" @change="onChangeBorderSize" style="width: 150px"></a-input-number>
    </div>
    <a-collapse v-model:activeKey="activeOthers" :bordered="false" style="background-color: white" expandIconPosition="end">
      <a-collapse-panel key="other" header="其他">
        <a-form labelAlign="left" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
          <a-form-item label="禁用" v-if="options.disabled != undefined">
            <a-switch v-model:checked="options.disabled"></a-switch>
          </a-form-item>
          <a-form-item label="清除" v-if="options.clearable != undefined">
            <a-switch v-model:checked="options.clearable"></a-switch>
          </a-form-item>
          <a-form-item label="隐藏">
            <a-switch v-model:checked="commonConfig.displayHide"></a-switch>
          </a-form-item>
          <a-form-item label="阴影">
            <a-switch v-model:checked="commonConfig.isShowShadow"></a-switch>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useDataStore } from '@/stores'
import ColorConfig from '@/components/common-attribute-config/color-config.vue'

const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const commonConfig = computed(() => {
  if (store.currentCheckedComponent.options) {
    return store.currentCheckedComponent.options.commonConfig || {}
  }
  return {}
})
const permissionChecked = computed(() => {
  let uuid = store.currentCheckedComponent.uuid
  return store.permissionList.includes(uuid)
})

const activeNames = ref([''])
const activeOthers = ref(['other'])

const directionList = [
  {
    label: '上间距',
    value: 'top'
  },
  {
    label: '右间距',
    value: 'right'
  },
  {
    label: '下间距',
    value: 'bottom'
  },
  {
    label: '左间距',
    value: 'left'
  }
]

const commonCenterOptions = [
  { value: 24, label: '超大(24px)' },
  { value: 20, label: '大(20px)' },
  { value: 16, label: '中(16px)' },
  { value: 12, label: '小(12px)' },
  { value: 8, label: '超小(8px)' },
  { value: 4, label: '极小(4px)' },
  { value: 0, label: '无(0px)' },
  { value: 'custom', label: '自定义' }
]

/******** 设置margin ********/
const marginInfo = reactive<any>({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  center: 0
})

watch(
  () => commonConfig.value,
  () => {
    let values = []
    for (const item of commonCenterOptions) {
      values.push(item.value)
    }
    if (
      commonConfig.value.leftSpaceDistance == commonConfig.value.rightSpaceDistance &&
      commonConfig.value.leftSpaceDistance == commonConfig.value.bottomSpaceDistance &&
      commonConfig.value.leftSpaceDistance == commonConfig.value.topSpaceDistance
    ) {
      if (values.includes(commonConfig.value.leftSpaceDistance)) {
        marginInfo.center = commonConfig.value.leftSpaceDistance
      } else {
        marginInfo.center = 'custom'
      }
    } else {
      marginInfo.center = 'custom'
    }
  },
  {
    immediate: true
  }
)

function changeCenterMargin() {
  if (marginInfo.center != 'custom') {
    commonConfig.value.leftSpaceDistance = commonConfig.value.rightSpaceDistance = commonConfig.value.bottomSpaceDistance = commonConfig.value.topSpaceDistance = marginInfo.center
    marginInfo.top = marginInfo.right = marginInfo.bottom = marginInfo.left = marginInfo.center
  }
}

/******** padding ********/
const paddingInfo = reactive<any>({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  center: 0
})

watch(
  () => commonConfig.value,
  () => {
    let values = []
    for (const item of commonCenterOptions) {
      values.push(item.value)
    }
    if (
      commonConfig.value.leftPaddingDistance == commonConfig.value.rightPaddingDistance &&
      commonConfig.value.leftPaddingDistance == commonConfig.value.bottomPaddingDistance &&
      commonConfig.value.leftPaddingDistance == commonConfig.value.topPaddingDistance
    ) {
      if (values.includes(commonConfig.value.leftPaddingDistance)) {
        paddingInfo.center = commonConfig.value.leftPaddingDistance
      } else {
        paddingInfo.center = 'custom'
      }
    } else {
      paddingInfo.center = 'custom'
    }
  },
  {
    immediate: true
  }
)

function changeCenterPadding() {
  paddingInfo.value = 'center'
  if (paddingInfo.center != 'custom') {
    commonConfig.value.leftPaddingDistance = commonConfig.value.rightPaddingDistance = commonConfig.value.bottomPaddingDistance = commonConfig.value.topPaddingDistance = paddingInfo.center
    paddingInfo.top = paddingInfo.right = paddingInfo.bottom = paddingInfo.left = paddingInfo.center
  }
}

/******** 设置圆角 ********/
const radiusType = ref('')

const rInfo = reactive<any>({
  topLeft: 0,
  topRight: 0,
  bottomLeft: 0,
  bottomRight: 0,
  center: 0
})

const directionRadiusList = [
  {
    label: '上右',
    value: 'topRight'
  },
  {
    label: '下右',
    value: 'bottomRight'
  },
  {
    label: '下左',
    value: 'bottomLeft'
  },
  {
    label: '上左',
    value: 'topLeft'
  }
]

watch(
  () => commonConfig.value,
  () => {
    radiusType.value = 'all'
    rInfo.topLeft = commonConfig.value.borderTopLeftRadius || 0
    rInfo.topRight = commonConfig.value.borderTopRightRadius || 0
    rInfo.bottomLeft = commonConfig.value.borderBottomLeftRadius || 0
    rInfo.bottomRight = commonConfig.value.borderBottomRightRadius || 0
    if (rInfo.topLeft == rInfo.topRight && rInfo.topLeft == rInfo.bottomLeft && rInfo.topLeft == rInfo.bottomRight) {
      rInfo.center = rInfo.topLeft
    } else {
      rInfo.center = undefined
    }
  },
  {
    immediate: true
  }
)

function changeCenterRadius() {
  radiusType.value = 'center'
  commonConfig.value.borderTopLeftRadius = commonConfig.value.borderTopRightRadius = commonConfig.value.borderBottomLeftRadius = commonConfig.value.borderBottomRightRadius = rInfo.center
  rInfo.center = rInfo.topLeft = rInfo.topRight = rInfo.bottomLeft = rInfo.bottomRight = rInfo.center
}

function changeRadiusInfo() {
  radiusType.value = 'all'
  if (rInfo.topLeft == rInfo.topRight && rInfo.topLeft == rInfo.bottomLeft && rInfo.topLeft == rInfo.bottomRight) {
    rInfo.center = rInfo.topLeft
  } else {
    rInfo.center = undefined
  }
  commonConfig.value.borderTopLeftRadius = rInfo.topLeft
  commonConfig.value.borderTopRightRadius = rInfo.topRight
  commonConfig.value.borderBottomLeftRadius = rInfo.bottomLeft
  commonConfig.value.borderBottomRightRadius = rInfo.bottomRight
}

/******** 设置边框 ********/
const borderTypeOptions = [
  { label: '实线', value: 'solid' },
  { label: '点线', value: 'dotted' },
  { label: '虚线', value: 'dashed' }
]
let borderType = ref()

// 样式临时变量
let borderStyleObj = reactive({
  borderStyleType: '',
  borderStyleSize: 0,
  borderStyleColor: ''
})

watch(
  () => commonConfig.value.borderStyle,
  () => {
    verifyStyleType()
  },
  {
    immediate: true
  }
)

function verifyIsEqual(arr: any) {
  let isEqual = true
  arr.forEach((a: any) => {
    arr.forEach((b: any) => {
      if (a !== b) {
        isEqual = false
      }
    })
  })
  return isEqual
}
function verifyStyleType() {
  // 边框的回显
  let borderStyle: any = commonConfig.value.borderStyle
  if (!borderStyle) {
    return
  }
  if (verifyIsEqual([borderStyle.leftDirveType, borderStyle.bottomDirveType, borderStyle.rightDirveType, borderStyle.topDirveType])) {
    borderStyleObj.borderStyleType = borderStyle.leftDirveType
  }
  if (verifyIsEqual([borderStyle.leftSize, borderStyle.bottomSize, borderStyle.rightSize, borderStyle.topSize])) {
    borderStyleObj.borderStyleSize = borderStyle.leftSize
  }
  if (verifyIsEqual([borderStyle.leftDirveColor, borderStyle.bottomDirveColor, borderStyle.rightDirveColor, borderStyle.topDirveColor])) {
    borderStyleObj.borderStyleColor = borderStyle.leftDirveColor
  }
}
function onChangeBorderType(type: string) {
  let borderStyle: any = commonConfig.value.borderStyle
  borderType.value = type
  if (type === 'top') {
    borderStyleObj.borderStyleType = borderStyle.topDirveType
    borderStyleObj.borderStyleSize = borderStyle.topSize
    borderStyleObj.borderStyleColor = borderStyle.topDirveColor
  } else if (type === 'right') {
    borderStyleObj.borderStyleType = borderStyle.rightDirveType
    borderStyleObj.borderStyleSize = borderStyle.rightSize
    borderStyleObj.borderStyleColor = borderStyle.rightDirveColor
  } else if (type === 'bottom') {
    borderStyleObj.borderStyleType = borderStyle.bottomDirveType
    borderStyleObj.borderStyleSize = borderStyle.bottomSize
    borderStyleObj.borderStyleColor = borderStyle.bottomDirveColor
  } else if (type === 'left') {
    borderStyleObj.borderStyleType = borderStyle.leftDirveType
    borderStyleObj.borderStyleSize = borderStyle.leftSize
    borderStyleObj.borderStyleColor = borderStyle.leftDirveColor
  } else if (type === 'center') {
    // isFirstInit = true
    borderStyleObj.borderStyleType = ''
    borderStyleObj.borderStyleSize = 0
    borderStyleObj.borderStyleColor = ''
    // isFirstInit = false
    verifyStyleType()
  }
}

function onChangeBorderStyleType(style: string) {
  let borderStyle = commonConfig.value.borderStyle
  let type = borderType.value
  borderStyleObj.borderStyleType = style
  if (type === 'top') {
    borderStyle.topDirveType = style
  } else if (type === 'right') {
    borderStyle.rightDirveType = style
  } else if (type === 'bottom') {
    borderStyle.bottomDirveType = style
  } else if (type === 'left') {
    borderStyle.leftDirveType = style
  } else if (type === 'center') {
    borderStyle.leftDirveType = borderStyle.bottomDirveType = borderStyle.rightDirveType = borderStyle.topDirveType = style
  }
}
function onChangeBorderColor(color: string) {
  let borderStyle = commonConfig.value.borderStyle
  let type = borderType.value
  borderStyleObj.borderStyleColor = color
  if (type === 'top') {
    borderStyle.topDirveColor = color
  } else if (type === 'right') {
    borderStyle.rightDirveColor = color
  } else if (type === 'bottom') {
    borderStyle.bottomDirveColor = color
  } else if (type === 'left') {
    borderStyle.leftDirveColor = color
  } else if (type === 'center') {
    borderStyle.leftDirveColor = borderStyle.bottomDirveColor = borderStyle.rightDirveColor = borderStyle.topDirveColor = color
  }
}
function onChangeBorderSize(size: number) {
  let borderStyle = commonConfig.value.borderStyle
  let type = borderType.value
  borderStyleObj.borderStyleSize = size
  if (type === 'top') {
    borderStyle.topSize = size
  } else if (type === 'right') {
    borderStyle.rightSize = size
  } else if (type === 'bottom') {
    borderStyle.bottomSize = size
  } else if (type === 'left') {
    borderStyle.leftSize = size
  } else if (type === 'center') {
    borderStyle.leftSize = borderStyle.bottomSize = borderStyle.rightSize = borderStyle.topSize = size
  }
}
</script>

<style scoped>
.config-common-style {
  .panel-title {
    width: 75px;
    text-align: left;
    line-height: 32px;
    flex-shrink: 0;
  }
  .panel-content {
    width: 100px;
    margin-left: 28px;
    text-align: left;
    line-height: 32px;
  }
}

.set-item {
  display: flex;
  height: 22px;
  width: 50px;
  border-radius: 2px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(237, 237, 237);
  margin-right: 8px;
  position: relative;

  .set-all {
    display: flex;
    width: 36px;
    justify-content: space-around;
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    border-right: 1px solid rgb(237, 237, 237);
    transition: all 0.2s ease-in-out 0s;
  }

  .iconfont {
    font-size: 14px;
  }

  .set-seperately {
    display: inline-flex;
    width: 24px;
    vertical-align: middle;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    transition: all 0.2s ease-in-out 0s;
    cursor: pointer;
    padding: 0px 5px;
  }

  .active {
    background-color: rgb(237, 237, 237);
  }
}

.border-input-number {
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-top: 8px;
}

.initial-div {
  display: flex;
  align-items: center;
}
.initial-tips {
  width: 50px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
