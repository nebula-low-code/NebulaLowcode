<template>
  <div class="header">
    <div class="header-left">
      <div style="display: inline-block; cursor: pointer" :style="{ color: store.isShowLeftMenu ? '' : '#409eff' }" @click="onToggleLeftMenu">
        <i class="iconfont iconicon_yingyongguanli" style="margin-right: 5px; vertical-align: middle"></i>
        <span style="vertical-align: middle">组件库</span>
      </div>
    </div>
    <div class="header-center">
      <a-button type="text" @click="$emit('onSave')">
        <template #icon>
          <i class="iconfont iconsave1" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">保存</span>
      </a-button>

      <!-- <a-button type="text" @click="$emit('onReload')">
        <template #icon>
          <i class="iconfont iconsave1" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">重载</span>
      </a-button> -->
      <a-button type="text" @click="$emit('onClear')">
        <template #icon>
          <i class="iconfont iconqingkong" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">清空</span>
      </a-button>
      <a-button type="text" @click="onPcPreview">
        <template #icon>
          <i class="iconfont iconkejian" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">预览</span>
      </a-button>
      <a-button type="text" @click="onDownload">
        <template #icon>
          <i class="iconfont iconcloud-download" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">导出HTML</span>
      </a-button>
      <a-button type="text" @click="onHomePage">
        <template #icon>
          <i class="iconfont iconhomepage" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">官网</span>
      </a-button>
      <a-button type="text" @click="onGitee">
        <template #icon>
          <i class="iconfont icongitee" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">gitee</span>
      </a-button>
      <a-button type="text" @click="onGithub">
        <template #icon>
          <i class="iconfont icongithub" style="margin-right: 2px; vertical-align: middle"></i>
        </template>
        <span style="vertical-align: middle">github</span>
      </a-button>
    </div>
    <div class="header-right">
      <div style="display: inline-block; cursor: pointer" :style="{ color: store.isShowRightMenu ? '' : '#409eff' }" @click="onToggleRightMenu">
        <i class="iconfont iconset" style="margin-right: 5px; vertical-align: middle"></i>
        <span style="vertical-align: middle">组件配置</span>
      </div>
    </div>
    <a-modal v-model:open="pageJsonVisible" width="50%" title="页面代码" cancelText="取消" okText="确认" @ok="handleOk">
      <a-textarea style="height: 60vh" v-model:value="configJson"></a-textarea>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDataStore } from '@/stores'
import { getCleanConfigJson } from '@/utils/clean-config-json'
import { prefix, suffix } from './html.js'

const store = useDataStore()
const globalVariableRef = ref()
const historyRef = ref()
const previewRef = ref()
const pageJsonVisible = ref<boolean>(false)
const configJson = ref('')
const previewType = ref('')
const showJsonModal = () => {
  configJson.value = getCleanConfigJson(4)
  pageJsonVisible.value = true
}
const emit = defineEmits(['loadConfigJson'])

const showGlobalVariableModal = () => {
  globalVariableRef.value.onOpen()
}

const handleOk = (e: MouseEvent) => {
  pageJsonVisible.value = false
  emit('loadConfigJson', JSON.stringify(JSON.parse(configJson.value)))
}

function onToggleLeftMenu() {
  store.isShowLeftMenu = !store.isShowLeftMenu
}
function onToggleRightMenu() {
  store.isShowRightMenu = !store.isShowRightMenu
}

function showHistory() {
  historyRef.value.onOpen(getCleanConfigJson())
}

function onLoadHistory(configJson: string) {
  emit('loadConfigJson', configJson)
}

function onPcPreview() {
  const base_url = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')

  window.open(base_url + '/preview.html')
}

function onDownload() {
  configJson.value = getCleanConfigJson()
  let htmlstr = prefix + configJson.value + suffix

  let name = 'demo.html'
  const link = document.createElement('a')
  link.download = name
  link.style.display = 'none'
  const blob = new Blob([htmlstr])
  link.href = URL.createObjectURL(blob)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function onHomePage() {
  window.open('https://www.xingyunzuo.cn/?from=demo')
}

function onGitee() {
  window.open('https://gitee.com/Nebula-lowcode/nebulalowcode')
}

function onGithub() {
  window.open('https://github.com/nebula-low-code/Nebula-lowcode')
}

function onMobilePreview({ key }: any) {
  previewRef.value.onOpen(key)
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  color: rgba(10, 18, 32, 0.64);
  background-color: #fff;
  border-bottom: 1px solid #ebeef5;
  &-left {
    width: 200px;
    user-select: none;
    i {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
  &-center {
    flex: 1;
    text-align: center;
  }
  &-right {
    width: 200px;
    text-align: right;
    user-select: none;
    i {
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>
