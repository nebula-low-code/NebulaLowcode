import { message } from 'ant-design-vue'
import { getCleanConfigJson } from '@/utils/clean-config-json'
import { useDataStore } from '@/stores'
import { setStorage } from '@/utils/storage-util'

export default function usePageSave(componentTreeList: any, reportId: any) {
  function onSave() {
    let configJson = getCleanConfigJson()
    setStorage(reportId, configJson)
    message.success('保存成功', 0.5)
  }

  return {
    onSave
  }
}
