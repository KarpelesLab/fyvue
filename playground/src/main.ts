import { createSSRApp, createApp as createRegularApp } from 'vue';
import { createFyvue } from '@karpeleslab/fyvue';
import { getPrefix } from '@karpeleslab/klbfw';
import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from 'vue-router';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { routes } from './routes';
import './style.scss';
import App from './Suspender.vue';

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
  app.use(fyvue);
  return { app, router, head, pinia };
};

createApp().then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app');
  });
});
