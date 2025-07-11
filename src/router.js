import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import HomeView from '@/views/HomeView.vue';
import ProfileView from '@/views/Profile/ProfileView.vue';
import ProfileEdit from '@/views/Profile/ProfileEdit.vue';

import InformacoesBasicasView from '@/views/Company/View/InformacoesBasicasView.vue';
import EnderecoView from '@/views/Company/View/EnderecoView.vue';
import RepresentanteLegalView from '@/views/Company/View/RepresentanteLegalView.vue';
import DocumentosView from '@/views/Company/View/DocumentosView.vue';

import CreateCompany from './views/Company/CreateCompany.vue';

import AdminSectionView from '@/views/AdminSection/AdminSectionView.vue';

import UserIndex from '@/views/AdminSection/Users/UserIndex.vue';
import UserEdit from '@/views/AdminSection/Users/UserEdit.vue';
import UserView from '@/views/AdminSection/Users/UserView.vue';
import UserNew from '@/views/AdminSection/Users/UserNew.vue';

import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia';

const routes = [
  {
    path: '/',
    redirect: '/auth',
  },
  {
    path: '/auth',
    component: AuthView,
  },
  {
    path: '/login',
    redirect: '/auth',
  },
  {
    path: '/home',
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile/edit',
    component: ProfileEdit,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-company',
    component: CreateCompany,
    meta: { requiresAuth: true },
  },
  {
    path: '/section-admin',
    component: AdminSectionView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },

  {
    path: '/section-admin/users',
    component: UserIndex,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true,
  },
  {
    path: '/section-admin/users/new',
    component: UserNew,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true,
  },
  {
    path: '/section-admin/users/edit/:id',
    component: UserEdit,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true,
  },
  {
    path: '/section-admin/users/info/:id',
    component: UserView,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true,
  },

  {
    path: '/company-view/informacoes-basicas/:id',
    component: InformacoesBasicasView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/company-view/endereco/:id',
    component: EnderecoView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/company-view/representantes-legais/:id',
    component: RepresentanteLegalView,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/company-view/documentos/:id',
    component: DocumentosView,
    meta: { requiresAuth: true },
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore();
  const { isLoggedIn, user } = storeToRefs(auth);

  // await auth.checkLogin();

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    if (to.path !== '/auth') {
      next('/auth');
    } else {
      next();
    }
  } else if (to.meta.requiresAdmin && !user.value?.admin) {
    next('/home');
  } else if (to.path === '/auth' && isLoggedIn.value) {
    next('/home');
  } else {
    next();
  }
});

export default router;
