// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  BlankLayout
} from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/chart',
    children: [

      // chart
      {
        path: '/chart',
        name: 'chart',
        hideChildrenInMenu: true,
        component: () => import('@/views/chart/index'),
        meta: {
          title: '数据统计',
          icon: 'bar-chart',
          keepAlive: true,
          permission: ['admin', 'common']
        }
      },

      // fund
      {
        path: '/fund',
        name: 'fund',
        hideChildrenInMenu: true,
        component: () => import('@/views/fund/index'),
        meta: {
          title: '提现管理',
          icon: 'export',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // achievement 
      {
        path: '/achievement',
        name: 'achievement',
        hideChildrenInMenu: true,
        component: () => import('@/views/achievement/index'),
        meta: {
          title: '业绩管理',
          icon: 'crown',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // wechat
      {
        path: '/order/wechat',
        name: 'OrderWechat',
        hideChildrenInMenu: true,
        component: () => import('@/views/wechat/index'),
        meta: {
          title: '小程序订单',
          icon: 'mobile',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // goods
      {
        path: '/pick',
        name: 'pick',
        hideChildrenInMenu: true,
        component: () => import('@/views/pick/index'),
        meta: {
          title: '商品取货码',
          icon: 'shop',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // order
      {
        path: '/order/recharge',
        name: 'OrderRecharge',
        hideChildrenInMenu: true,
        component: () => import('@/views/recharge/index'),
        meta: {
          title: '充值记录',
          icon: 'credit-card',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // order
      {
        path: '/order/distribute',
        name: 'OrderDistribute',
        hideChildrenInMenu: true,
        component: () => import('@/views/order/index'),
        meta: {
          title: '分销订单',
          icon: 'ordered-list',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // relation
      {
        path: '/relation',
        name: 'relation',
        hideChildrenInMenu: true,
        component: () => import('@/views/relation/index'),
        meta: {
          title: '分销关系管理',
          icon: 'control',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // coffee
      {
        path: '/device',
        name: 'device',
        component: RouteView,
        redirect: '/device/list',
        meta: {
          title: '咖啡机',
          icon: 'coffee',
          permission: ['admin', 'common']
        },
        children: [{
          path: '/device/list',
          name: 'deviceList',
          component: () => import('@/views/device/list/index'),
          meta: {
            title: '设备管理',
            keepAlive: true
          }
        }, {
          path: '/device/order',
          name: 'deviceOrder',
          component: () => import('@/views/device/order/index'),
          meta: {
            title: '设备订单',
            keepAlive: true
          }
        }]
      },

      // Carousel
      {
        path: '/image',
        name: 'image',
        hideChildrenInMenu: true,
        component: () => import('@/views/image/index'),
        meta: {
          title: '营销图管理',
          icon: 'file-image',
          keepAlive: true,
          permission: ['admin']
        }
      },

      // system
      {
        path: '/system',
        name: 'system',
        component: RouteView,
        redirect: '/system/user/list',
        meta: {
          title: '系统设置',
          icon: 'setting',
          permission: ['admin']
        },
        children: [{
            path: '/system/user/list',
            name: 'UserList',
            component: () => import('@/views/system/user/list/index'),
            meta: {
              title: '一般用户',
              keepAlive: true
            }
          },
          {
            path: '/system/user/register',
            name: 'UserRegister',
            component: () => import('@/views/system/user/register/index'),
            meta: {
              title: '注册用户',
              keepAlive: true
            }
          },
          {
            path: '/system/distribute',
            name: 'distribute',
            component: () => import('@/views/system/distribute/Index'),
            meta: {
              title: '分销设置',
              hideHeader: true
            },
            redirect: '/system/distribute/grade',
            hideChildrenInMenu: true,
            children: [{
                path: '/system/distribute/withdrawal',
                name: 'DistributeWithdrawal',
                component: () => import('@/views/system/distribute/withdrawal/index'),
                meta: {
                  title: '提现设置',
                  hidden: true,
                  keepAlive: false
                }
              },
              {
                path: '/system/distribute/grade',
                name: 'DistributeGrade',
                component: () => import('@/views/system/distribute/grade/index'),
                meta: {
                  title: '等级设置',
                  hidden: true,
                  keepAlive: false
                }
              },
              {
                path: '/system/distribute/recruit',
                name: 'DistributeRecruit',
                component: () => import('@/views/system/distribute/recruit/index'),
                meta: {
                  title: '分销员招募管理',
                  hidden: true,
                  keepAlive: true
                }
              },
              {
                path: '/system/distribute/mode',
                name: 'DistributeMode',
                component: () => import('@/views/system/distribute/mode/index'),
                meta: {
                  title: '分销模式',
                  hidden: true,
                  keepAlive: true
                }
              },
              {
                path: '/system/distribute/right',
                name: 'DistributeRight',
                component: () => import('@/views/system/distribute/right/index'),
                meta: {
                  title: '权益设置',
                  hidden: true,
                  keepAlive: true
                }
              },
              {
                path: '/system/distribute/payment',
                name: 'DistributePayment',
                component: () => import('@/views/system/distribute/payment/index'),
                meta: {
                  title: '结算与打款设置',
                  hidden: true,
                  keepAlive: true
                }
              }
            ]
          }
        ]
      },

      // account
      {
        path: '/account',
        component: RouteView,
        hidden: true,
        redirect: '/account/settings',
        name: 'account',
        meta: {
          title: '个人页',
          icon: 'user',
          keepAlive: true,
          permission: ['user']
        },
        children: [{
          path: '/account/settings',
          name: 'settings',
          component: () => import('@/views/account/settings/Index'),
          meta: {
            title: '个人资料',
            hideHeader: true,
            permission: ['user']
          },
          redirect: '/account/settings/base',
          hideChildrenInMenu: true,
          children: [{
              path: '/account/settings/base',
              name: 'BaseSettings',
              component: () => import('@/views/account/settings/BaseSetting'),
              meta: {
                title: '密码修改',
                hidden: true,
                permission: ['user']
              }
            },
            {
              path: '/account/settings/security',
              name: 'SecuritySettings',
              component: () => import('@/views/account/settings/Security'),
              meta: {
                title: '安全设置',
                hidden: true,
                keepAlive: true,
                permission: ['user']
              }
            },
            {
              path: '/account/settings/notification',
              name: 'NotificationSettings',
              component: () => import('@/views/account/settings/Notification'),
              meta: {
                title: '新消息通知',
                hidden: true,
                keepAlive: true,
                permission: ['user']
              }
            }
          ]
        }]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]