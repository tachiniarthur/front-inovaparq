import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const user = ref(null);

  function checkLogin() {
    const token = localStorage.getItem('token');
    isLoggedIn.value = !!token;

    const storedUser = localStorage.getItem('user');
    user.value = storedUser ? JSON.parse(storedUser) : null;
  }

  return {
    isLoggedIn,
    user,
    checkLogin,
  };
});
