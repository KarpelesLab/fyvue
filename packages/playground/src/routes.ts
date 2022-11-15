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
      title: 'Components - Fyvue',
    },
  },
  {
    path: '/components/ui',
    component: () => import('./views/components/ui/IndexView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI' },
      ],
      title: 'UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyBreadcrumb',
    component: () => import('./views/components/ui/FyBreadcrumbView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyBreadcrumb' },
      ],
      title: 'FyBreadcrumb - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyCirclePercent',
    component: () => import('./views/components/ui/FyCirclePercentView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyCirclePercent' },
      ],
      title: 'FyCirclePercent - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyConfirm',
    component: () => import('./views/components/ui/FyConfirmView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyConfirm' },
      ],
      title: 'FyConfirm - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyDatatable',
    component: () => import('./views/components/ui/FyDatatableView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyDatatable' },
      ],
      title: 'FyDatatable - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyTable',
    component: () => import('./views/components/ui/FyTableView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyTable' },
      ],
      title: 'FyTable - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyInput',
    component: () => import('./views/components/ui/FyInputView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyInput' },
      ],
      title: 'FyInput - UI - Components - Fyvue',
    },
  },
  {
    path: '/components/ui/FyLoader',
    component: () => import('./views/components/ui/FyLoaderView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyLoader' },
      ],
      title: 'FyLoader - UI - Components - Fyvue',
    },
  },
  // CSS compos
  {
    path: '/components/css',
    component: () => import('./views/components/css/IndexView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'CSS' },
      ],
      title: 'CSS - Components - Fyvue',
    },
  },
  // KLB compos
  {
    path: '/components/klb',
    component: () => import('./views/components/klb/IndexView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb' },
      ],
      title: 'Klb - Components - Fyvue',
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
      title: 'KlbLogin - Klb - Components - Fyvue',
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
