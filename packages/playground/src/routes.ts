export const routes = [
  {
    path: '/',
    component: () => import('./views/IndexView.vue'),
  },
  {
    path: '/login',
    component: () => import('./views/LoginView.vue'),
    meta: {
      title: 'Login - fyvue',
    },
  },
  {
    path: '/ssr',
    component: () => import('./views/ssr/IndexView.vue'),
    meta: {
      title: 'SSR - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'SSR' }],
    },
  },
  {
    path: '/ssr/rest',
    component: () => import('./views/ssr/RestView.vue'),
    meta: {
      title: 'Rest - SSR - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'SSR', to: '/ssr' }, { name: 'Rest'}],
    },
  },
  {
    path: '/ssr/router',
    component: () => import('./views/ssr/RouterView.vue'),
    meta: {
      title: 'Router - SSR - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'SSR', to: '/ssr' }, { name: 'Router'}],
    },
  },
  {
    path: '/components',
    component: () => import('./views/components/IndexView.vue'),
    meta: {
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Components' }],
      title: 'Components - fyvue',
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
      title: 'UI - Components - fyvue',
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
      title: 'FyBreadcrumb - UI - Components - fyvue',
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
      title: 'FyCirclePercent - UI - Components - fyvue',
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
      title: 'FyConfirm - UI - Components - fyvue',
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
      title: 'FyDatatable - UI - Components - fyvue',
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
      title: 'FyTable - UI - Components - fyvue',
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
      title: 'FyInput - UI - Components - fyvue',
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
      title: 'FyLoader - UI - Components - fyvue',
    },
  },
  {
    path: '/components/ui/FyNavbar',
    component: () => import('./views/components/ui/FyNavbarView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyNavbar' },
      ],
      title: 'FyNavbar - UI - Components - fyvue',
    },
  },
  {
    path: '/components/ui/FyPaging',
    component: () => import('./views/components/ui/FyPagingView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FyPaging' },
      ],
      title: 'FyPaging - UI - Components - fyvue',
    },
  },
  {
    path: '/components/ui/FySteps',
    component: () => import('./views/components/ui/FyStepsView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'UI', to: '/components/ui' },
        { name: 'FySteps' },
      ],
      title: 'FySteps - UI - Components - fyvue',
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
      title: 'Klb - Components - fyvue',
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
      title: 'KlbLogin - Klb - Components - fyvue',
    },
  },
  {
    path: '/components/klb/KlbAddPaymentMethodModal',
    component: () =>
      import('./views/components/klb/KlbAddPaymentMethodModalView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'KlbAddPaymentMethodModal' },
      ],
      title: 'KlbAddPaymentMethodModal - Klb - Components - fyvue',
    },
  },
  {
    path: '/components/klb/KlbDeleteAccount',
    component: () =>
      import('./views/components/klb/KlbDeleteAccountView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'KlbDeleteAccount' },
      ],
      title: 'KlbDeleteAccount - Klb - Components - fyvue',
    },
  },
  {
    path: '/components/klb/KlbUpdatePasswordModal',
    component: () =>
      import('./views/components/klb/KlbUpdatePasswordModalView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'KlbUpdatePasswordModal' },
      ],
      title: 'KlbUpdatePasswordModal - Klb - Components - fyvue',
    },
  },
  {
    path: '/components/klb/KlbUpdateEmailModal',
    component: () =>
      import('./views/components/klb/KlbUpdateEmailModalView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'KlbUpdateEmailModal' },
      ],
      title: 'KlbUpdateEmailModal - Klb - Components - fyvue',
    },
  },
  {
    path: '/components/klb/useUserCheck',
    component: () =>
      import('./views/components/klb/useUserCheckView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'Klb', to: '/components/klb' },
        { name: 'useUserCheck' },
      ],
      title: 'useUserCheck - Klb - Components - fyvue',
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
      title: 'CSS - Components - fyvue',
    },
  },
  {
    path: "/:path(.*)",
    component: () => import("./views/404View.vue"),
  },
];
