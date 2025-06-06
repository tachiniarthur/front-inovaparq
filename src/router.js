import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/auth'
  },
  {
    path: '/auth',
    component: () => import('./views/Auth.vue'),
  },
  {
    path: '/login',
    redirect: '/auth'
  },
  {
    path: '/home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/create-company',
    component: () => import('./views/Company/CreateCompany.vue'),
  },
  {
    path: '/profile',
    component: () => import('./views/Profile.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
