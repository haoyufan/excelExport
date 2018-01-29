import BasicLayout from '../layouts/BasicLayout.vue'

import Analysis from '../pages/dashboard/Analysis.vue'
import Monitor from '../pages/dashboard/Monitor.vue'
import Workplace from '../pages/dashboard/Workplace.vue'

import UserLogin from '../pages/user/Login.vue'

import ClubList from '../pages/club/List.vue'
import ClubDetail from '../pages/club/Detail.vue'

import ClubAuditList from '../pages/club/audit/List.vue'
// import ClubAuditDetail from '../pages/club/audit/Detail.vue'

import Exception from '../pages/exception/Exception.vue'

export const menus = [
  {
    name: '概况',
    icon: 'el-icon-time',
    path: '',
    component: BasicLayout,
    redirect: '/dashboard/workplace',
    children: [
      {
        name: 'analysis',
        path: '/dashboard/analysis',
        component: Analysis,
        meta: {
          title: '分析页'
        }
      },
      {
        name: 'monitor',
        path: '/dashboard/monitor',
        component: Monitor,
        meta: {
          title: '监控页'
        }
      },
      {
        name: 'workplace',
        path: '/dashboard/workplace',
        role: [],
        component: Workplace,
        meta: {
          title: '工作台'
        }
      }
    ],
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    }
  },
  {
    name: 'club',
    icon: 'el-icon-time',
    path: '',
    component: BasicLayout,
    redirect: '/clubs',
    children: [
      {
        name: 'clubAudit',
        path: '/club/audit',
        component: ClubAuditList,
        meta: {
          title: '俱乐部审核'
        }
      },
      {
        name: 'clubQuery',
        path: '/clubs',
        component: ClubList,
        meta: {
          title: '俱乐部查询'
        }
      },
      // {
      //   name: 'clubAuditDetail',
      //   path: '/club/audit/:billId',
      //   props: true,
      //   component: ClubAuditDetail,
      //   meta: {
      //     title: '详情'
      //   }
      // },
      {
        name: 'clubQueryDetail',
        path: '/clubs/:clubId',
        props: true,
        component: ClubDetail,
        meta: {
          title: '详情'
        }
      }
    ],
    meta: {
      title: '俱乐部管理',
      requiresAuth: true
    }
  }
]

export default [
  ...menus,
  {
    name: 'signIn',
    path: '/user/login',
    component: UserLogin,
    meta: {
      title: '登录'
    }
  },
  {
    path: '',
    component: BasicLayout,
    children: [
      {
        name: 'exception',
        path: 'exception/:status',
        props: true,
        component: Exception,
        meta: {
          title: '异常'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/exception/404'
  }
]
