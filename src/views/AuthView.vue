<template>
  <section
    class="bg-[url('./imagem-inovaparq.png')] bg-cover bg-center h-screen w-full flex items-center justify-center"
  >
    <div class="bg-white relative rounded-2xl overflow-hidden w-auto">
      <div class="flex relative transition-all duration-500 ease-in-out w-[65rem] h-[30rem]">
        <div
          class="w-1/2 bg-white flex flex-col transition-all duration-500 ease-in-out px-10"
          :class="{
            '-translate-x-0 z-10': !isRegisterMode,
            'translate-x-full': isRegisterMode,
          }"
        >
          <form
            v-show="isRegisterMode"
            class="flex flex-col w-full gap-4 p-4 overflow-y-auto custom-scroll"
            @submit.prevent="handleRegister"
          >
            <div class="w-full flex items-center justify-center py-2 rounded-t-lg">
              <img :src="'./logo-inovaparq.png'" alt="Logo Inovaparq" class="h-auto w-30" />
            </div>
            <div class="flex flex-col w-full gap-4 p-4 overflow-y-auto custom-scroll">
              <div class="flex flex-col w-full">
                <BaseInput
                  label="Nome"
                  placeholder="Digite seu nome"
                  icon="user"
                  type="text"
                  name="name"
                  id="name"
                  v-model="registerForm.name"
                />
                <BaseInput
                  label="Usuário"
                  placeholder="Digite seu usuário"
                  icon="id-card"
                  type="text"
                  name="user"
                  id="user"
                  v-model="registerForm.username"
                />
                <BaseInput
                  label="Senha"
                  placeholder="••••••••••"
                  icon="lock"
                  type="password"
                  name="passwordRegister"
                  id="passwordRegister"
                  v-model="registerForm.password"
                />
                <BaseInput
                  label="Confirmar Senha"
                  placeholder="••••••••••"
                  icon="lock"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  v-model="registerForm.confirmPassword"
                />
                <PasswordValidation :password="registerForm.password" :confirmPassword="registerForm.confirmPassword" />
                <BaseButton
                  :buttonText="'Criar'"
                  :size="'lg'"
                  :loading="isLoading"
                  @click="handleRegister"
                  class="self-center"
                />
              </div>
            </div>
          </form>
          <form
            v-show="!isRegisterMode"
            class="flex flex-col w-full gap-4 p-4 items-center justify-center"
            @submit.prevent="handleLogin"
            >
            <div class="w-full flex items-center justify-center py-2 rounded-t-lg">
              <img :src="'./logo-inovaparq.png'" alt="Logo Inovaparq" class="h-auto w-30" />
            </div>
            <div class="flex flex-col w-full gap-4 p-4 items-center justify-center">
              <div class="flex flex-col w-full">
                <BaseInput
                  label="Usuário"
                  placeholder="Digite seu usuário"
                  icon="id-card"
                  type="text"
                  name="username"
                  id="username"
                  v-model="loginForm.username"
                  />
                </div>
              <div class="flex flex-col w-full">
                <BaseInput
                  label="Senha"
                  placeholder="••••••••••"
                  icon="lock"
                  type="password"
                  name="password"
                  id="password"
                  v-model="loginForm.password"
                />
              </div>
              <BaseButton
              :buttonText="'Entrar'"
              :disabled="true"
              icon="arrow-right-to-bracket"
              :size="'lg'"
              :loading="isLoading"
              type="button"
              @click="handleLogin"
              />
            </div>
          </form>
        </div>

        <div
          class="w-1/2 bg-primary-500 flex items-center justify-center transition-all duration-500 ease-in-out"
          :class="{
            '-translate-x-full': isRegisterMode,
            'translate-x-0 z-10': !isRegisterMode,
          }"
        >
          <h1 class="text-2xl text-white text-center">
            {{ isRegisterMode ? 'Já possui uma conta?' : 'Ainda não possui uma conta?' }}
          </h1>
        </div>
      </div>

      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        :class="{ 'z-0': isLoading, 'z-20': !isLoading }"
      >
        <button
          @click="toggleMode"
          class="rounded-full bg-primary-900 text-white text-sm hover:bg-primary-800 transition-all duration-300 cursor-pointer w-16 h-16"
        >
          {{ isRegisterMode ? 'Entrar' : 'Criar' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/authStore.js';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import PasswordValidation from '@/components/PasswordValidation.vue';
import AuthService from '@/services/internal/Auth/AuthService.js';
import { useNotification } from '@/composables/useNotification';

const router = useRouter();
// const auth = new AuthService();
const authStore = useAuthStore();
const isRegisterMode = ref(false);
const notification = useNotification();

const loginForm = ref({
  username: '',
  password: '',
});

const registerForm = ref({
  name: '',
  username: '',
  password: '',
  confirmPassword: '',
});

const isLoading = ref(false);

function handleLogin() {
  isLoading.value = true;

  AuthService.login(loginForm.value)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      authStore.checkLogin();
      router.push({ path: '/home' });
    })
    .catch((error) => {
      console.error('Erro ao fazer login:', error);
      notification.notificationError("Erro ao fazer login", String(error.response.data))
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleRegister() {
  console.log(registerForm.value)
  AuthService.register(registerForm.value)
    .then((response) => {
      console.log('Usuário registrado com sucesso:', response.data);
      authStore.checkLogin();
      router.push({ path: '/home' });
    })
    .catch((error) => {
      console.error('Erro ao registrar usuário:', error);
      notification.notificationError('Erro ao registrar usuário', error.response.data);
    });
}

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value;
}
</script>
