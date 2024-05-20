import request from '@/api/request'

export function loginServer(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取外部系统连接列表
 *
 */
export function getConnectListService() {
  return request({
    url: '/db/v4/connect/list',
    method: 'get'
  })
}

/**
 * 获取外部系统连接列表
 *
 */
export function getConnectTreeList() {
  return request({
    url: '/db/v5/connect/list',
    method: 'get'
  })
}

/**
 * 通过api id查询接口数据
 * @param dataApiId apiId
 * @param params 参数
 */
export function queryApiDataService(data: any) {
  return request({
    url: '/data/v1/data/api',
    method: 'post',
    data
  })
}

/**
 * 获取iconFont图标
 */
export function iconList(params: any) {
  return request({
    url: '/icon/v1/list',
    method: 'get',
    params
  })
}

//权限组件所有菜单
export function getAuthTree() {
  return request({
    url: '/menu/v1/all/auth/tree',
    method: 'get'
  })
}

//菜单下的组件
export function getMenuComponentById(params: object) {
  return request({
    url: '/menu/v1/componentById',
    method: 'get',
    params
  })
}

export function getProcessParamService(params: object) {
  return request({
    url: '/data/process/v4/getParam',
    method: 'get',
    params
  })
}

/**
 * 权限控制(新增或者修改)
 *
 * @param reportId
 * @param type
 * @param authorityName
 * @param authorityId
 */
export function saveAuthorityService(params: any) {
  // return request({
  //   url: '/authority/v1/save',
  //   method: 'post',
  //   data: params
  // })
}

/**
 * 删除权限控制
 *
 * @param authorityId
 */
export function deleteAuthorityService(params: any) {
  // return request({
  //   url: '/authority/v1/delete',
  //   method: 'delete',
  //   params
  // })
}

/**
 * 创建表
 * @param dbConfigId
 * @param tableName
 * @param columns []
 */
export function addDbTable(params: any) {
  return request({
    url: '/v1/dbTool/createTable',
    method: 'post',
    data: params
  })
}

/**
 * 数据库连接列表
 */
export function getDbSrclist() {
  return request({
    url: '/v1/dbTool/dbSrclist',
    method: 'get'
  })
}

export function crudByModelService(params: any) {
  return request({
    url: '/crud/model',
    method: 'post',
    data: params
  })
}
