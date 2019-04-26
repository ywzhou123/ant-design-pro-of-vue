import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login/Login'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: '首页',
      component: MenuView,
      redirect: '/login',
      icon: 'none',
      invisible: true,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/dashboard/analysis',
              name: '分析页',
              component: () => import('@/views/Dashboard/Analysis'),
              icon: 'none'
            },
            {
              path: '/dashboard/monitor',
              name: '监控页',
              component: () => import('@/views/Dashboard/Monitor'),
              icon: 'none'
            },
            {
              path: '/dashboard/workplace',
              name: '工作台',
              component: () => import('@/views/Dashboard/Workplace'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/form',
          name: '表单页',
          component: RouteView,
          icon: 'form',
          children: [
            {
              path: '/form/basic',
              name: '基础表单',
              component: () => import('@/views/Form/BasicForm'),
              icon: 'none'
            },
            {
              path: '/form/step',
              name: '分步表单',
              component: () => import('@/views/Form/StepForm'),
              icon: 'none'
            },
            {
              path: '/form/advanced',
              name: '高级表单',
              component: () => import('@/views/Form/AdvancedForm'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/list',
          name: '列表页',
          component: RouteView,
          icon: 'table',
          children: [
            {
              path: '/list/query',
              name: '查询表格',
              component: () => import('@/views/List/QueryList'),
              icon: 'none'
            },
            {
              path: '/list/step',
              name: '标准列表',
              component: () => import('@/views/List/StandardList'),
              icon: 'none'
            },
            {
              path: '/list/advanced',
              name: '卡片列表',
              component: () => import('@/views/List/CardList'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/detail',
          name: '详情页',
          component: RouteView,
          icon: 'profile',
          children: [
            {
              path: '/detail/basic',
              name: '基础详情页',
              component: () => import('@/views/Detail/BasicDetail'),
              icon: 'none'
            },
            {
              path: '/detail/step',
              name: '高级详情页',
              component: () => import('@/views/Detail/AdvancedDetail'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/result',
          name: '结果页',
          component: RouteView,
          icon: 'check-circle-o',
          children: [
            {
              path: '/result/success',
              name: '成功',
              component: () => import('@/views/Result/Success'),
              icon: 'none'
            },
            {
              path: '/result/error',
              name: '失败',
              component: () => import('@/views/Result/Error'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/exception',
          name: '异常页',
          component: RouteView,
          icon: 'warning',
          children: [
            {
              path: '/exception/404',
              name: '404',
              component: () => import('@/views/Exception/404'),
              icon: 'none'
            },
            {
              path: '/exception/403',
              name: '403',
              component: () => import('@/views/Exception/403'),
              icon: 'none'
            },
            {
              path: '/exception/500',
              name: '500',
              component: () => import('@/views/Exception/500'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/account',
          name: '个人页',
          component: RouteView,
          icon: 'user',
          children: [
            {
              path: '/account/center',
              name: '个人中心',
              component: () => import('@/views/Account/Center'),
              icon: 'none'
            },
            {
              path: '/account/setting',
              name: '个人设置',
              component: () => import('@/views/Account/Settings'),
              icon: 'none'
            }
          ]
        }
      ]
    }
  ]
})
