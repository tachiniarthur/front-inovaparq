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
      @click="triggerError"
      :type="type"
    >
      <div class="flex items-center justify-center">
        <template v-if="loading">
          <Spinner />
        </template>
        <template v-else>
          {{ buttonText }}
        </template>
      </div>
    </button>
    <div v-if="error" class="text-red-500 text-sm mt-2">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Spinner from './BaseSpinner.vue';

const error = ref('');

const props = defineProps({
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
  inputValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'button',
  },
});

const sizeClasses = {
  sm: 'text-sm py-2 px-4',
  md: 'text-md py-3 px-6',
  lg: 'text-lg py-4 px-8',
};

const triggerError = () => {
  if (!props.inputValue || props.inputValue.length === 0) {
    error.value = 'Preencha o campo corretamente';
  } else {
    error.value = '';
  }
};
</script>
