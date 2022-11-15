export const routes = [
  {
    path: '/',
    component: () => import('./views/IndexView.vue'),
  },
  {
    path: '/components',
    component: () => import('./views/components/IndexView.vue'),
    meta: {
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Components' }],
    },
  },
  {
    path: '/components/klb',
    component: () => import('./views/components/klb/IndexView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb' },
      ],
    },
  },
  {
    path: '/components/klb/KlbLogin',
    component: () => import('./views/components/klb/KlbLoginView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'KlbLogin' },
      ],
    },
  },
  /*
    {
    path: '/tests/i18n',
    component: () => import('./components/Helpers/TlocalesI18n.vue'),
  },
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
  */
];
