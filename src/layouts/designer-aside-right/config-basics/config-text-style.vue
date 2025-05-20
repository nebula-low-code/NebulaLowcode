<template>
  <div class="textHtmlStyle">
    <ul>
      <div v-if="!hideStyleSelector">
        <li v-for="(item, index) in styleList" :key="index">
          <button
            @click.prevent="selectTextStyle(item)"
            :style="{
              fontSize: item.fontSize + 'px',
              color: item.color,
              fontWeight: item.fontWeight
            }"
            class="style-button"
            :class="{
              'selected-style-button': item.type == options.fontSizeType
            }"
          >
            {{ textStyleName(index) }}
          </button>
        </li>
      </div>

      <li>
        <a-select v-model:value="options[styleKey].textHtmlSize" style="width: 145px" @change="selectChangeStyle($event, 'size')">
          <a-select-option v-for="item in sizeList" :key="item" :label="item" :value="item" />
        </a-select>
      </li>
      <li style="margin-top: -5px; padding: 0px">
        <div class="colorSetting" @click.stop="showBGColorPicker = !showBGColorPicker">
          <span class="colorStyle">
            <i
              class="iconfont iconzitiyanse iconStyle"
              :style="{
                color: options[styleKey].textColor,
                background: options[styleKey].textBgColor
              }"
            />
            <ColorPicker :key="1" :value="options[styleKey].textBgColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeBGColor" :openStatus="showBGColorPicker" />
          </span>
          <span></span>
        </div>
      </li>
      <li style="margin-top: -4px; padding: 0px 0px 0px 12px">
        <div class="colorSetting" @click.stop="showColorPicker = !showColorPicker">
          <span>
            <i class="iconfont iconzitiyanse iconStyles" :style="{ color: options[styleKey].textColor }" />
            <ColorPicker :key="2" :value="options[styleKey].textColor" style="visibility: hidden" :leftPadding="-140" :topPadding="10" @change="changeColor" :openStatus="showColorPicker" />
          </span>
          <span></span>
        </div>
      </li>
    </ul>
    <ul style="overflow: hidden; width: 100%">
      <li>
        <i class="iconfont iconzuoduiqi1" :class="activeLeftPosit ? 'active' : ''" @click.prevent="selectChangeStyle($event, 'left')" />
      </li>
      <li>
        <i class="iconfont iconjuzhongduiqi" :class="activeCenterPosit ? 'active' : ''" @click.prevent="selectChangeStyle($event, 'center')" />
      </li>
      <li>
        <i class="iconfont iconyouduiqi1" :class="activeRightPosit ? 'active' : ''" @click.prevent="selectChangeStyle($event, 'right')" />
      </li>
      <li>
        <i class="iconfont iconzitijiacu" :class="activeTextHtmlBlod ? 'activeBlod' : ''" @click.prevent="selectChangeStyle($event, 'blod')" />
      </li>
      <li>
        <i class="iconfont iconzitixieti" :class="activeTextHtmlTilt ? 'activeTilt' : ''" @click.prevent="selectChangeStyle($event, 'xieti')" />
      </li>
      <li>
        <i class="iconfont iconzitixiahuaxian" :class="activeTextHtmlUnder ? 'activeUnder' : ''" @click.prevent="selectChangeStyle($event, 'under')" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ColorPicker from '@/components/tools/color-picker/index.vue'
import { FontSizeType } from '@/utils/text-formatter'
import { useDataStore } from '@/stores'
/**
 * 文本组件的配置组件
 */
const props = withDefaults(
  defineProps<{
    options: any
    styleKey?: string
    hideStyleSelector?: boolean
  }>(),
  {
    styleKey: 'styleEditorConfig',
    hideStyleSelector: false
  }
)

watch(
  () => props.options[props.styleKey],
  () => {
    initStyle()
  }
)

const store = useDataStore()
const sizeList = [10, 10.5, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36]
const styleList =
  store.deviceType === 'pc'
    ? [
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING1
        },
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING2
        },
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING3
        },
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING4
        },
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING5
        }
      ]
    : [
        {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING1
        },
        {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING2
        },
        {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING3
        },
        {
          fontSize: 14,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING4
        },
        {
          fontSize: 12,
          fontWeight: 'bold',
          color: '#333333',
          type: FontSizeType.HEADING5
        }
      ]
const activeCenterPosit = ref(false) // 选中的
const activeLeftPosit = ref(false)
const activeRightPosit = ref(false)
const activeTextHtmlBlod = ref(false)
const activeTextHtmlTilt = ref(false)
const activeTextHtmlUnder = ref(false)
const showColorPicker = ref(false)
const showBGColorPicker = ref(false)

//接收index参数
const textStyleName = computed(() => (index: number) => {
  if (store.deviceType === 'pc') {
    switch (index) {
      case 0:
        return '一级标题'
      case 1:
        return '二级标题'
      case 2:
        return '三级标题'
      case 3:
        return '四级标题'
      case 4:
        return '五级标题'
      case 5:
        return '正文'
    }
  } else {
    switch (index) {
      case 0:
        return '大标题'
      case 1:
        return '中标题'
      case 2:
        return '小标题'
      case 3:
        return '正文'
      case 4:
        return '辅助说明'
      case 5:
        return '备注'
    }
  }
})

initStyle()

