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
    path: '/pages/:slug',
    component: () => import('./views/PageView.vue'),
    meta: {},
  },
  {
    path: '/Contact',
    component: () => import('./views/ContactIndex.vue'),
  },
  {
    path: '/blog/:slug(.*)?',
    name: 'cmsNews',
    component: () => import('./views/BlogView.vue'),
    meta: {},
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
        path: '/components/ui/:slug',
        component: () => import('./views/components/ComponentView.vue'),
        meta: {
          breadcrumb: [],
          category: 'ui',
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
        path: '/components/klb/:slug',
        component: () => import('./views/components/ComponentView.vue'),
        meta: {
          breadcrumb: [],
          category: 'klb',
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
        path: '/components/misc/:slug',
        component: () => import('./views/components/ComponentView.vue'),
        meta: {
          breadcrumb: [],
          category: 'misc',
        },
      },
    ],
  },
  {
    path: '/:path(.*)',
    component: () => import('./views/Error404View.vue'),
  },
];
