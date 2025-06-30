<template>
  <div>
    <button
      :class="[
        sizeClasses[size],
        color,
        'text-white font-bold rounded transition-transform active:scale-95 flex items-center justify-center',
        (loading || disabled)
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:opacity-90',
        'min-w-[150px] h-[48px]',
      ]"
      :disabled="loading || disabled"
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
    <div v-if="error" class="text-red-500 text-sm mt-2">
      {{ error }}
    </div>
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
  disabled: {
    type: Boolean,
    default: false,
  },
  inputValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
  icon: {
    type: [String, Array],
    default: null,
  },
  error: {
    type: String,
    default: '',
  }
});

const sizeClasses = {
  sm: 'text-sm py-2 px-4',
  md: 'text-md py-3 px-6',
  lg: 'text-lg py-4 px-8',
};
</script>
