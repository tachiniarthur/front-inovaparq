<template>
  <div class="relative mb-5">
    <label
      class="mb-2.5 block text-white"
      :class="{ 'flex items-center gap-2': type === 'checkbox' }"
    >
      <template v-if="type === 'checkbox'">
        <input
        type="checkbox"
        :checked="modelValue"
        :class="`h-5 w-5 rounded border-[1.5px] border-stroke text-primary focus:ring-primary ${customClasses}`"
        @change="$emit('update:modelValue', $event.target.checked)"
        />
        {{ label }}
        <span v-if="required" class="text-meta-1 text-red-500">*</span>
      </template>
      <template v-else>
        {{ label }}
        <span v-if="required" class="text-meta-1 text-red-500">*</span>
      </template>
    </label>

    <div v-if="type === 'password'" class="relative">
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        :type="showPassword ? 'text' : 'password'"
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

    <div v-else-if="type !== 'checkbox'" class="relative">
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        :type="type"
        :placeholder="placeholder"
        :class="`w-full rounded border-[1.5px] text-black border-stroke py-3 pl-10 pr-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed ${customClasses}`"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500 font-bold">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";

defineProps({
  label: String,
  type: String,
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
    default: "",
  },
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>
