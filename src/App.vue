<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '@/assets/components/HeaderComponent.vue';

const isLoggedIn = ref(false);

// onMounted(() => {
//   const token = localStorage.getItem('token');
//   isLoggedIn.value = !!token;
// });
</script>

<template>
  <div>
    <HeaderComponent v-if="isLoggedIn" />
    <router-view />
  </div>
</template>
