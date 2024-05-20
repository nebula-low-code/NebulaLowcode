import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './styles/index.less'

import Antd from 'ant-design-vue'

import * as echarts from 'echarts'
import ganttastic from '@infectoone/vue-ganttastic'

import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia).use(router).use(Antd).use(ganttastic).use(ContextMenu)
app.config.globalProperties.echarts = echarts
app.mount('#app')
