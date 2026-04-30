import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


// 1. Подключаем шрифт
import './assets/fonts.css'

// 2. ВАЖНО: Подключаем основные стили (Tailwind / Globals)
// Проверьте, что эта строка есть, иначе пропадут все стили!
import './assets/main.css' 

const app = createApp(App)


app.use(router)

app.mount('#app')