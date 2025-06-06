<template>
  <div class="relative mb-5">
    <template v-if="type === 'password'">
      <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="relative">
        <font-awesome-icon
          v-if="icon"
          :icon="icon"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          :type="showPassword ? 'text' : 'password'"
          :id="id"
          :name="name"
          :placeholder="placeholder"
          :class="`w-full rounded border-[1.5px] text-black border-stroke py-3 pl-10 pr-12 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed ${customClasses}`"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <button
          type="button"
          @click="togglePasswordVisibility"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
        </button>
      </div>
    </template>

    <template v-else>
      <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">
        {{ label }} <span v-if="required" class="text-red-500">*</span>
      </label>
      <div class="relative">
        <font-awesome-icon
          v-if="icon"
          :icon="icon"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          :type="type"
          :placeholder="placeholder"
          :id="id"
          :name="name"
          :class="`w-full rounded border-[1.5px] text-black border-stroke py-3 pl-10 pr-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed ${customClasses}`"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
      </div>
      <p v-if="error" class="mt-1 text-sm text-red-500 font-bold">
        {{ error }}
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

defineProps({
  label: String,
  type: String,
  name: String,
  id: String,
  placeholder: String,
  customClasses: String,
  required: {
    type: Boolean,
    default: false,
  },
  icon: String,
  modelValue: [String, Boolean],
  error: {
    type: String,
    default: '',
  },
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
