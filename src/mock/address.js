import Mock from 'mockjs'

const List = []
const count = 3

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'platform|1': ['淘宝', '京东'],
    shop_name: '@title(1)',
    comment_disabled: true,
    province: '@province',
    city: '@city',
    district: '@county',
    'express_type|1': ['申通'],
    detail: '@county(true)',
    sender: '@name',
    phone: /\d{11}/
  }))
}

export default {
  getAddress: config => {
    return {
      code: 200,
      data: List
    }
  },
  addAddress: () => ({
    code: 200,
    data: 'success'
  }),
  delAddress: () => ({
    code: 200,
    data: 'success'
  })
}
