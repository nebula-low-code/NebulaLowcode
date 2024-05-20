<template>
  <div>
    <a-collapse
      v-model:activeKey="activeNames"
      :bordered="false"
      style="background-color: white"
      expandIconPosition="end"
    >
      <a-collapse-panel key="yAxis">
        <template #header>
          <div class="title-text">坐标Y轴</div>
        </template>
        <div style="margin-left: 20px">
          <div style="display: flex">
            <div class="subtitle-text">标题</div>
            <a-input
              size="small"
              style="flex: 1"
              v-model:value="options[valueKey].name"
              placeholder="请输入标题"
            ></a-input>
          </div>
          <div style="display: flex; align-items: center">
            <div class="subtitle-text">最大值</div>
            <a-input
              size="small"
              style="flex: 1; margin-right: 8px"
              :disabled="options[valueKey].autoMax"
              v-model:value.number="options[valueKey].max"
              placeholder="请输入最大值"
            >
            </a-input>
            <a-checkbox :checked="options[valueKey].autoMax" @change="autoMaxChanged">
              自动
            </a-checkbox>
          </div>
          <div style="display: flex; align-items: center">
            <div class="subtitle-text">最小值</div>
            <a-input
              size="small"
              style="flex: 1; margin-right: 8px"
              :disabled="options[valueKey].autoMin"
              v-model:value.number="options[valueKey].min"
              placeholder="请输入最小值"
            >
            </a-input>
            <a-checkbox :checked="options[valueKey].autoMin" @change="autoMinChanged">
              自动
            </a-checkbox>
          </div>
        </div>
        <div style="margin-left: 20px">
          <a-checkbox v-model:checked="options[valueKey].axisLine.show">显示坐标轴</a-checkbox>
        </div>
        <div style="margin-left: 45px; display: flex">
          <a-select
            size="small"
            v-model:value="options[valueKey].axisLine.lineStyle.type"
            placeholder="请选择"
            style="width: 90px; margin-top: 4px"
            :disabled="!options[valueKey].axisLine.show"
          >
            <a-select-option v-for="item in borderTypeOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <a-select
            size="small"
            v-model:value="options[valueKey].axisLine.lineStyle.width"
            placeholder="请选择"
            style="width: 90px; margin: 4px 8px 0px 8px"
            :disabled="!options[valueKey].axisLine.show"
          >
            <a-select-option v-for="item in borderWidthOptions" :value="item.value">
              {{ item.label }}
            </a-select-option>
          </a-select>
          <ColorConfig
            :color="options[valueKey].axisLine.lineStyle.color"
            @changeColor="changeLineColor"
            :options="options"
            :offset="-200"
          />
        </div>
        <div style="margin-left: 20px; margin-top: 8px">
          <a-checkbox v-model:checked="options[valueKey].nameShow">显示标题</a-checkbox>
        </div>
        <div>
          <div style="margin-left: 45px; display: flex; align-items: center">
            <a-select
              size="small"
              v-model:value="options[valueKey].nameTextStyle.fontFamily"
              placeholder="请选择"
              style="width: 90px"
              :disabled="!options[valueKey].nameShow"
            >
              <a-select-option v-for="item in fontFamilyOptions" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              size="small"
              v-model:value="options[valueKey].nameTextStyle.fontSize"
              placeholder="请选择"
              style="width: 90px; margin: 0 8px"
              :disabled="!options[valueKey].nameShow"
            >
              <a-select-option v-for="item in fontSizeOptions" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <ColorConfig
              :color="options[valueKey].nameTextStyle.color"
              @changeColor="changeNameColor"
              :options="options"
              :offset="-200"
            />
          </div>
        </div>
        <div style="margin-left: 20px; margin-top: 8px">
          <a-checkbox v-model:checked="options[valueKey].axisLabel.show">显示标签</a-checkbox>
        </div>
        <div>
          <div style="margin-left: 45px; display: flex; align-items: center">
            <a-select
              size="small"
              v-model:value="options[valueKey].axisLabel.fontFamily"
              placeholder="请选择"
              style="width: 90px"
              :disabled="!options[valueKey].axisLabel.show"
            >
              <a-select-option v-for="item in fontFamilyOptions" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <a-select
              size="small"
              v-model:value="options[valueKey].axisLabel.fontSize"
              placeholder="请选择"
              style="width: 90px; margin: 0 8px"
              :disabled="!options[valueKey].axisLabel.show"
            >
              <a-select-option v-for="item in fontSizeOptions" :value="item.value">
                {{ item.label }}
              </a-select-option>
            </a-select>
            <ColorConfig
              :color="options[valueKey].axisLabel.color"
              @changeColor="changeLabelColor"
              :offset="-200"
            />
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ColorConfig from './color-config.vue'

