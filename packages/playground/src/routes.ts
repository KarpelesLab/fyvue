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
    path: '/helpers/formatting',
    component: () => import('./views/helpers/formattingView.vue'),
    meta: {
      title: 'Formatting - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Formatting' }],
    },
  },
  {
    path: '/helpers/store',
    component: () => import('./views/helpers/StoreView.vue'),
    meta: {
      title: 'store - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'store' }],
    },
  },
  {
    path: '/helpers/styles',
    component: () => import('./views/helpers/StylingView.vue'),
    meta: {
      title: 'Styles - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Styles' }],
    },
  },
  {
    path: '/helpers/events',
    component: () => import('./views/helpers/EventBusView.vue'),
    meta: {
      title: 'Events - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Events' }],
    },
  },
  {
    path: '/helpers/i18n',
    component: () => import('./views/helpers/I18N.vue'),
    meta: {
      title: 'Events - fyvue',
      breadcrumb: [{ name: 'fyvue', to: '/' }, { name: 'Klb i18next' }],
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
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'SSR', to: '/ssr' },
        { name: 'Rest' },
      ],
    },
  },
  {
    path: '/ssr/router',
    component: () => import('./views/ssr/RouterView.vue'),
    meta: {
      title: 'Router - SSR - fyvue',
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'SSR', to: '/ssr' },
        { name: 'Router' },
      ],
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
    children: [
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
        component: () =>
          import('./views/components/ui/FyCirclePercentView.vue'),
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
        path: '/components/ui/FyTabs',
        component: () => import('./views/components/ui/FyTabsView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'UI', to: '/components/ui' },
            { name: 'FyTabs' },
          ],
          title: 'FyTabs - UI - Components - fyvue',
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
    ],
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
    children: [
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
        component: () => import('./views/components/klb/useUserCheckView.vue'),
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
      {
        path: '/components/klb/KlbUserLocation',
        component: () =>
          import('./views/components/klb/KlbUserLocationView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbUserLocation' },
          ],
          title: 'KlbUserLocation - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbUserBilling',
        component: () =>
          import('./views/components/klb/KlbUserBillingView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbUserBilling' },
          ],
          title: 'KlbUserBilling - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbCatalog',
        component: () => import('./views/components/klb/KlbCatalogView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbCatalog' },
          ],
          title: 'KlbCatalog - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbOrder',
        component: () => import('./views/components/klb/KlbOrderView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbOrder' },
          ],
          title: 'KlbOrder - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbBillingHistory',
        component: () =>
          import('./views/components/klb/KlbBillingHistoryView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbBillingHistory' },
          ],
          title: 'KlbBillingHistory - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbPage',
        component: () => import('./views/components/klb/KlbPageView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbPage' },
          ],
          title: 'KlbPage - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbSupport',
        component: () => import('./views/components/klb/KlbSupportView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbSupport' },
          ],
          title: 'KlbSupport - Klb - Components - fyvue',
        },
      },
      {
        path: '/components/klb/KlbPage/:slug',
        component: () => import('./views/components/klb/KlbPageView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Klb', to: '/components/klb' },
            { name: 'KlbPage' },
          ],
          title: 'KlbPage - Klb - Components - fyvue',
        },
      },
    ],
  },

  // CSS compos
  {
    path: '/components/misc',
    component: () => import('./views/components/misc/IndexView.vue'),
    meta: {
      breadcrumb: [
        { name: 'fyvue', to: '/' },
        { name: 'Components', to: '/components' },
        { name: 'MISC' },
      ],
      title: 'MISC - Components - fyvue',
    },
    children: [
      {
        path: '/components/misc/ClientOnly',
        component: () => import('./views/components/misc/ClientOnlyView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Misc', to: '/components/misc' },
            { name: 'ClientOnly' },
          ],
          title: 'ClientOnly - MISC - Components - fyvue',
        },
      },
      {
        path: '/components/misc/typo',
        component: () => import('./views/components/misc/FyTypoView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Misc', to: '/components/misc' },
            { name: 'FyTypo' },
          ],
          title: 'FyTypo - MISC - Components - fyvue',
        },
      },
      {
        path: '/components/misc/button',
        component: () => import('./views/components/misc/ButtonView.vue'),
        meta: {
          breadcrumb: [
            { name: 'fyvue', to: '/' },
            { name: 'Components', to: '/components' },
            { name: 'Misc', to: '/components/misc' },
            { name: 'Button' },
          ],
          title: 'Button - MISC - Components - fyvue',
        },
      },
    ],
  },
  {
    path: '/:path(.*)',
    component: () => import('./views/404View.vue'),
  },
];
