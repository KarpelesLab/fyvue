import { createApp } from 'vue'
import { createFyvue } from "@karpeleslab/fyvue"
import { getPrefix } from "@karpeleslab/klbfw";
import {
  createRouter,
  createWebHistory,
} from "vue-router";
import { routes } from './routes'
import './style.scss'
import App from './Suspender.vue'

const app = createApp(App)
const fyvue = createFyvue()

const router = createRouter({
  history: createWebHistory(getPrefix()),
  routes,
});
app.use(router)
app.use(fyvue)
app.mount('#app')
