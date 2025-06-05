import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import HomeView from './views/HomeView.vue';
import ProfileView from './views/ProfileView.vue';

// Company routes
import CompanyView from '@/views/Company/CompanyView.vue';

import { isLoggedIn, checkLogin } from '@/store/authStore.js';

const routes = [
  { path: '/', redirect: '/auth' },
  { path: '/auth', component: AuthView },
  { path: '/login', redirect: '/auth' },
  { path: '/home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/profile', component: ProfileView, meta: { requiresAuth: true } },

  // company routes
  { path: '/company-view/info/:id', component: CompanyView, meta: { requiresAuth: true }, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  checkLogin();

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next('/auth');
  } else if (to.path === '/auth' && isLoggedIn.value) {
    next('/home');
  } else {
    next();
  }
});

export default router;
