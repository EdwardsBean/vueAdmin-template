import request from '@/utils/request'

/**
 * 按等级升序排序
 */
export function getList() {
  return request({
    url: '/config/list',
    method: 'get'
  })
}

export function saveConfig(param) {
  return request({
    url: '/config/save',
    method: 'post',
    data: param
  })
}

export function deleteConfig(id) {
  return request({
    url: '/config/delete',
    method: 'post',
    data: { id }
  })
}

/**
 * 根据获得对应的参数
 */
export function getOne(param) {
  return request({
    url: '/config/one',
    method: 'get',
    params: param
  })
}

export function getWeightLimit() {
  return getOne({
    name: 'WEIGHT'
  })
}
