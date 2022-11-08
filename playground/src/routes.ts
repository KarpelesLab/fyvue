export const routes = [
  {
    path: '/',
    component: () => import('./components/HelloWorld.vue')
  },
  {
    path: '/tests/i18n',
    component: () => import('./components/Ti18n.vue')
  },
  {
    path: '/tests/KlbLogin',
    component: () => import('./components/TKlbLogin.vue')
  },
  {
    path: '/tests/Store',
    component: () => import('./components/TStore.vue')
  },
  {
    path: '/tests/FyInputBase',
    component: () => import('./components/TFyInputBase.vue')
  },
  {
    path: '/tests/FyInput',
    component: () => import('./components/TFyInput.vue')
  },
  {
    path: '/tests/FyPaging',
    component: () => import('./components/TFyPaging.vue')
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
    path: '/tests/FyDatatable',
    component: () => import('./components/TFyDatatable.vue')
  },
  {
    path: '/tests/FyTable',
    component: () => import('./components/TFyTable.vue')
  },
  {
    path: '/tests/FyLoader',
    component: () => import('./components/TFyLoader.vue')
  }
]
