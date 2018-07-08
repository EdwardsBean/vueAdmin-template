
/**
 * 后端返回所有菜单，前端根据菜单中的meta.roles,筛选当前用户role匹配的菜单
 * 后端接口限制
 */
const menu = [
  {
    path: '/globalstat',
    meta: {
      roles: ['admin', 'agent'] // you can set roles in root nav
    },
    children: [{
      name: 'systemOverview',
      meta: { title: '系统概览', icon: 'table', default: true },
      path: 'index'
    }]
  },
  {
    path: 'express',
    meta: {
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
      name: 'expressCount',
      path: 'stat',
      meta: { title: '单号统计', icon: 'table' }
    }]
  },
  {
    path: '/order',
    meta: {
      roles: ['courier'] // you can set roles in root nav
    },
    children: [{
      name: 'orderQuery',
      path: 'list',
      meta: { title: '订单查询', icon: 'table' }
    }]
  },
  {
    path: '/system',
    meta: {
      title: '系统设置',
      icon: 'table',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
      path: 'level',
      meta: { title: '快递等级', icon: 'table' }
    },
    {
      path: 'param',
      meta: { title: '通用参数', icon: 'table' }
    },
    {
      path: 'express',
      meta: { title: '快递费用', icon: 'table' }
    }
    ]
  },
  {
    path: '/agent',
    icon: '',
    meta: {
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
      path: 'list',
      meta: { title: '代理管理', icon: 'table' }
    }]
  },
  {
    path: '/express',
    icon: '',
    meta: {
      roles: ['admin'] // you can set roles in root nav
    },
    children: [{
      path: 'list',
      meta: { title: '快递员管理', icon: 'table' }
    }]
  },
  {
    path: '/user',
    icon: '',
    meta: {
      roles: ['admin', 'agent'] // you can set roles in root nav
    },
    children: [{
      path: 'list',
      meta: { title: '会员管理', icon: 'table' }
    }]
  },
  {
    path: '/user',
    icon: '',
    meta: {
      roles: ['user'] // you can set roles in root nav
    },
    children: [{
      name: 'userOverview',
      path: 'overview',
      meta: { title: '首页', icon: 'table', default: true }
    }]
  },
  {
    path: '/address',
    icon: '',
    meta: {
      roles: ['user'] // you can set roles in root nav
    },
    children: [{
      path: 'list',
      meta: { title: '地址管理', icon: 'table' }
    }]
  },
  {
    name: '订单管理',
    path: '/order',
    icon: '',
    meta: {
      roles: ['user'] // you can set roles in root nav
    },
    children: [{
      path: 'list',
      meta: { title: '订单列表', icon: 'table' }
    }]
  },
  {
    path: '/money',
    meta: {
      title: '财务管理',
      icon: 'table',
      roles: ['user'] // you can set roles in root nav
    },
    children: [{
      path: 'charge',
      meta: { title: '在线充值', icon: 'table' }
    },
    {
      path: 'spend',
      meta: { title: '消费记录', icon: 'table' }
    },
    {
      path: 'income',
      meta: { title: '充值记录', icon: 'table' }
    }
    ]
  }
]

export default menu
