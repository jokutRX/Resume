import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProjectDetailView from '@/views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/projects/:id',
      name: 'project-detail',
      component: ProjectDetailView
    }
  ],
  // ДОБАВЛЯЕМ ЭТО НАСТРОЙКУ
  scrollBehavior(to, from, savedPosition) {
    // Всегда скроллим наверх при смене страницы
    return { top: 0 }
  }
})

export default router