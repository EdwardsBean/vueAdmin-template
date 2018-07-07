import { param2Obj } from '@/utils'
import menu from './menu'

const loginRes = {
  code: 200,
  data: {
    // 修改这里，来展示不同的菜单.admin ,courier, agent, user
    token: 'admin'
  }
}

const userMap = {
  courier: {
    code: 200,
    data: {
      role: 'courier',
      introduction: '我是快递员',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的快递员'
    }
  },
  admin: {
    code: 200,
    data: {
      role: 'admin',
      introduction: '我是超级管理员',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的Admin'
    }
  },
  agent: {
    code: 200,
    data: {
      role: 'agent',
      introduction: '我是代理',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '你可爱的代理'
    }
  },
  user: {
    code: 200,
    data: {
      role: 'user',
      introduction: '我是用户',
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      nickname: '用户小可爱'
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    loginRes.data.username = username
    return loginRes
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      var r = userMap[token]
      r.data.menu = menu
      return r
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
