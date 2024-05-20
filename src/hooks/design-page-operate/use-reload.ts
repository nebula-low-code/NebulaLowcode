import { nextTick } from 'vue'
import { message } from 'ant-design-vue';

export default function usePageReload(isShow: any) {
    async function onReload() {
        isShow.value = false

        await nextTick()
        isShow.value = true

        message.success('重载成功')
    }

    return {
        onReload
    }
}