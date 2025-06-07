<template>
  <div class="h-full bg-gray-100 flex flex-col items-center p-6 space-y-6">
    <div class="bg-white shadow-md rounded-lg w-full p-6">
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">Informações Básicas</h2>
        <form class="space-y-2">
          <BaseInput label="Nome" icon="lock" type="text" name="nome" id="nome" v-model="loginForm.nome" />
          <BaseInput
            label="Username"
            icon="id-card"
            type="text"
            name="username"
            id="username"
            v-model="loginForm.username"
          />
          <BaseInput label="CPF" icon="lock" type="text" name="cpf" id="cpf" v-model="loginForm.cpf" />
          <BaseInput label="E-mail" icon="lock" type="text" name="email" id="email" v-model="loginForm.email" />
          <BaseInput
            label="Telefone"
            icon="lock"
            type="text"
            name="telefone"
            id="telefone"
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
import { ref, watch } from 'vue';
import BaseInput from '@/assets/components/BaseInput.vue';
import BaseButton from '@/assets/components/BaseButton.vue';
import ProfileService from '@/services/Profile/ProfileService.js';
import router from '@/router';

const profileService = new ProfileService();

const isLoading = ref(false);
const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);

function formatCPF(value) {
  let cpf = value.replace(/\D/g, '');
  if (cpf.length <= 11) {
    cpf = cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  return cpf;
}

function formatTelefone(value) {
  let telefone = value.replace(/\D/g, '');
  if (telefone.length <= 11) {
    telefone = telefone.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d{4,5})(\d{4})$/, '$1-$2');
  }
  return telefone;
}

const loginForm = ref({
  nome: userParsed.nome || '',
  username: userParsed.username || '',
  cpf: formatCPF(userParsed.cpf || ''),
  email: userParsed.email || '',
  telefone: formatTelefone(userParsed.telefone || ''),
});

watch(
  () => loginForm.value.cpf,
  (newValue) => {
    loginForm.value.cpf = formatCPF(newValue);
  }
);

watch(
  () => loginForm.value.telefone,
  (newValue) => {
    loginForm.value.telefone = formatTelefone(newValue);
  }
);

function handleAccount(action) {
  if (action === 1) {
    profileService
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
    profileService
      .update(userParsed.id, loginForm.value)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        alert('Perfil atualizado com sucesso!');
        router.push({ path: '/profile' });
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
}
</script>
