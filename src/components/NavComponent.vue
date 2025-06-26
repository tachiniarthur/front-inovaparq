<template>
  <router-link
    :to="props.route"
    :class="[
      'text-md py-3 px-6 text-white font-bold rounded transition-transform active:scale-95 flex items-center justify-center min-w-[150px] h-[48px]',
      isActive
        ? 'bg-primary-800 pointer-events-none opacity-100'
        : 'bg-primary-500 hover:opacity-90 hover:bg-primary-600 cursor-pointer',
    ]"
  >
    {{ props.title }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const props = defineProps({
  route: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const isActive = computed(() => route.path === props.route);
</script>
