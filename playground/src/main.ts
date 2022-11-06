import { createApp } from 'vue'
import { createFyvue } from "@karpeleslab/fyvue"

import './style.scss'
import App from './App.vue'

const app = createApp(App)
const fyvue = createFyvue()
app.use(fyvue)
app.mount('#app')
