<template>
    <!-- Global notification live region, render this permanently at the end of the document -->
    <div aria-live="assertive" class="fixed bottom-0 right-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
        <transition enter-active-class="transform ease-out duration-300 transition"
            enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
            leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <div v-if="show" :class="[style.bg50, style.border400]" class=" rounded-md p-4 border-l-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <CheckCircleIcon v-if="type === 'success'" :class="style.text400" class="h-5 w-5"
                            aria-hidden="true" />
                        <ExclamationTriangleIcon v-if="type === 'warning'" :class="style.text400" class="h-5 w-5"
                            aria-hidden="true" />
                        <InformationCircleIcon v-if="type === 'info'" :class="style.text400" class="h-5 w-5"
                            aria-hidden="true" />
                        <XCircleIcon v-if="type === 'error'" :class="style.text400" class="h-5 w-5"
                            aria-hidden="true" />
                    </div>
                    <div class="ml-3">
                        <h3 :class="style.text800" class="text-sm font-medium">{{ message }}</h3>
                        <div :class="style.text700" class="mt-2 text-sm">
                            <p>{{ description }}</p>
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <button type="button" @click="show = false" :class="[style.bg50, style.ring500]"
                            class="ml-6 inline-flex rounded-md cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
                            <span class="sr-only">Fechar</span>
                            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ExclamationTriangleIcon, XMarkIcon, InformationCircleIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/vue/20/solid'

const { notificationType: type, notificationShow: show, notificationMessage: message, notificationDescription: description, notificationColor: color } = useNotification()

const style = computed(() => {
    let bg50 = {
        success: 'bg-green-50',
        error: 'bg-red-50',
        warning: 'bg-yellow-50',
        info: 'bg-blue-50'
    }
    let border400 = {
        success: 'border-green-400',
        error: 'border-red-400',
        warning: 'border-yellow-400',
        info: 'border-blue-400'
    }
    let text400 = {
        success: 'text-green-400',
        error: 'text-red-400',
        warning: 'text-yellow-400',
        info: 'text-blue-400'
    }
    let text700 = {
        success: 'text-green-700',
        error: 'text-red-700',
        warning: 'text-yellow-700',
        info: 'text-blue-700'
    }
    let text800 = {
        success: 'text-green-800',
        error: 'text-red-800',
        warning: 'text-yellow-800',
        info: 'text-blue-800'
    }
    let ring500 = {
        success: 'ring-green-500',
        error: 'ring-red-500',
        warning: 'ring-yellow-500',
        info: 'ring-blue-500'
    }
    return {
        bg50: bg50[type.value],
        border400: border400[type.value],
        text400: text400[type.value],
        text700: text700[type.value],
        text800: text800[type.value],
        ring500: ring500[type.value]
    }
})
</script>