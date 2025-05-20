import { DataSourceType } from './constants'

//解析字符串中所有{}包围的字段,作为数组返回
export function extractParams(sql: string): string[] {
  // 定义正则表达式匹配 {} 中的内容
  const regex = /\{(\s*.*?\s*)\}/g
  let matches: RegExpExecArray | null
  const params: string[] = []

  // 使用正则表达式匹配并提取参数
  while ((matches = regex.exec(sql)) !== null) {
    // 去除空格
    const paramName = matches[1].trim()
    params.push(paramName)
  }

  return params
}

export function isNetworkDatasource(dataSourceType: string) {
  return dataSourceType === DataSourceType.INTERFACE || dataSourceType === DataSourceType.CONNECT || dataSourceType === DataSourceType.DATABASE || dataSourceType === DataSourceType.SQL|| dataSourceType === DataSourceType.DIFY
}

export function imageToBase64(url: string, callback: Function) {
  let img = new Image(),
    dataURL = ''
  img.src = url + '?v=' + Math.random()
  img.setAttribute('crossOrigin', 'Anonymous')
  img.onload = function () {
    let canvas = document.createElement('canvas'),
      width = img.width,
      height = img.height
    canvas.width = width
    canvas.height = height
    canvas.getContext('2d')?.drawImage(img, 0, 0, width, height)
    dataURL = canvas.toDataURL('image/jpeg')
    callback ? callback(dataURL) : null
  }
}
