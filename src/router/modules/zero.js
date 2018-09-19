
import Layout from '@/views/layout/Layout'

// 系统管理模块
const componentsRouter = {
  path: '/zero',
  component: Layout,
  redirect: 'noredirect',
  name: 'zero',
  meta: {
    title: 'zero',
    icon: 'icon'
  },
  children: [
    {
      path: 'userManager',
      component: () => import('@/views/login/index'),
      name: 'userManager',
      meta: { title: 'userManager' }
    },
    {
      path: 'menuManager',
      component: () => import('@/views/login/index'),
      name: 'menuManager',
      meta: { title: 'menuManager' }
    },
    {
      path: 'deptManager',
      component: () => import('@/views/login/index'),
      name: 'deptManager',
      meta: { title: 'deptManager' }
    },
    {
      path: 'roleManager',
      component: () => import('@/views/login/index'),
      name: 'roleManager',
      meta: { title: 'roleManager' }
    },
    {
      path: 'auditLog',
      component: () => import('@/views/login/index'),
      name: 'auditLog',
      meta: { title: 'auditLog' }
    },
    {
      path: 'maintenanceLog',
      component: () => import('@/views/login/index'),
      name: 'maintenanceLog',
      meta: { title: 'maintenanceLog' }
    },
    {
      path: 'loginLog',
      component: () => import('@/views/login/index'),
      name: 'loginLog',
      meta: { title: 'loginLog' }
    },
    {
      path: 'setup',
      component: () => import('@/views/login/index'),
      name: 'setup',
      meta: { title: 'setup' }
    }
  ]
}

export default componentsRouter
