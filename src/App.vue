<script setup>
import { onMounted } from 'vue';
import HeaderComponent from '@/assets/components/HeaderComponent.vue';
import { isLoggedIn, checkLogin } from '@/store/authStore.js';

onMounted(() => {
  checkLogin();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <HeaderComponent v-if="isLoggedIn" />
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>
