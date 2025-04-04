import { createRouter, createWebHistory } from 'vue-router'
import App from '@/views/HomeView.vue'

const routes = [{ path: '/', component: App }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
