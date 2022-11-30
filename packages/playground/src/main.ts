import { createSSRApp, createApp as createRegularApp } from 'vue';
import { createFyvue } from '@karpeleslab/fyvue';
import { getPrefix } from '@karpeleslab/klbfw';
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import { createHead } from '@vueuse/head';
import { createFyHead } from '@fy/head';

import { createPinia } from 'pinia';
import { routes } from './routes';
import VueCodeHighlight from 'vue-code-highlight';
import { installSchemaOrg } from '@vueuse/schema-org-vite/vite';

import './style.scss';
import 'vue-code-highlight/themes/prism-tomorrow.css';
import App from './AppSuspender.vue';
import FyDocPreview from '@/components/FvDocPreview.vue';
import FvHL from '@/components/FvHL.vue';

export const createApp = async (isSSR = false) => {
  const head = createHead();
  const pinia = createPinia();

  const fyvue = createFyvue();
  const app = isSSR ? createSSRApp(App) : createRegularApp(App);
  const router = createRouter({
    history: import.meta.env.SSR
      ? createMemoryHistory(getPrefix())
      : createWebHistory(getPrefix()),
    routes,
  });

  app.use(router);
  app.use(head);
  app.use(pinia);
  const fyhead = createFyHead();

  app.use(fyhead);

  installSchemaOrg(
    { app, router },
    {
      canonicalHost: 'https://fy-vue.com',
    }
  );
  app.use(fyvue, { loadKlb: true });
  app.use(VueCodeHighlight);
  app.component('FyDocPreview', FyDocPreview);
  app.component('FvHL', FvHL);
  return { app, router, head, pinia };
};
