<template>
  <div>
    <button
      :class="[
        sizeClasses[size],
        color,
        'text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center',
        loading ? 'cursor-not-allowed pointer-events-none' : '',
        'min-w-[150px] h-[48px]',
      ]"
      :disabled="loading"
      :type="type"
    >
      <div class="flex items-center justify-center gap-2">
        <template v-if="loading">
          <Spinner />
        </template>
        <template v-else>
          <span>{{ buttonText }}</span>
          <font-awesome-icon
            v-if="icon"
            :icon="icon"
            class="text-white"
          />
        </template>
      </div>
    </button>
  </div>
</template>

<script setup>
import Spinner from './BaseSpinner.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
    default: 'bg-primary-500',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
  icon: {
    type: [String, Array],
    default: null,
  },
});

const sizeClasses = {
  sm: 'text-sm py-2 px-4',
  md: 'text-md py-3 px-6',
  lg: 'text-lg py-4 px-8',
};
</script>
