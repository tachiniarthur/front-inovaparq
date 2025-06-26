<template>
  <div class="h-full bg-gray-100 flex flex-col items-center p-6 space-y-6">
    <div class="bg-white shadow-md rounded-lg w-full p-6">
      <!-- Avatar Upload -->
      <div class="flex flex-col items-center mb-6">
        <label class="relative cursor-pointer group" for="avatar-upload">
          <div class="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border-2 border-gray-200 group-hover:border-primary-500 transition">
            <template v-if="avatarPreview">
              <img :src="avatarPreview" alt="Avatar Preview" class="object-cover h-full w-full" />
            </template>
            <template v-else>
              <font-awesome-icon :icon="['fas', 'user']" class="text-4xl text-gray-500" />
            </template>
            <div class="absolute inset-0 rounded-full bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <font-awesome-icon :icon="['fas', 'camera']" class="text-xl text-white" />
            </div>
          </div>
          <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          class="hidden"
          @change="onAvatarChange"
          />
        </label>
        <span class="text-sm text-gray-500 mt-2">Clique para alterar foto</span>
        <span class="text-xs mt-1 font-semibold bg-primary-100 px-2 py-1 rounded">
          Tamanho máximo de imagem: 5MB
        </span>
      </div>
      <!-- ...restante do formulário... -->
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
            v-model="loginForm.phone"
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
        <BaseButton :buttonText="'Excluir Conta'" :loading="isLoading.edit" @click="handleAccount(1)" />
        <BaseButton :buttonText="'Salvar'" :color="'bg-tertiary-500'" :loading="isLoading.delete" @click="handleAccount(2)" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const notification = useNotification();

const isLoading = ref({
  edit: false,
  delete: false,
});
const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);

const loginForm = ref({
  nome: userParsed.nome || '',
  username: userParsed.username || '',
  cpf: userParsed.cpf || '',
  email: userParsed.email || '',
  phone: userParsed.telefone || '',
  foto: userParsed.foto || '',
});

const avatarPreview = ref(userParsed.foto || null);

function onAvatarChange(e) {
  const file = e.target.files[0];
  if (file) {
    // Limite de 5 MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      notification.notificationError('Erro', 'A imagem deve ter no máximo 5 MB.');
      avatarPreview.value = null;
      return;
    }
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        avatarPreview.value = ev.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      avatarPreview.value = null;
      notification.notificationError('Erro', 'O arquivo selecionado não é uma imagem válida.');
    }
  } else {
    avatarPreview.value = null;
  }
}

function handleAccount(action) {
  if(action === 1) {
    isLoading.value.edit = true;
  } else {
    isLoading.value.delete = true;
  }
  const payload = { ...loginForm.value };
  payload.name = payload.nome;
  delete payload.nome;
  payload.cpf = payload.cpf.replace(/\D/g, '');
  payload.phone = payload.phone.replace(/\D/g, '');
  payload.photo = avatarPreview.value || userParsed.foto || '';
  delete payload.foto;

  if (action === 1) {
    ProfileService
      .delete(userParsed.id, payload)
      .then((response) => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        notification.notificationSuccess('Sucesso', response.data.message);
        router.push({ path: '/auth' });
      })
      .finally(() => {
        isLoading.value = false;
      });
  } else if (action === 2) {
    ProfileService
      .update(userParsed.id, payload)
      .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data));
        notification.notificationSuccess('Sucesso', response.data.message);
        router.push({ path: '/profile' });
      })
      .catch((error) => {
        console.log(error)
        notification.notificationError('Erro', error.data.message);
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
}
</script>
