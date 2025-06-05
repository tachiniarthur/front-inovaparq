import { ref } from 'vue';

export const isLoggedIn = ref(false);

export function checkLogin() {
  const token = localStorage.getItem('token');
  isLoggedIn.value = !!token;
}
