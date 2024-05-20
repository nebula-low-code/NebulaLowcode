// 设置 setStorage
export const setStorage = (key: any, value: any) => {
  if (value === '' || value === null || value === undefined) {
    value = null
  }
  let keyString = 'designer-' + key
  localStorage.setItem(
    keyString,
    JSON.stringify({
      value: value
    })
  )
}

// 获取 getStorage
export const getStorage = (key: any) => {
  let keyString = 'designer-' + key
  let storageStr = localStorage.getItem(keyString)
  if (storageStr) {
    return JSON.parse(storageStr).value
  }
  return null
}

// 删除 removeStorage
export const removeStorage = (key: any) => {
  localStorage.removeItem(key)
}

// 清空 clearStorage
export const clearStorage = () => {
  localStorage.clear()
}
