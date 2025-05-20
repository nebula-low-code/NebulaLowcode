<template>
  <div class="text-config">
    <a-form labelAlign="right" :label-col="{ span: 6 }" :colon="false" autocomplete="off">
      <a-form-item label="按钮名称">
        <ValueInput :options="options" value-key="text" en-value-key="enText"></ValueInput>
      </a-form-item>
      <a-form-item label="按钮图标">
        <InputIcon :options="options" selected-icon-key="customtimageIcon" icon-show-key="iconPreShow"></InputIcon>
      </a-form-item>
      <a-form-item label="图标位置">
        <RadioButton :options="options" value-key="iconPosition" :radio-options="iconPositionOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="按钮类型">
        <ValueSelect :options="options" value-key="type" :select-option="typeOptions" @on-change="changeButtonType"></ValueSelect>
      </a-form-item>

      <a-form-item label="按钮颜色" v-if="options.type === 'custom'">
        <div style="display: flex; align-items: center">
          <div class="colorSetting" @click.stop="showBGColorPicker = !showBGColorPicker">
            <span title="按钮背景颜色">
              <i
                class="iconfont iconzitiyanse iconStyle"
                :style="{
                  color: options.color,
                  background: options.backgroundColor
                }"
              />
              <ColorPicker :key="1" :value="options.backgroundColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeBGColor" :openStatus="showBGColorPicker" />
            </span>
          </div>
          <div style="margin-left: 8px" class="colorSetting" @click.stop="showColorPicker = !showColorPicker">
            <span title="按钮文字颜色">
              <i
                class="iconfont iconzitiyanse iconStyles"
                :style="{
                  color: options.color
                }"
              />
              <ColorPicker :key="1" :value="options.color" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeColor" :openStatus="showColorPicker" />
            </span>
          </div>
        </div>
      </a-form-item>
      <a-form-item label="按钮形状">
        <RadioButton :options="options" value-key="shape" :radio-options="shapeOptions"></RadioButton>
      </a-form-item>
      <a-form-item label="按钮大小">
        <RadioButton :options="options" value-key="size" :radio-options="sizeOptions" @on-change="changeButtonSize"></RadioButton>
      </a-form-item>
      <a-form-item label="字体大小">
        <a-input-number style="width: 100%" v-model:value.number="options.styleEditorConfig.textHtmlSize" @change="changeFontSize" />
      </a-form-item>
      <a-form-item label="自适应">
        <a-switch v-model:checked="options.block" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDataStore } from '@/stores'
import ValueInput from '@/components/common-attribute-config/value-input.vue'
import ValueSelect from '@/components/common-attribute-config/value-select.vue'
import RadioButton from '@/components/common-attribute-config/radio-button.vue'
import InputIcon from '@/components/common-attribute-config/input-icon.vue'
import ColorPicker from '@/components/tools/color-picker/index.vue'
import { useThemeStore } from '@/stores'

const themeStore = useThemeStore()
const store = useDataStore()
const options = computed(() => store.currentCheckedComponent.options)
const showColorPicker = ref(false)
const showBGColorPicker = ref(false)
const showActiveColorPicker = ref(false)
const showActiveBGColorPicker = ref(false)

const sizeOptions = [
  {
    label: '大',
    value: 'large'
  },
  {
    label: '中',
    value: 'default'
  },
  {
    label: '小',
    value: 'small'
  }
]

const iconPositionOptions = [
  {
    label: '左',
    value: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '上',
    value: 'top'
  },
  {
    label: '下',
    value: 'bottom'
  }
]

const typeOptions = [
  {
    label: '主按钮',
    value: 'primary'
  },
  {
    label: '次按钮',
    value: ''
  },
  {
    label: '虚线按钮',
    value: 'dashed'
  },
  {
    label: '危险按钮',
    value: 'danger'
  },
  {
    label: '链接按钮',
    value: 'link'
  },
  {
    label: '自定义',
    value: 'custom'
  }
]

