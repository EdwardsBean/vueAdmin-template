import { param2Obj } from '@/utils'

const loginRes = {
  code: 200,
  data: {
    // 登录名不同，来展示不同的菜单.admin ,express, agent, user
    token: ''
  }
}

// 服务端返回role,前端根据role来渲染菜单。后端接口做权限控制
const userMap = {
  express: {
    code: 200,
    data: {
      role: 'express',
      introduction: '我是快递员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的快递员'
    }
  },
  admin: {
    code: 200,
    data: {
      role: 'admin',
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的Admin'
    }
  },
  agent: {
    code: 200,
    data: {
      role: 'agent',
      introduction: '我是代理',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的代理'
    }
  },
  user: {
    code: 200,
    data: {
      role: 'user',
      introduction: '我是用户',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '用户小可爱'
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    loginRes.data.username = username
    // 登录名不同，来展示不同的菜单.admin ,express, agent, user
    loginRes.data.token = username
    return loginRes
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      code: 200,
      data: 'success'
    }
  }
}
