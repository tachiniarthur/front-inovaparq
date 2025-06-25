<template>
  <div class="h-full bg-gray-100 flex flex-col items-center p-6 space-y-6">
    <div class="bg-white shadow-md rounded-lg w-full p-6">
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Informações Básicas</h2>
        <form class="space-y-2">
          <BaseInput
            label="Nome"
            icon="user"
            type="text"
            name="nome"
            id="nome"
            placeholder="Digite seu nome"
            v-model="loginForm.nome" />
          <BaseInput
            label="Usuário"
            icon="id-card"
            type="text"
            name="username"
            id="username"
            placeholder="Digite seu usuário"
            v-model="loginForm.username"
          />
          <BaseInput
            label="CPF"
            icon="fa-id-card"
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Digite seu CPF"
            v-mask="'###.###.###-##'"
            v-model="loginForm.cpf"
            />
          <BaseInput
            label="E-mail"
            icon="fa-envelope"
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
            v-model="loginForm.email"
            />
          <BaseInput
            label="Telefone"
            icon="fa-phone"
            type="text"
            name="telefone"
            id="telefone"
            placeholder="Digite seu telefone"
            v-mask="['(##) #####-####', '(##) ####-####']"
            v-model="loginForm.telefone"
          />
        </form>
      </div>
    </div>
    <div class="flex justify-between w-full">
      <router-link
        to="/profile"
        class="text-md py-3 px-6 bg-secondary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
      >
        Cancelar
      </router-link>
      <div class="flex space-x-4">
        <BaseButton :buttonText="'Excluir Conta'" :loading="isLoading" @click="handleAccount(1)" />
        <BaseButton :buttonText="'Salvar'" :color="'bg-tertiary-500'" :loading="isLoading" @click="handleAccount(2)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import ProfileService from '@/services/internal/Profile/ProfileService.js';
import router from '@/router';
import { useNotification } from '@/composables/useNotification';

const notification = useNotification();

const isLoading = ref(false);
const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);

const loginForm = ref({
  nome: userParsed.nome || '',
  username: userParsed.username || '',
  cpf: userParsed.cpf || '',
  email: userParsed.email || '',
  telefone: userParsed.telefone || '',
});


function handleAccount(action) {
  if (action === 1) {
    ProfileService
      .delete(userParsed.id, loginForm.value)
      .then((response) => {
        localStorage.removeItem('token', response.data.token);
        localStorage.removeItem('user', JSON.stringify(loginForm.value));
        alert('Conta removida com sucesso!');
        router.push({ path: '/auth' });
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else if (action === 2) {
    ProfileService
      .update(userParsed.id, loginForm.value)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('Perfil atualizado com sucesso!');
        router.push({ path: '/profile' });
      })
      .catch((error) => {
        notification.notificationError('Erro', error.data.message);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
}
</script>
