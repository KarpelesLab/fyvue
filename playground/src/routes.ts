export const routes = [
  {
    path: '/',
    component: () => import('./components/HelloWorld.vue')
  },
  {
    path: '/tests/FyCirclePercent',
    component: () => import('./components/TFyCirclePercent.vue')
  },
  {
    path: '/tests/FyModal',
    component: () => import('./components/TFyModal.vue')
  },
  {
    path: '/tests/FySteps',
    component: () => import('./components/TFySteps.vue')
  },
  {
    path: '/tests/FyBreadcrumb',
    component: () => import('./components/TFyBreadcrumb.vue')
  },
  {
    path: '/tests/FyConfirm',
    component: () => import('./components/TFyConfirm.vue')
  },
  {
    path: '/tests/i18n',
    component: () => import('./components/Ti18n.vue')
  }
]
