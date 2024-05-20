<template>
  <a-modal v-model:open="visibleModal" title="MOCK数据" cancelText="取消" okText="保存" :width="850" @ok="onSave" :closable="false" :maskClosable="false" :bodyStyle="{ padding: '0px' }">
    <a-form-item label="MOCK名称" required style="margin: 20px">
      <a-input :disabled="useMockData" placeholder="请输入名称" v-model:value="mockName" />
    </a-form-item>
    <div style="display: flex; margin: 20px">
      <CodeEditor ref="editor" :height="'400px'" :width="'70%'" :mode="'json'" />
      <div style="background-color: #f8f8f8; width: 30%; padding: 10px">
        <ul>
          <li v-if="useMockData" class="codeSnippet" @click="interfaceResponseHandler">原接口返回数据</li>
          <li class="codeSnippet" @click="listSampleHandler">列表样例数据</li>
          <li class="codeSnippet" @click="mapSampleHandler">数值样例数据</li>
          <li class="codeSnippet" @click="formatHandler">格式化</li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import CodeEditor from '@/components/tools/code-editor/index.vue'
import { generateUUID } from '@/utils/uuid'
import { useDataStore } from '@/stores'
import { type interfaceDataConfig } from '@/utils/type'
import { fetchApi } from '@/api/fetch-api'

const props = defineProps<{
  useMockData: boolean //是否是后端接口的mock数据
}>()

const editor = ref()
const store = useDataStore()

let visibleModal = ref(false)
let mockData = ref()
let mockName = ref('')

function onSave() {
  console.log(mockData.value)
  if (props.useMockData) {
    visibleModal.value = false
    let content = editor.value.content
    if (content && content.trim().length > 0) {
      store.interfaceMap[mockData.value.id].data.mockResponseData = JSON.parse(content)
    } else {
      store.interfaceMap[mockData.value.id].data.mockResponseData = undefined
    }
    if (mockData.value.data.useMockData) {
      store.interfaceMap[mockData.value.id].data.responseData = store.interfaceMap[mockData.value.id].data.mockResponseData
    }
  } else {
    if (mockName.value && mockName.value.trim().length > 0) {
      let content = editor.value.content
      if (content && content.trim().length > 0) {
        visibleModal.value = false
        if (mockData.value && mockData.value.data) {
          //修改旧的mock数据
          mockData.value.data.name = mockName.value.trim()
          mockData.value.data.responseData = JSON.parse(content)
          store.interfaceMap[mockData.value.id] = mockData
        } else {
          //新接口
          let uuid = generateUUID('data-interface-')
          let interfaceItem = {
            type: 'radio-button-interface',
            id: uuid,
            data: {
              id: Math.round(Math.random() * 10000 + 10000),
              name: mockName.value,
              isMockData: true,
              type: 'radio-button-interface',
              responseData: JSON.parse(content)
            }
          }
          store.setInterfaceData(uuid, interfaceItem)
        }
      } else {
        message.error('请输入MOCK数据')
      }
    } else {
      message.error('请输入名称')
    }
  }
}

function onOpen(mock?: interfaceDataConfig) {
  visibleModal.value = true
  mockData.value = mock
  if (mock) {
    mockName.value = mock.data.name
    setTimeout(() => {
      if (props.useMockData) {
        editor.value.content = JSON.stringify(mock.data.mockResponseData, null, 2)
      } else {
        editor.value.content = JSON.stringify(mock.data.responseData, null, 2)
      }
    }, 50)
  } else {
    mockName.value = ''
    setTimeout(() => {
      editor.value.content = ''
    }, 50)
  }
}

function interfaceResponseHandler() {
  fetchApi(mockData.value.data.paramsConfigs, mockData.value.data.id, store.pageConfig.config.reportId).then((res) => {
    editor.value.content = JSON.stringify(res.data, null, 2)
  })
  // editor.value.content = JSON.stringify(mockData.value.data.responseData, null, 2)
}

function listSampleHandler() {
  editor.value.content = sampleListJSON
}
function mapSampleHandler() {
  editor.value.content = sampleMapJSON
}
function formatHandler() {
  editor.value.content = JSON.stringify(JSON.parse(editor.value.content), null, 2)
}

