import request from '@/api/request'

/**
 * 常用图片列表V2
 */
export function imageList(params: any) {
  return request({
    url: '/file/v2/list',
    method: 'get',
    params
  })
}
/**
 * 删除图片
 */
export function deleteUploadImage(params: any) {
  return request({
    url: '/file/v1/delete',
    method: 'DELETE',
    params
  })
}
