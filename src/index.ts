import { createApp } from 'vue'
// import './assets/main.css';
import Antd from 'ant-design-vue'
import SdkPage from "./views/sdkEntry/SdkPage.vue";
// import type { PageConfig } from '@/views/models';
import { createPinia } from 'pinia'
import router from './router'
import * as echarts from 'echarts'
class NebularPCRenderer {
    constructor(props: any) {
        this.config = props;
        console.log('---constructor---',this.config)
        this.init();
    }
    config: any = {
        merchantId: 10,
        projectId:330,
        reportId:5340,
        token:"",
        permission:"",
        pageParams:"",
    }
    editbox:any
    init() {
        const app = createApp(SdkPage, {
            ...this.config,
            onInit: (editbox: any) => {
                console.log("edit", editbox);

            }
        })
        const pinia = createPinia()
        app.use(pinia).use(router).use(Antd)
        app.config.globalProperties.echarts = echarts
        app.mount('#app');
    }
    loadData() {
        console.log("loadData");
    }
    

}
//兼容seajs
// define(function (require:any, exports:any, module:any) {
//     return NebularRendererPC;
// })

export default NebularPCRenderer;