function initStyle() {
  if (props.options[props.styleKey].textHtmlPosit !== undefined || props.options[props.styleKey].textHtmlPosit !== null) {
    if (props.options[props.styleKey].textHtmlPosit === '') {
      activeLeftPosit.value = false
      activeCenterPosit.value = false
      activeRightPosit.value = false
    } else if (props.options[props.styleKey].textHtmlPosit === 'left') {
      activeCenterPosit.value = false
      activeRightPosit.value = false
      activeLeftPosit.value = true
    } else if (props.options[props.styleKey].textHtmlPosit === 'right') {
      activeCenterPosit.value = false
      activeRightPosit.value = true
      activeLeftPosit.value = false
    } else if (props.options[props.styleKey].textHtmlPosit === 'center') {
      activeCenterPosit.value = true
      activeRightPosit.value = false
      activeLeftPosit.value = false
    }
  }
  if (props.options[props.styleKey].textHtmlBlod !== undefined || props.options[props.styleKey].textHtmlBlod !== null) {
    if (props.options[props.styleKey].textHtmlBlod === '') {
      activeTextHtmlBlod.value = false
    } else {
      activeTextHtmlBlod.value = true
    }
  }
  if (props.options[props.styleKey].textHtmlTilt !== undefined || props.options[props.styleKey].textHtmlTilt !== null) {
    if (props.options[props.styleKey].textHtmlTilt === '') {
      activeTextHtmlTilt.value = false
    } else {
      activeTextHtmlTilt.value = true
    }
  }
  if (props.options[props.styleKey].textHtmlUnder !== undefined || props.options[props.styleKey].textHtmlUnder !== null) {
    if (props.options[props.styleKey].textHtmlUnder === '') {
      activeTextHtmlUnder.value = false
    } else {
      activeTextHtmlUnder.value = true
    }
  }
}

function selectTextStyle(style: any) {
  if (style.fontWeight == 'bold') {
    props.options[props.styleKey].textHtmlBlod = 'bold'
    activeTextHtmlBlod.value = true
  } else {
    props.options[props.styleKey].textHtmlBlod = ''
    activeTextHtmlBlod.value = false
  }
  if (store.deviceType === 'pc') {
    props.options.fontSizeType = style.type
  } else {
    props.options[props.styleKey].textHtmlSize = style.fontSize
  }

  props.options[props.styleKey].textColor = style.color
}

function selectChangeStyle(value: any, type: string) {
  if (type === 'size') {
    props.options.fontSizeType = undefined
    props.options[props.styleKey].textHtmlSize = value
  } else if (type === 'left') {
    activeCenterPosit.value = false
    activeRightPosit.value = false
    if (props.options[props.styleKey].textHtmlPosit !== 'left') {
      props.options[props.styleKey].textHtmlPosit = 'left'
      activeLeftPosit.value = true
    } else {
      props.options[props.styleKey].textHtmlPosit = ''
      activeLeftPosit.value = false
    }
  } else if (type === 'center') {
    activeLeftPosit.value = false
    activeRightPosit.value = false
    if (props.options[props.styleKey].textHtmlPosit !== 'center') {
      props.options[props.styleKey].textHtmlPosit = 'center'
      activeCenterPosit.value = true
    } else {
      props.options[props.styleKey].textHtmlPosit = ''
      activeCenterPosit.value = false
    }
  } else if (type === 'right') {
    activeLeftPosit.value = false
    activeCenterPosit.value = false
    if (props.options[props.styleKey].textHtmlPosit !== 'right') {
      props.options[props.styleKey].textHtmlPosit = 'right'
      activeRightPosit.value = true
    } else {
      props.options[props.styleKey].textHtmlPosit = ''
      activeRightPosit.value = false
    }
  } else if (type === 'blod') {
    if (props.options[props.styleKey].textHtmlBlod) {
      props.options[props.styleKey].textHtmlBlod = ''
      activeTextHtmlBlod.value = false
    } else {
      props.options[props.styleKey].textHtmlBlod = 'bold'
      activeTextHtmlBlod.value = true
    }
  } else if (type === 'xieti') {
    if (props.options[props.styleKey].textHtmlTilt) {
      props.options[props.styleKey].textHtmlTilt = ''
      activeTextHtmlTilt.value = false
    } else {
      props.options[props.styleKey].textHtmlTilt = 'italic'
      // props.options[props.styleKey].textHtmlTilt = 'oblique' //强制斜体
      activeTextHtmlTilt.value = true
    }
  } else if (type === 'under') {
    if (props.options[props.styleKey].textHtmlUnder) {
      props.options[props.styleKey].textHtmlUnder = ''
      activeTextHtmlUnder.value = false
    } else {
      props.options[props.styleKey].textHtmlUnder = 'underline'
      activeTextHtmlUnder.value = true
    }
  }
}

function changeBGColor(color: any) {
  showBGColorPicker.value = false
  props.options[props.styleKey].textBgColor = color
}
function changeColor(color: any) {
  showColorPicker.value = false
  props.options[props.styleKey].textColor = color
}
</script>

<style lang="scss" scoped>
.style-button {
  width: 75px;
  line-height: 30px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

.selected-style-button {
  background: #eee;
}

.textHtmlStyle {
  ul {
    li {
      list-style: none;
      float: left;
      padding: 0 8px;
      height: 45px;
      cursor: pointer;
      // &:nth-child(3) {
      //   padding-right: 100px;
      // }
      .m-colorPicker {
        width: 0;
      }
      i {
        display: inline;
      }
      i.active,
      .activeBlod,
      .activeTilt,
      .activeUnder {
        background: #ff9966;
        padding: 2px;
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
            font-size: 24px;
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
    }
  }
}
</style>
