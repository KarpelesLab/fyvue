import { createApp } from 'vue';
import { createFyvue } from '@karpeleslab/fyvue';
import { getPrefix } from '@karpeleslab/klbfw';
import { createRouter, createWebHistory } from 'vue-router';
import { createHead } from "@vueuse/head"
import { createPinia } from 'pinia'
import { routes } from './routes';
import './style.scss';
import App from './Suspender.vue';

const app = createApp(App);
const pinia = createPinia()
const head = createHead()
const fyvue = createFyvue();

const router = createRouter({
  history: createWebHistory(getPrefix()),
  routes,
});
app.use(router);
app.use(pinia);
app.use(head)
app.use(fyvue);
app.mount('#app');
