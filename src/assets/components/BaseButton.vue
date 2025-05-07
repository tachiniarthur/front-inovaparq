<template>
  <div>
    <button
      :class="[
        sizeClasses[size],
        `bg-${color}`,
        'cursor-pointer text-white font-bold py-2 px-4 rounded transition-all active:scale-90 hover:opacity-90',
        { 'opacity-50 cursor-not-allowed pointer-events-none': loading },
      ]"
      :disabled="loading"
    >
      <div class="flex justify-center items-center">
        <template v-if="loading">
          <Spinner :color="'primary'" />
        </template>
        <template v-else>
          {{ buttonText }}
        </template>
      </div>
    </button>
  </div>
</template>

<script setup>
import Spinner from './Spinner.vue';

defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
  },
  color: {
    type: String,
    default: 'primary',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const sizeClasses = {
  sm: 'text-sm py-1 px-2',
  md: 'text-md py-2 px-4',
  lg: 'text-lg py-3 px-6',
};
</script>
