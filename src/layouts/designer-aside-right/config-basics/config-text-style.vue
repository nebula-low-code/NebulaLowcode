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
              'selected-style-button': item.fontSize == styleEditorConfig.textHtmlSize && item.fontWeight == styleEditorConfig.textHtmlBlod && item.color == styleEditorConfig.textColor
            }"
          >
            {{ textStyleName(index) }}
          </button>
        </li>
      </div>

      <li>
        <a-select v-model:value="styleEditorConfig.textHtmlSize" style="width: 145px" @change="selsetChangeStyle($event, 'size')">
          <a-select-option v-for="item in sizeList" :key="item" :label="item" :value="item" />
        </a-select>
      </li>
      <li style="margin-top: -5px; padding: 0px">
        <div class="colorSetting" @click.stop="showBGColorPicker = !showBGColorPicker">
          <span class="colorStyle">
            <i
              class="iconfont iconzitiyanse iconStyle"
              :style="{
                color: styleEditorConfig.textColor,
                background: styleEditorConfig.textBgColor
              }"
            />
            <ColorPicker :key="1" :value="styleEditorConfig.textBgColor" style="visibility: hidden" :leftPadding="-100" :topPadding="10" @change="changeBGColor" :openStatus="showBGColorPicker" />
          </span>
          <span></span>
        </div>
      </li>
      <li style="margin-top: -4px; padding: 0px 0px 0px 12px">
        <div class="colorSetting" @click.stop="showColorPicker = !showColorPicker">
          <span>
            <i class="iconfont iconzitiyanse iconStyles" :style="{ color: styleEditorConfig.textColor }" />
            <ColorPicker :key="2" :value="styleEditorConfig.textColor" style="visibility: hidden" :leftPadding="-140" :topPadding="10" @change="changeColor" :openStatus="showColorPicker" />
          </span>
          <span></span>
        </div>
      </li>
    </ul>
    <ul style="overflow: hidden; width: 100%">
      <li>
        <i class="iconfont iconzuoduiqi1" :class="activeLeftPosit ? 'active' : ''" @click.prevent="selsetChangeStyle($event, 'left')" />
      </li>
      <li>
        <i class="iconfont iconjuzhongduiqi" :class="activeCenterPosit ? 'active' : ''" @click.prevent="selsetChangeStyle($event, 'center')" />
      </li>
      <li>
        <i class="iconfont iconyouduiqi1" :class="activeRightPosit ? 'active' : ''" @click.prevent="selsetChangeStyle($event, 'right')" />
      </li>
      <li>
        <i class="iconfont iconzitijiacu" :class="activeTextHtmlBlod ? 'activeBlod' : ''" @click.prevent="selsetChangeStyle($event, 'blod')" />
      </li>
      <li>
        <i class="iconfont iconzitixieti" :class="activeTextHtmlTilt ? 'activeTilt' : ''" @click.prevent="selsetChangeStyle($event, 'xieti')" />
      </li>
      <li>
        <i class="iconfont iconzitixiahuaxian" :class="activeTextHtmlUnder ? 'activeUnder' : ''" @click.prevent="selsetChangeStyle($event, 'under')" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import ColorPicker from '@/components/tools/color-picker/index.vue'
/**
 * 文本组件的配置组件
 */
