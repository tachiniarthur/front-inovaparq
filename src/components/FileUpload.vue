<template>
  <div>
    <label class="block text-sm font-medium mb-1">{{ label }}</label>
    <div class="flex items-center gap-3">
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        class="hidden"
        @change="onFileChange"
      />
      <button
        type="button"
        class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition"
        @click="triggerFileInput"
      >
        <i :class="icon" class="mr-2"></i>
        {{ fileName || placeholder }}
      </button>
      <span v-if="fileName" class="text-green-600 text-xs flex items-center gap-1">
        <i class="fa fa-check-circle"></i> {{ fileName }}
        <button
          type="button"
          class="ml-2 text-red-500 hover:text-red-700"
          @click="removeFile"
          title="Remover arquivo"
        >
          <i class="fa fa-times-circle"></i>
        </button>
      </span>
    </div>
    <p v-if="error" class="text-xs text-red-600 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  label: String,
  placeholder: String,
  icon: String,
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
</script>

<style scoped>
button[title="Remover arquivo"] {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
</style>
