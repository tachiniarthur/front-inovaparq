import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import HomeView from './views/HomeView.vue';
import ProfileView from './views/ProfileView.vue';

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: AuthView },
  { path: '/login', redirect: '/auth' },
  { path: '/home', component: HomeView },
  { path: '/profile', component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
