<template>
  <section
    class="bg-[url('./imagem-inovaparq.png')] bg-cover bg-center h-screen w-full flex items-center justify-center"
  >
    <div class="bg-white relative rounded-2xl overflow-hidden w-auto">
      <div class="flex relative transition-all duration-500 ease-in-out w-[60rem] h-[26rem]">
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
                <label for="name">Nome</label>
                <input type="text" id="name" class="border-2 rounded-lg" v-model="registerForm.name" />
              </div>
              <div class="flex flex-col w-full">
                <label for="email">E-mail</label>
                <input type="email" id="email" class="border-2 rounded-lg" v-model="registerForm.email" />
              </div>
              <div class="flex flex-col w-full">
                <label for="password">Senha</label>
                <input type="password" id="passwordRegister" class="border-2 rounded-lg" v-model="registerForm.password" />
              </div>
              <div class="flex flex-col w-full">
                <label for="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  class="border-2 rounded-lg"
                  v-model="registerForm.confirmPassword"
                />
              </div>
              <button type="submit" class="w-full border bg-primary-500 text-lg text-white rounded-md px-12">
                Criar
              </button>
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
                <label for="user">Usuário</label>
                <input type="text" name="user" id="user" class="border-2 rounded-lg" v-model="loginForm.username" />
              </div>
              <div class="flex flex-col w-full">
                <label for="password">Senha</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="border-2 rounded-lg"
                  v-model="loginForm.password"
                />
                <span class="text-md flex justify-start items-start text-blue-600">Esqueceu sua senha?</span>
              </div>
              <!-- <button type="submit" class="w-full border bg-primary-500 text-lg text-white rounded-md px-12">
                Entrar
              </button> -->
              <BaseButton
              :buttonText="'Entrar'"
              :size="'lg'"
              :color="'bg-primary-500'"
              :loading="true"
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

function handleLogin(){
  console.log('Login:', loginForm.value);
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
