<template>
  <div
    class="m-colorPicker"
    :style="{ left: leftPadding + 'px', top: topPadding + 'px' }"
    v-on:click="
      (event) => {
        event.stopPropagation()
      }
    "
  >
    <!-- 颜色色盘 -->
    <div class="box" :class="{ open: openStatus }">
      <div class="color-input-view">
        <div class="colorView" :style="`background-color: ${showPanelColor}`"></div>
        <a-input
          class="color-input"
          type="text"
          v-model:value="inputColor"
          placeholder="#FF0000"
          @keydown.enter="updateValue(inputColor)"
        />
        <a-input
          class="opacity-input"
          type="number"
          v-model:value="colorOpacity"
          max="100"
          min="0"
          placeholder="0-100"
        />
      </div>
      <div class="bd">
        <h3>最近颜色</h3>
        <ul class="tColor">
          <li
            v-for="(color, index) of usedColor"
            :key="index"
            v-bind:style="{ backgroundColor: color }"
            v-on:mouseover="hoveColor = color"
            v-on:mouseout="hoveColor = null"
            v-on:click="updateValue(color)"
          ></li>
        </ul>
        <h3 style="display: inline">颜色方案</h3>
        <ul class="tColor">
          <li
            v-for="(color, index) of tColor"
            :key="index"
            :style="{
              backgroundColor: color,
              marginLeft: colorMarginLeft(index)
            }"
            v-on:mouseover="hoveColor = color"
            v-on:mouseout="hoveColor = null"
            v-on:click="updateValue(color)"
          ></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, watch, ref } from 'vue'
import { getStorage, setStorage } from '@/utils/storage-util'

const props = defineProps({
  // 面板打开状态
  openStatus: {
    type: Boolean,
    default: false
  },

  // 当前颜色值
  value: {
    type: String,
    required: true
  },
  opacity: {
    type: Number
  },
  // 默认颜色
  defaultColor: {
    type: String,
    default: '#000000'
  },
  // 禁用状态
  disabled: {
    type: Boolean,
    default: false
  },
  leftPadding: {
    type: Number,
    default: 0
  },
  topPadding: {
    type: Number,
    default: 0
  }
})

// 主题颜色
const tColor = [
  '#FFFFFF',
  '#F8F8F8',
  '#EEEEEE',
  '#CCCCCC',

  '#DDDDDD',
  '#999999',
  '#666666',
  '#333333',

  '#E7233B',
  '#108EE9',
  '#FF3B30',
  '#F24724',

  '#0BA194',
  '#5FB55F',
  '#F7BA2A',
  '#564E5F',

  '#FF6464',
  '#FF8264',
  '#FFAA64',
  '#FFF5A5',

  '#F0F5F9',
  '#C9D6DF',
  '#52616B',
  '#1E2022',

  '#00BCD4',
  '#B2EBF2',
  '#FF5722',
  '#DD2C00',

  '#E8E8E8',
  '#F05454',
  '#30475E',
  '#222831',

  '#FF4646',
  '#FF8585',
  '#FFB396',
  '#FFF5C0',

  '#018383',
  '#02A8A8',
  '#42E6A4',
  '#F5DEA3',

  '#206A5D',
  '#81B214',
  '#BFDCAE',
  '#F1F1E8',

  '#00AF91',
  '#007965',
  '#F58634',
  '#FFCC29',

  '#118DF0',
  '#0E2F56',
  '#FF304F',
  '#ECECDA',

  '#033FFF',
  '#4A9FF5',
  '#5FF4EE',
  '#C2FCF6',

  '#064ACB',
  '#366ED8',
  '#F3A953',
  '#F2F3F3',

  '#0A1931',
  '#185ADB',
  '#FFC947',
  '#EFEFEF'
]

let colorOpacity = ref(props.opacity)

// 鼠标经过的颜色块
let hoveColor: any
// 输入的颜色
let inputColor = ref()
// 最近颜色
let usedColor: any[] = []

const showPanelColor = computed(() => {
  if (inputColor.value) {
    return inputColor.value
  } else {
    return '#000000'
  }
})

const emit = defineEmits(['input', 'change', 'changeOpacity'])

watch(colorOpacity, () => {
  emit('changeOpacity', Number(colorOpacity))
})

watch(
  () => props.openStatus,
  (newVal) => {
    if (newVal) {
      inputColor.value = props.value
    }
  }
)

onMounted(() => {
  usedColor = JSON.parse(getStorage('usedColor')) || []
})

function colorMarginLeft(index: number) {
  //每4个色值为一组
  let margin = (index - 4) % 8 == 0 ? 26 : 2
  return margin + 'px'
}

// 更新组件的值 value
function updateValue(value: any) {
  //将颜色加入最近使用颜色，最多8种
  if (!usedColor.includes(value)) {
    usedColor.unshift(value)
    if (usedColor.length > 8) {
      usedColor = usedColor.slice(0, 8)
    }
  }
  setStorage('usedColor', JSON.stringify(usedColor))

  emit('input', value)
  emit('change', value,colorOpacity.value)
}
</script>

<style lang="scss" scoped>
input::placeholder {
  font-size: 12px;
  color: #ccc;
}
.m-colorPicker {
  z-index: 99999;
  position: relative;
  left: 0px;
  top: 0px;
  text-align: left;
  font-size: 14px;
  display: inline-block;
  outline: none;
  ul,
  li,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .colorBtn {
    width: 15px;
    height: 15px;
  }
  .colorBtn.disabled {
    cursor: no-drop;
  }
  .box {
    position: absolute;
    width: 200px;
    background: white;
    border: 1px solid #ddd;
    visibility: hidden;
    border-radius: 2px;
    margin-top: 2px;
    padding: 10px;
    padding-bottom: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    opacity: 0;
    transition: all 0.3s ease;
    box-sizing: content-box;
    h3 {
      margin: 0;
      font-size: 14px;
      font-weight: normal;
      margin-top: 10px;
      margin-bottom: 5px;
      line-height: 1;
      color: #333;
    }
    // input {
    //   visibility: hidden;
    //   position: absolute;
    //   left: 0;
    //   bottom: 0;
    // }
  }
  .box.open {
    visibility: visible;
    opacity: 1;
    z-index: 1;
  }
  .color-input-view {
    overflow: hidden;
    line-height: 29px;
    .colorView {
      width: 25px;
      height: 25px;
      float: left;
      transition: background-color 0.3s ease;
    }

    .color-input {
      display: inline-block;
      width: 85px;
      height: 25px;
      margin-left: 8px;
      border: 1px solid #ddd;
    }

    .opacity-input {
      display: inline-block;
      width: 70px;
      height: 25px;
      margin-left: 8px;
      border: 1px solid #ddd;
    }

    // .defaultColor {
    //   width: 80px;
    //   float: right;
    //   text-align: center;
    //   border: 1px solid #ddd;
    //   cursor: pointer;
    //   color: #333;
    // }
  }
  .tColor {
    li {
      width: 16px;
      height: 16px;
      display: inline-block;
      margin: 0 2px;
      transition: all 0.3s ease;
    }
    li:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
      transform: scale(1.3);
    }
  }
  .bColor {
    li {
      width: 15px;
      display: inline-block;
      margin: 0 2px;
      li {
        display: block;
        width: 15px;
        height: 15px;
        transition: all 0.3s ease;
        margin: 0;
      }
      li:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        transform: scale(1.3);
      }
    }
  }
}
</style>
