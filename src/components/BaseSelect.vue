<template>
  <div class="relative mb-5">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <font-awesome-icon
        v-if="icon"
        :icon="icon"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <select
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        :id="id"
        :name="id"
        :required="required"
        :class="`w-full rounded border-[1.5px] text-black border-stroke py-3 pl-10 pr-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed ${customClasses}`"
        style="appearance: none;"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <!-- Ícone de seta para baixo (opcional) -->
      <svg class="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-500 font-bold">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  id: String,
  modelValue: [String, Number],
  options: { type: Array, required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "Selecione" },
  error: { type: String, default: "" },
  icon: String,
  customClasses: String,
});

defineEmits(["update:modelValue"]);
</script>
