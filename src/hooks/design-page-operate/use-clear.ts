import { message } from 'ant-design-vue'
import { Modal } from 'ant-design-vue'
import { useDataStore } from '@/stores'

export default function usePageClear(componentTreeList: any) {
  function onClear() {
    const store = useDataStore()
    Modal.confirm({
      title: '请确认是否清空所有组件和接口?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        message.success('清除成功')
        componentTreeList.value = []
        store.interfaceMap = {}
        store.componentListMap = {}
        store.componentTreeList = []
      },
      onCancel() {
        console.log('Cancel')
      },
      class: 'test'
    })
  }

  return {
    onClear
  }
}
