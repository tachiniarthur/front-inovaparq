<template>
  <div>
    <label v-if="size === 'sm'" class="inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer">
      <div
        class="relative w-9 h-5 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-primary-400 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-500">
      </div>
      <span class="ms-3 text-sm font-semibold text-gray-900">{{ label }}</span>
    </label>

    <label v-if="size === 'md'" class="inline-flex items-center mb-5 cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer">
      <div
        class="relative w-11 h-6 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-primary-400 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500">
      </div>
      <span class="ms-3 text-sm font-semibold text-gray-900">{{ label }}</span>
    </label>

    <label v-if="size === 'lg'" class="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" class="sr-only peer">
      <div
        class="relative w-14 h-7 bg-primary-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-primary-400 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-500">
      </div>
      <span class="ms-3 text-sm font-semibold text-gray-900">{{ label }}</span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
  },
  label: {
    type: String,
    required: true,
  },
})
</script>
