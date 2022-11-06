import { createApp } from 'vue'
import { createFyvue } from "@karpeleslab/fyvue"
import { getPrefix } from "@karpeleslab/klbfw";
import {
  createRouter,
  createWebHistory,
} from "vue-router";
import './style.scss'
import App from './App.vue'

const app = createApp(App)
const fyvue = createFyvue()
const routes = [
  {
    path: '/',
    component: () => import('./components/HelloWorld.vue')
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
  }
]
const router = createRouter({
  history: createWebHistory(getPrefix()),
  routes,
});
app.use(router)
app.use(fyvue)
app.mount('#app')
