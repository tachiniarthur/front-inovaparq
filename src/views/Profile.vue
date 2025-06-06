<template>
  <div class="h-full bg-gray-100 flex flex-col items-center p-6">
    <div class="bg-white shadow-md rounded-lg w-full p-6">
      <div class="flex items-center space-x-4 mb-6">
        <div class="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'user']" class="text-4xl text-gray-500" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">{{ user.name }}</h1>
          <p class="text-gray-600">{{ user.email }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Informações Básicas</h2>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Nome:</span>
            <span class="text-gray-800">{{ user.name }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">E-mail:</span>
            <span class="text-gray-800">{{ user.email }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Telefone:</span>
            <span class="text-gray-800">{{ user.phone }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Endereço:</span>
            <span class="text-gray-800">{{ user.address }}</span>
          </div>
        </div>
        <h2 class="text-xl font-bold">Configurações do Sistema</h2>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Idioma:</span>
            <span class="text-gray-800">Português (Brasil)</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Notificações:</span>
            <span class="text-gray-800">Ativadas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({
  name: 'Arthur Silva',
  email: 'arthur.silva@example.com',
  phone: '(11) 98765-4321',
  address: 'Rua das Flores, 123, São Paulo, SP',
});
</script>
