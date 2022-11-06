import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createFyvue } from "@karpeleslab/fyvue";
import './global.scss';
import App from './Suspender.vue'
import router from './router'

const app = createApp(App)
const fyvue = createFyvue()
app.use(createPinia())
app.use(router)
app.use(fyvue)

app.mount('#app')
