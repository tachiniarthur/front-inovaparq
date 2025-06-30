<template>
  <div>
    <label v-if="label" class="mb-1 text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="flex flex-col items-start gap-3">
      <input ref="fileInput" type="file" :accept="accept" class="hidden" @change="onFileChange" />
      <button
        type="button"
        class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition cursor-pointer"
        @click="triggerFileInput"
      >
        <font-awesome-icon :icon="icon" class="mr-2" />
        {{ fileName || placeholder }}
      </button>
      <span v-if="fileName" class="text-secondary-600 text-xs flex items-center gap-1">
        <font-awesome-icon :icon="['fas', 'check-circle']" />
        {{ fileName }}
        <button
          type="button"
          class="ml-2 text-red-500 hover:text-red-700 bg-transparent border-none p-0 cursor-pointer"
          style="cursor: pointer;"
          @click="removeFile"
          title="Remover arquivo"
        >
          <font-awesome-icon :icon="['fas', 'times-circle']" />
        </button>
      </span>
    </div>
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineProps({
  label: String,
  placeholder: String,
  icon: [String, Array],
  accept: String,
  required: Boolean,
  modelValue: String,
});

const emit = defineEmits(['update:file']);

const fileInput = ref(null);
const fileName = ref('');
const error = ref('');

function triggerFileInput() {
  fileInput.value.click();
}

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  fileName.value = file.name;
  error.value = '';
  emit('update:file', file);
}

function removeFile() {
  fileInput.value.value = '';
  fileName.value = '';
  emit('update:file', null);
}

// Registra o componente localmente
defineExpose({ FontAwesomeIcon });
</script>
