import request from '@/utils/request'

export function getAddress() {
  return request({
    url: '/address/list',
    method: 'get'
  })
}

export function delAddress(id) {
  return request({
    url: '/address/del',
    method: 'post',
    data: {
      id
    }
  })
}

export function updateAddress(address) {
  return request({
    url: '/address/add',
    method: 'post',
    data: address
  })
}

export function addAddress(address) {
  return request({
    url: '/address/add',
    method: 'post',
    data: address
  })
}
