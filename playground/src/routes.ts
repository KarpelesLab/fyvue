export const routes = [
  {
    path: '/',
    component: () => import('./views/IndexView.vue'),
  },
  {
    path: '/tests/i18n',
    component: () => import('./components/Helpers/TlocalesI18n.vue'),
  },

  /* KLB */
  {
    path: '/tests/KlbLogin',
    component: () => import('./components/KlbComponents/TKlbLogin.vue'),
  },
  {
    path: '/tests/KlbAccount',
    component: () => import('./components/KlbComponents/TKlbAccount.vue'),
  },
  {
    path: '/tests/KlbBilling',
    component: () => import('./components/KlbComponents/TKlbBilling.vue'),
  },
  {
    path: '/tests/Store',
    component: () => import('./components/Helpers/TStore.vue'),
  },
  {
    path: '/tests/FyInputBase',
    component: () => import('./components/FyComponents/TFyInputBase.vue'),
  },
  {
    path: '/tests/FyInput',
    component: () => import('./components/FyComponents/TFyInput.vue'),
  },
  {
    path: '/tests/FyPaging',
    component: () => import('./components/FyComponents/TFyPaging.vue'),
  },
  {
    path: '/tests/FyCirclePercent',
    component: () => import('./components/FyComponents/TFyCirclePercent.vue'),
  },
  {
    path: '/tests/FyModal',
    component: () => import('./components/FyComponents/TFyModal.vue'),
  },
  {
    path: '/tests/FySteps',
    component: () => import('./components/FyComponents/TFySteps.vue'),
  },
  {
    path: '/tests/FyBreadcrumb',
    component: () => import('./components/FyComponents/TFyBreadcrumb.vue'),
  },
  {
    path: '/tests/FyConfirm',
    component: () => import('./components/FyComponents/TFyConfirm.vue'),
  },

  {
    path: '/tests/FyDatatable',
    component: () => import('./components/FyComponents/TFyDatatable.vue'),
  },
  {
    path: '/tests/FyTable',
    component: () => import('./components/FyComponents/TFyTable.vue'),
  },
  {
    path: '/tests/FyLoader',
    component: () => import('./components/FyComponents/TFyLoader.vue'),
  },
];
