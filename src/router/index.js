import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles),没写就是有权限
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true }
]

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'stat/admin',
    meta: {
      roles: ['admin', 'agent']
    },
    children: [{
      name: 'statadmin',
      component: () => import('@/views/stat/admin'),
      meta: { title: '系统概览', icon: 'dashboard' },
      path: 'stat/admin'
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/stat/user',
    meta: {
      roles: ['user']
    },
    children: [{
      name: 'statuser',
      component: () => import('@/views/stat/user'),
      path: 'stat/user',
      meta: { title: '系统概览', icon: 'dashboard' }
    }]
  },
  {
    path: '/system',
    meta: {
      title: '系统设置',
      roles: ['admin'],
      icon: 'config'
    },
    component: Layout,
    redirect: 'noredirect',
    children: [
      {
        path: 'param',
        component: () => import('@/views/system/config'),
        meta: { title: '通用参数', icon: 'param' }
      },
      {
        path: 'user',
        component: () => import('@/views/system/user'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: {
      roles: ['user', 'admin', 'agent']
    },
    children: [{
      path: 'list',
      component: () => import('@/views/order/list'),
      meta: { title: '订单列表', icon: 'order' }
    }]
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