const props = defineProps<{
  options: any
  valueKey: string
}>()
const activeNames = ref(['yAxis'])

const borderTypeOptions = [
  { label: '实线', value: 'solid' },
  { label: '点线', value: 'dotted' },
  { label: '虚线', value: 'dashed' }
]
const borderWidthOptions = [
  { label: '1px', value: 1 },
  { label: '2px', value: 2 },
  { label: '3px', value: 3 },
  { label: '4px', value: 4 },
  { label: '5px', value: 5 },
  { label: '6px', value: 6 },
  { label: '7px', value: 7 },
  { label: '8px', value: 8 },
  { label: '9px', value: 9 }
]
const rotateOptions = [
  { label: '横向', value: 0 },
  { label: '竖向', value: -90 },
  { label: '左倾斜45', value: 45 },
  { label: '右倾斜45', value: -45 }
]
const fontSizeOptions = [
  { label: '默认', value: undefined },
  { label: '10px', value: 10 },
  { label: '11px', value: 11 },
  { label: '12px', value: 12 },
  { label: '13px', value: 13 },
  { label: '14px', value: 14 },
  { label: '15px', value: 15 },
  { label: '16px', value: 16 },
  { label: '18px', value: 18 },
  { label: '20px', value: 20 },
  { label: '24px', value: 24 },
  { label: '32px', value: 32 },
  { label: '36px', value: 36 },
  { label: '48px', value: 48 },
  { label: '64px', value: 64 }
]
const fontFamilyOptions = [
  { label: '默认', value: undefined },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '宋体', value: 'SimSun' },
  { label: '黑体', value: 'Heiti' },
  { label: '华文细黑', value: 'STXihei' },
  { label: '楷体', value: 'KaiTi' },
  { label: '仿宋', value: 'FangSong' },
  { label: '新宋体', value: 'NSimSun' },
  { label: '华文仿宋', value: 'STFangsong' },
  { label: '华文黑体', value: 'STHeiti' },
  { label: '华文琥珀', value: 'STHupo' },
  { label: '华文楷体', value: 'STKaiti' },
  { label: '华文隶书', value: 'STLiti' },
  { label: '华文宋体', value: 'STSong' },
  { label: '华文新魏', value: 'STXinwei' },
  { label: '华文行楷', value: 'STXingkai' },
  { label: '华文中宋', value: 'STZhongsong' },
  { label: '苹方', value: 'PingFang SC' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Times', value: 'Times' },
  { label: 'MS Sans Serif', value: 'MS Sans Serif' }
]

function changeLineColor(color: string) {
  props.options[props.valueKey].axisLine.lineStyle.color = color
}
function changeLabelColor(color: string) {
  props.options[props.valueKey].axisLabel.color = color
}
function changeNameColor(color: string) {
  props.options[props.valueKey].nameTextStyle.color = color
}

function autoMaxChanged(autoMax: any) {
  let checked = autoMax.target.checked
  props.options[props.valueKey].autoMax = checked
  if (checked) {
    props.options[props.valueKey].max = undefined
  }
}

function autoMinChanged(autoMin: any) {
  let checked = autoMin.target.checked
  props.options[props.valueKey].autoMin = checked
  if (checked) {
    props.options[props.valueKey].min = undefined
  }
}
</script>

<style scoped>
.title-text {
  font-weight: 500;
  font-size: 14px;
  color: #606266;
}

.subtitle-text {
  color: rgba(10, 18, 32, 0.46);
  font-size: 12px;
  font-weight: 700;
  line-height: 32px;
  width: 60px;
}
</style>
