import { constantRouterMap, asyncRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
function filterAsyncRouter(asyncRouterMap, role, commit) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, role)
        route.children.forEach(r => {
          if (r.meta.default) {
            commit('SET_DEFAULT_ROUTER', r.name)
          }
        })
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    defaultRoute: '',
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_DEFAULT_ROUTER: (state, route) => {
      state.defaultRoute = route
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { role } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, role, commit)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
