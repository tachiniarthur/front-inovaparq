<template>
  <div class="h-full bg-gray-100 flex flex-col items-center p-6 space-y-6">
    <div class="bg-white shadow-md rounded-lg w-full p-6">
      <div class="flex items-center space-x-4 mb-6">
        <div class="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
          <template v-if="userParsed.foto && userParsed.foto !== ''">
            <img
              :src="userParsed.foto"
              alt="Foto do usuário"
              class="h-24 w-24 object-cover rounded-full"
            />
          </template>
          <template v-else>
            <font-awesome-icon :icon="['fas', 'user']" class="text-4xl text-gray-500" />
          </template>
        </div>
        <div>
          <h1 class="text-2xl font-bold">{{ userParsed.nome }}</h1>
          <p class="text-gray-600">{{ userParsed.email }}</p>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Informações Básicas</h2>
        <div class="space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Nome:</span>
            <span class="text-gray-800">{{ userParsed.nome }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Nome de usuário:</span>
            <span class="text-gray-800">{{ userParsed.username }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">E-mail:</span>
            <span class="text-gray-800">{{ userParsed.email }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Telefone:</span>
            <template v-if="userParsed.telefone && userParsed.telefone !== 'Não cadastrado'">
              <input
                class="text-gray-800 bg-transparent border-none outline-none p-0 m-0 text-right w-auto"
                readonly
                v-mask="'(##) #####-####'"
                :value="userParsed.telefone"
              />
            </template>
            <span v-else class="text-gray-800">Não cadastrado</span>
          </div>
           <div class="flex justify-between items-center">
            <span class="font-medium text-gray-600">Data de nascimento:</span>
            <span class="text-gray-800">{{ moment(userParsed.birthdate).format('DD/MM/YYYY') }}</span>
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
    <div class="flex space-x-4 justify-end w-full">
      <router-link
        to="/profile/edit"
        class="text-md py-3 px-6 bg-primary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
      >
        Editar Perfil
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import moment from 'moment';

const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);
</script>
