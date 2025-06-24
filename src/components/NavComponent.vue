<template>
  <router-link
    :to="props.route"
    :class="[
      'bg-primary-300 hover:bg-primary-700 transition-all text-white px-4 py-2 rounded-lg cursor-pointer',
      {
        'bg-primary-600': router.currentRoute.value.path.includes(props.route),
      },
    ]"
  >
    {{ props.title }}
  </router-link>
</template>

<script setup>
import router from '@/router';

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
</script>
