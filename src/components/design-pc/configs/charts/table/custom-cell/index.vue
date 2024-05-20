<template>
  <div :style="spanStyle" v-if="!obj.isNotRender">
    <a-tag color="blue" v-if="obj.displayType=='TAG'">{{ obj.colValue }}</a-tag>
    <a-tag v-else-if="obj.displayType=='TAGLIST'" v-for="item in obj.colValue" color="blue">
        {{item}}
    </a-tag>
    <a-rate v-else-if="obj.displayType=='RATE'" :value="obj.colValue" disabled allow-half/>
    <span v-else> {{ obj.colValue }} </span>
  </div>
</template>
<script setup lang="ts">
// import WatchStatus from '@/utils/deal-component-status/watch-status'
import { computed, ref, reactive, onMounted, nextTick, watch } from 'vue'
import { formatText } from '@/utils/text-formatter'
import dayjs from 'dayjs'
const props = defineProps<{
  rowData: any
  actionItem: any
  defaultValue?: any
  columnItem: any
  isOperate: boolean
}>()

// let state = reactive({
//   obj: {
//     colValue: '',
//     backgroundColor: '',
//     color: '',
//     isNotRender: false
//   } as any
// })

const obj: any = computed(() => {
  let tempObj = {
    colValue: '',
    backgroundColor: '',
    color: '',
    isNotRender: false,
    displayType:'',// 显示类型 没有就是默认文本，tag 和rate分别为特殊展示类型
  } as any
  onHandleStatusConfigRender(tempObj)
  return tempObj
})
const spanStyle = computed(() => {
  let tempStype = {
    backgroundColor: obj.value.backgroundColor,
    color: obj.value.color,
    padding: '12px 8px',
    textAlign: props.columnItem.colAlign, // 列数据右对齐
  } as any
  if (props.isOperate) {
    tempStype.display = 'inline-block'
    tempStype.cursor = 'pointer'
  }
  return tempStype
})

function onHandleStatusConfigRender(tempObj: any) {
  let statusEventList = []
  tempObj.colValue = props.rowData[props.actionItem.colValue] || props.defaultValue
  if (props.actionItem.dataIndex == '操作') {
    tempObj.color = '#1890ff'
    statusEventList = props.actionItem.statusEventList
  } else {
    statusEventList = props.columnItem.statusEventList
  }
  if (props.actionItem.textFormat) {
    switch (props.actionItem.textFormat) {
      case 'YYYY-MM-DD':
        tempObj.colValue = dayjs(tempObj.colValue).format(props.actionItem.textFormat)
        break
      case 'YYYY-MM-DD HH:mm:ss':
        tempObj.colValue = dayjs(tempObj.colValue).format(props.actionItem.textFormat)
        break;
      case 'TAG':
        tempObj.displayType='TAG'
        if(tempObj.colValue.indexOf(',')>0){
            tempObj.colValue = tempObj.colValue.split(",")
            tempObj.displayType='TAGLIST'
        }
        break;
      case 'RATE':
        tempObj.colValue= Number(tempObj.colValue)
        tempObj.displayType='RATE'
        break;
      default:
        tempObj.colValue = formatText(tempObj.colValue, props.actionItem.textFormat)
    }
  }
  // 状态渲染永远放在最后处理
  if (statusEventList) {
    // let backItem: any = {
    //   tableRowData: props.rowData
    // }
    // // console.log('----test---onHandleStatusConfigRender------', props.rowData, props.actionItem, props.columnItem)
    // let watchStatus = new WatchStatus(props.pageId, backItem, props.rowData)
    // watchStatus.init(statusEventList)
    // if (backItem.isNotRender) {
    //   tempObj.isNotRender = backItem.isNotRender
    // }
    // if (backItem.colValue) {
    //   tempObj.colValue = backItem.colValue
    // }
    // if (backItem.textBgColor) {
    //   tempObj.backgroundColor = backItem.textBgColor
    // }
    // if (backItem.textColor) {
    //   tempObj.color = backItem.textColor
    // }
  }
}

let isReload = true
let drag = false
</script>

<style scoped></style>
