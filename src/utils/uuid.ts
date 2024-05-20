export const generateUUID = (prefix?: string) => {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return (prefix || 'van-') + uuid // 为什么要加van-？因为需要支持自定义class功能，html的class不支持数字开头
}