const shapeOptions = [
  {
    label: '圆形',
    value: 'circle'
  },
  {
    label: '圆角',
    value: 'round'
  },
  {
    label: '默认',
    value: 'default'
  }
]

function changeBGColor(color: any) {
  showBGColorPicker.value = false
  options.value.backgroundColor = color
}
function changeColor(color: any) {
  showColorPicker.value = false
  options.value.color = color
}

function changeFontSize() {
  options.value.themeChanged.fontSize = true
}

function changeButtonSize(e: any) {
  let size = e.target.value
  if (size === 'large') {
    options.value.commonConfig.leftPaddingDistance = 24
    options.value.commonConfig.rightPaddingDistance = 24
    options.value.commonConfig.topPaddingDistance = 8
    options.value.commonConfig.bottomPaddingDistance = 8
    options.value.styleEditorConfig.textHtmlSize = Math.round(themeStore.themeConfig.token.fontSize * 1.2)
  } else if (size === 'default') {
    options.value.commonConfig.leftPaddingDistance = 16
    options.value.commonConfig.rightPaddingDistance = 16
    options.value.commonConfig.topPaddingDistance = 8
    options.value.commonConfig.bottomPaddingDistance = 8
    options.value.styleEditorConfig.textHtmlSize = themeStore.themeConfig.token.fontSize
  } else if (size === 'small') {
    options.value.commonConfig.leftPaddingDistance = 8
    options.value.commonConfig.rightPaddingDistance = 8
    options.value.commonConfig.topPaddingDistance = 4
    options.value.commonConfig.bottomPaddingDistance = 4
    options.value.styleEditorConfig.textHtmlSize = Math.round(themeStore.themeConfig.token.fontSize * 0.9)
  }
}

function changeButtonType(type: any) {
  switch (type) {
    case 'primary':
      {
        options.value.backgroundColor = themeStore.themeConfig.token.colorPrimary
        options.value.color = '#fff'
        options.value.commonConfig.borderStyle = {}
      }
      break
    case 'dashed':
      {
        options.value.backgroundColor = '#fff'
        options.value.color = '#666'

        options.value.commonConfig.borderStyle.topDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.topSize = '1'
        options.value.commonConfig.borderStyle.topDirveType = 'dashed'

        options.value.commonConfig.borderStyle.rightDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.rightSize = '1'
        options.value.commonConfig.borderStyle.rightDirveType = 'dashed'

        options.value.commonConfig.borderStyle.bottomDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.bottomSize = '1'
        options.value.commonConfig.borderStyle.bottomDirveType = 'dashed'

        options.value.commonConfig.borderStyle.leftDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.leftSize = '1'
        options.value.commonConfig.borderStyle.leftDirveType = 'dashed'
      }
      break
    case 'danger':
      {
        options.value.backgroundColor = '#ff4d4f'
        options.value.color = '#fff'
        options.value.commonConfig.borderStyle = {}
      }
      break
    case 'link':
      {
        options.value.backgroundColor = 'transparent'
        options.value.color = '#1677ff'
        options.value.commonConfig.borderStyle = {}
      }
      break
    case 'custom':
      break
    default:
      {
        options.value.backgroundColor = '#fff'
        options.value.color = '#000000e0'

        options.value.commonConfig.borderStyle.topDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.topSize = '1'
        options.value.commonConfig.borderStyle.topDirveType = 'solid'

        options.value.commonConfig.borderStyle.rightDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.rightSize = '1'
        options.value.commonConfig.borderStyle.rightDirveType = 'solid'

        options.value.commonConfig.borderStyle.bottomDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.bottomSize = '1'
        options.value.commonConfig.borderStyle.bottomDirveType = 'solid'

        options.value.commonConfig.borderStyle.leftDirveColor = '#d9d9d9'
        options.value.commonConfig.borderStyle.leftSize = '1'
        options.value.commonConfig.borderStyle.leftDirveType = 'solid'
      }
      break
  }
}
</script>

<style scoped>
.iconStyle {
  font-size: 26px;
  border-radius: 4px;
}
.iconStyles {
  font-size: 24px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
}
</style>
