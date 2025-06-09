<script setup>
import { ref, onMounted } from 'vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

const isLoggedIn = ref(true);

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
