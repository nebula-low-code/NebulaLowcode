import { message } from 'ant-design-vue';

export default function usePageDelete() {
    function onDelete() {
        message.info('功能开发中')
    }

    return {
        onDelete
    }
}