export default {
  name: 'text-style-editor',
  props: {
    styleEditorConfig: {
      type: Object,
      default: () => {}
    },
    hideStyleSelector: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    ColorPicker
  },
  data() {
    return {
      sizeList: [10, 10.5, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36],
      styleList: [
        {
          fontSize: '20',
          fontWeight: 'bold',
          color: '#333333'
        },
        {
          fontSize: '18',
          fontWeight: 'bold',
          color: '#333333'
        },
        {
          fontSize: '16',
          fontWeight: 'bold',
          color: '#333333'
        },
        {
          fontSize: '14',
          fontWeight: '',
          color: '#333333'
        },
        {
          fontSize: '12',
          fontWeight: '',
          color: '#333333'
        },
        {
          fontSize: '10',
          fontWeight: '',
          color: '#333333'
        }
      ],
      activeCenterPosit: false, // 选中的
      activeLeftPosit: false,
      activeRightPosit: false,
      activeTextHtmlBlod: false,
      activeTextHtmlTilt: false,
      activeTextHtmlUnder: false,
      showColorPicker: false,
      showBGColorPicker: false
    }
  },
  created() {
    if (this.styleEditorConfig.textHtmlPosit !== undefined || this.styleEditorConfig.textHtmlPosit !== null) {
      if (this.styleEditorConfig.textHtmlPosit === '') {
        this.activeLeftPosit = false
        this.activeCenterPosit = false
        this.activeRightPosit = false
      } else if (this.styleEditorConfig.textHtmlPosit === 'left') {
        this.activeCenterPosit = false
        this.activeRightPosit = false
        this.activeLeftPosit = true
      } else if (this.styleEditorConfig.textHtmlPosit === 'right') {
        this.activeCenterPosit = false
        this.activeRightPosit = true
        this.activeLeftPosit = false
      } else if (this.styleEditorConfig.textHtmlPosit === 'center') {
        this.activeCenterPosit = true
        this.activeRightPosit = false
        this.activeLeftPosit = false
      }
    }
    if (this.styleEditorConfig.textHtmlBlod !== undefined || this.styleEditorConfig.textHtmlBlod !== null) {
      if (this.styleEditorConfig.textHtmlBlod === '') {
        this.activeTextHtmlBlod = false
      } else {
        this.activeTextHtmlBlod = true
      }
    }
    if (this.styleEditorConfig.textHtmlTilt !== undefined || this.styleEditorConfig.textHtmlTilt !== null) {
      if (this.styleEditorConfig.textHtmlTilt === '') {
        this.activeTextHtmlTilt = false
      } else {
        this.activeTextHtmlTilt = true
      }
    }
    if (this.styleEditorConfig.textHtmlUnder !== undefined || this.styleEditorConfig.textHtmlUnder !== null) {
      if (this.styleEditorConfig.textHtmlUnder === '') {
        this.activeTextHtmlUnder = false
      } else {
        this.activeTextHtmlUnder = true
      }
    }
  },
  methods: {
    textStyleName(index: number) {
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
    },

    selectTextStyle(style: any) {
      if (style.fontWeight == 'bold') {
        this.styleEditorConfig.textHtmlBlod = 'bold'
        this.activeTextHtmlBlod = true
      } else {
        this.styleEditorConfig.textHtmlBlod = ''
        this.activeTextHtmlBlod = false
      }
      this.styleEditorConfig.textHtmlSize = style.fontSize
      this.styleEditorConfig.textColor = style.color
    },

    selsetChangeStyle(value: any, type: string) {
      if (type === 'size') {
        this.styleEditorConfig.textHtmlSize = value
      } else if (type === 'left') {
        this.activeCenterPosit = false
        this.activeRightPosit = false
        if (this.styleEditorConfig.textHtmlPosit !== 'left') {
          this.styleEditorConfig.textHtmlPosit = 'left'
          this.activeLeftPosit = true
        } else {
          this.styleEditorConfig.textHtmlPosit = ''
          this.activeLeftPosit = false
        }
      } else if (type === 'center') {
        this.activeLeftPosit = false
        this.activeRightPosit = false
        if (this.styleEditorConfig.textHtmlPosit !== 'center') {
          this.styleEditorConfig.textHtmlPosit = 'center'
          this.activeCenterPosit = true
        } else {
          this.styleEditorConfig.textHtmlPosit = ''
          this.activeCenterPosit = false
        }
      } else if (type === 'right') {
        this.activeLeftPosit = false
        this.activeCenterPosit = false
        if (this.styleEditorConfig.textHtmlPosit !== 'right') {
          this.styleEditorConfig.textHtmlPosit = 'right'
          this.activeRightPosit = true
        } else {
          this.styleEditorConfig.textHtmlPosit = ''
          this.activeRightPosit = false
        }
      } else if (type === 'blod') {
        if (this.styleEditorConfig.textHtmlBlod) {
          this.styleEditorConfig.textHtmlBlod = ''
          this.activeTextHtmlBlod = false
        } else {
          this.styleEditorConfig.textHtmlBlod = 'bold'
          this.activeTextHtmlBlod = true
        }
      } else if (type === 'xieti') {
        if (this.styleEditorConfig.textHtmlTilt) {
          this.styleEditorConfig.textHtmlTilt = ''
          this.activeTextHtmlTilt = false
        } else {
          this.styleEditorConfig.textHtmlTilt = 'italic' || 'oblique'
          this.activeTextHtmlTilt = true
        }
      } else if (type === 'under') {
        if (this.styleEditorConfig.textHtmlUnder) {
          this.styleEditorConfig.textHtmlUnder = ''
          this.activeTextHtmlUnder = false
        } else {
          this.styleEditorConfig.textHtmlUnder = 'underline'
          this.activeTextHtmlUnder = true
        }
      }
    },

    changeBGColor(color: any) {
      this.showBGColorPicker = false
      this.styleEditorConfig.textBgColor = color
    },
    changeColor(color: any) {
      this.showColorPicker = false
      this.styleEditorConfig.textColor = color
    }
  }
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
