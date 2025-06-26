<template>
    <TransitionRoot as="template" :show="open" @close="$emit('close')">
        <Dialog class="relative z-10" @close="$emit('close')">
            <TransitionChild as="div" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 z-50 flex items-center justify-center">
                    <div class="absolute inset-0 backdrop-blur-sm transition-all duration-300"></div>
                    <BaseSpinner color="primary" />
                </div>
            </TransitionChild>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
import BaseSpinner from './BaseSpinner.vue'

defineProps({
    open: {
        type: Boolean,
        default: false
    }
})
</script>
