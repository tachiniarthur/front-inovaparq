import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: AuthView },
  { path: '/login', redirect: '/auth' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
