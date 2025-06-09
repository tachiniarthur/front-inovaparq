<template>
  <div class="relative mb-5">
    <label v-if="label" class="mb-1 text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
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
        :disabled="disabled"
      />
      <button
        type="button"
        @click="togglePasswordVisibility"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        :disabled="disabled"
        tabindex="-1"
      >
        <font-awesome-icon :icon="['fas', showPassword ? 'eye-slash' : 'eye']" />
      </button>
    </div>
    <div v-else-if="type === 'file'" class="relative flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <label
          class="cursor-pointer bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition flex items-center gap-2"
          tabindex="0"
          :class="{ 'opacity-50 pointer-events-none': disabled }"
        >
          <font-awesome-icon v-if="icon" :icon="icon" class="text-white" />
          <span>Escolher arquivo</span>
          <input type="file" class="hidden" @change="onFileChange" :disabled="disabled" />
        </label>
      </div>
      <span class="text-sm text-gray-600 truncate" v-if="fileName">{{ fileName }}</span>
    </div>
    <div v-else class="relative">
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
        :disabled="disabled"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500 font-bold">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  customClasses: String,
  required: {
    type: Boolean,
    default: false,
  },
  icon: String,
  modelValue: [String, Boolean, File],
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  if (!props.disabled) {
    showPassword.value = !showPassword.value;
  }
};

const fileName = ref('');
const onFileChange = (e) => {
  if (props.disabled) return;
  const file = e.target.files[0];
  if (file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'jpg', 'jpeg', 'png'].includes(ext)) {
      emit('update:modelValue', null);
      fileName.value = '';
      e.target.value = '';
      return;
    } else {
      fileName.value = file.name;
      emit('update:modelValue', file);
    }
  }
};

watch(
  () => props.modelValue,
  (val) => {
    if (val && val.name) fileName.value = val.name;
    else fileName.value = '';
  }
);
</script>
