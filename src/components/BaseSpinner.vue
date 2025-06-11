<template>
  <div class="w-full h-full align-center flex justify-center items-center z-10">
    <div class="lds-ellipsis">
      <div :style="{ background: spinnerColor }"></div>
      <div :style="{ background: spinnerColor }"></div>
      <div :style="{ background: spinnerColor }"></div>
      <div :style="{ background: spinnerColor }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: '#ffffff',
  },
})

const colorMap = {
  primary: 'var(--color-primary-500)',
  secondary: 'var(--color-secondary-500)',
  tertiary: 'var(--color-tertiary-500)',
  quaternary: 'var(--color-quaternary-500)',
}

const spinnerColor = computed(() => {
  return colorMap[props.color] || props.color
})
</script>

<style>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}

.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
