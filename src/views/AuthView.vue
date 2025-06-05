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
                <PasswordValidation
                  :password="registerForm.password"
                  :confirmPassword="registerForm.confirmPassword"
                />
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
                  name="user"
                  id="user"
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
              :size="'lg'"
              :loading="isLoading"
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

      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
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
import AuthService from '@/services/Auth/AuthService.js';
import BaseButton from '@/assets/components/BaseButton.vue';
import BaseInput from '@/assets/components/BaseInput.vue';
import PasswordValidation from '@/assets/components/PasswordValidation.vue';
import { isLoggedIn } from '@/store/authStore.js';
import router from '@/router';

const auth = new AuthService();

const isRegisterMode = ref(false);

const loginForm = ref({
  username: '',
  password: '',
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const isLoading = ref(false);


function handleLogin() {
  isLoading.value = true;

  auth.login(loginForm.value)
    .then(response => {
      localStorage.setItem('token', response.data);
      isLoggedIn.value = true;
      router.push({ path: '/home' });
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleRegister() {
  if (registerForm.value.password !== registerForm.value.passwordConfirm) {
      alert('As senhas não coincidem!');
      return;
    }
}

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value;
}
</script>
