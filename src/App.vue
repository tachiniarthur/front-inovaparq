<script setup>
import { onMounted } from 'vue';
import HeaderComponent from '@/assets/components/HeaderComponent.vue';
import { useAuthStore } from '@/store/authStore.js';

const authStore = useAuthStore();

onMounted(() => {
  authStore.checkLogin();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <HeaderComponent v-if="authStore.isLoggedIn" :user="authStore.user" />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>
