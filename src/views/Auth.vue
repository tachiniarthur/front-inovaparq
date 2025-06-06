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
                <!-- <label for="name">Nome</label>
                <input type="text" id="name" class="border-2 rounded-lg" v-model="registerForm.name" /> -->
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
                <!-- <label for="email">E-mail</label>
                <input type="email" id="email" class="border-2 rounded-lg" v-model="registerForm.email" /> -->
                <!-- <label for="password">Senha</label>
                <input type="password" id="passwordRegister" class="border-2 rounded-lg" v-model="registerForm.password" /> -->
                <BaseInput
                  label="Senha"
                  placeholder="••••••••••"
                  icon="lock"
                  type="password"
                  name="passwordRegister"
                  id="passwordRegister"
                  v-model="registerForm.password"
                />
                <!-- <label for="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  class="border-2 rounded-lg"
                  v-model="registerForm.confirmPassword"
                /> -->
                <BaseInput
                  label="Confirmar Senha"
                  placeholder="••••••••••"
                  icon="lock"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  v-model="registerForm.confirmPassword"
                />
                <!-- <button type="submit" class="w-full border bg-primary-500 text-lg text-white rounded-md px-12">
                  Criar
                </button> -->
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
                <!-- <label for="user">Usuário</label> -->
                <!-- <input type="text" name="user" id="user" class="border-2 rounded-lg" v-model="loginForm.username" /> -->
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
                <!-- <label for="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="border-2 rounded-lg"
                  v-model="loginForm.password"
                />
                <span class="text-md flex justify-start items-start text-blue-600">Esqueceu sua senha?</span> -->
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
// import AuthService from '@/services/Auth/AuthService.js';
import BaseButton from '@/assets/components/BaseButton.vue';
import BaseInput from '@/assets/components/BaseInput.vue';
import PasswordValidation from '@/assets/components/PasswordValidation.vue';

// const auth = new AuthService();

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
  console.log('Login:', loginForm.value);

  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
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
