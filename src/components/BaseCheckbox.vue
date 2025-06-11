<template>
  <div>
    <label
    class="mb-2.5 block text-black"
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
  </div>
</template>

<script setup>
defineProps({
  required: {
    type: Boolean,
    default: false,
  },
  label: String,
  type: {
    type: String,
    required: true
  },
})

</script>