const sampleMapJSON = `{
  "公司名称": "上海云座信息科技有限公司",
  "官网": "http://www.xingyunzuo.com",
  "产品": "星云座插件式低代码开发平台",
  "产品介绍": "请关注星云座公众号"
}`
const sampleListJSON = `{
  "列表数据": [
    {
      "日期": "2015/10/12 00:00",
      "用户注册来源": "广告二维码",
      "订单来源": "微信公众号",
      "城市": "杭州",
      "新增订单量": 14827,
      "支付订单量": 9226,
      "待服务订单量": 1423,
      "取消订单量": 967,
      "被拒订单量": 1452,
      "好评订单量": 15386
    },
    {
      "日期": "2015/10/13 00:00",
      "用户注册来源": "UC浏览器引流",
      "订单来源": "iOS APP",
      "城市": "上海",
      "新增订单量": 15024,
      "支付订单量": 18570,
      "待服务订单量": 735,
      "取消订单量": 228,
      "被拒订单量": 180,
      "好评订单量": 10757
    },
    {
      "日期": "2015/10/14 00:00",
      "用户注册来源": "UC浏览器引流",
      "订单来源": "iOS APP",
      "城市": "武汉",
      "新增订单量": 18586,
      "支付订单量": 11427,
      "待服务订单量": 1589,
      "取消订单量": 902,
      "被拒订单量": 538,
      "好评订单量": 6825
    },
    {
      "日期": "2015/10/15 00:00",
      "用户注册来源": "微信朋友圈H5页面",
      "订单来源": "Android APP",
      "城市": "深圳",
      "新增订单量": 17052,
      "支付订单量": 17238,
      "待服务订单量": 1067,
      "取消订单量": 772,
      "被拒订单量": 341,
      "好评订单量": 5577
    },
    {
      "日期": "2015/10/16 00:00",
      "用户注册来源": "地推二维码扫描",
      "订单来源": "iOS APP",
      "城市": "广州",
      "新增订单量": 16397,
      "支付订单量": 10849,
      "待服务订单量": 1211,
      "取消订单量": 1028,
      "被拒订单量": 509,
      "好评订单量": 8214
    },
    {
      "日期": "2015/10/17 00:00",
      "用户注册来源": "微信朋友圈H5页面",
      "订单来源": "Android APP",
      "城市": "苏州",
      "新增订单量": 15465,
      "支付订单量": 14899,
      "待服务订单量": 448,
      "取消订单量": 1488,
      "被拒订单量": 2007,
      "好评订单量": 11310
    },
    {
      "日期": "2015/10/18 00:00",
      "用户注册来源": "微信朋友圈H5页面",
      "订单来源": "微信公众号",
      "城市": "合肥",
      "新增订单量": 10930,
      "支付订单量": 15239,
      "待服务订单量": 1109,
      "取消订单量": 203,
      "被拒订单量": 195,
      "好评订单量": 6462
    },
    {
      "日期": "2015/10/19 00:00",
      "用户注册来源": "广告二维码",
      "订单来源": "Android APP",
      "城市": "长沙",
      "新增订单量": 13618,
      "支付订单量": 9477,
      "待服务订单量": 2659,
      "取消订单量": 1121,
      "被拒订单量": 361,
      "好评订单量": 7425
    },
    {
      "日期": "2015/10/20 00:00",
      "用户注册来源": "地推二维码扫描",
      "订单来源": "Android APP",
      "城市": "无锡",
      "新增订单量": 15780,
      "支付订单量": 15021,
      "待服务订单量": 483,
      "取消订单量": 128,
      "被拒订单量": 148,
      "好评订单量": 7780
    },
    {
      "日期": "2015/10/21 00:00",
      "用户注册来源": "应用商店",
      "订单来源": "微信公众号",
      "城市": "北京",
      "新增订单量": 12257,
      "支付订单量": 10486,
      "待服务订单量": 1326,
      "取消订单量": 346,
      "被拒订单量": 99,
      "好评订单量": 5262
    },
    {
      "日期": "2015/10/22 00:00",
      "用户注册来源": "UC浏览器引流",
      "订单来源": "微信公众号",
      "城市": "杭州",
      "新增订单量": 20503,
      "支付订单量": 20464,
      "待服务订单量": 25,
      "取消订单量": 11,
      "被拒订单量": 3,
      "好评订单量": 15729
    },
    {
      "日期": "2015/10/23 00:00",
      "用户注册来源": "地推二维码扫描",
      "订单来源": "微信公众号",
      "城市": "成都",
      "新增订单量": 15446,
      "支付订单量": 10638,
      "待服务订单量": 3772,
      "取消订单量": 457,
      "被拒订单量": 579,
      "好评订单量": 5344
    }
  ]
}`

defineExpose({
  onOpen
})
</script>

<style scoped lang="scss">
p {
  margin: 0;
  padding: 0;
}
.codeSnippet {
  cursor: pointer;
  padding-left: 10px;
  height: 30px;
  line-height: 30px;
  color: #1890ff;
}
</style>
