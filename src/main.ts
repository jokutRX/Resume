import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // <-- Добавили это

const app = createApp(App)

app.use(router) // <-- Добавили это
app.mount('#app')