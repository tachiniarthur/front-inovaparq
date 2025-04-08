<template>
  <section
    class="bg-[url('./imagem-inovaparq.png')] bg-cover bg-center h-screen w-full flex items-center justify-center"
  >
    <div class="bg-primary-200 relative rounded-2xl overflow-hidden w-auto">
      <div class="flex relative transition-all duration-500 ease-in-out w-[60rem] h-[26rem]">
        <form
          class="w-1/2 bg-primary-200 flex flex-col transition-all duration-500 ease-in-out px-10"
          :class="{
            '-translate-x-0 z-10': !isRegisterMode,
            'translate-x-full': isRegisterMode,
          }"
        >
          <div class="w-full flex items-center justify-center py-2 rounded-t-lg">
            <img :src="'./logo-inovaparq.png'" alt="Logo Inovaparq" class="h-auto w-30" />
          </div>
          <div
            v-show="isRegisterMode"
            class="flex flex-col w-full gap-4 p-4 overflow-y-auto custom-scroll"
          >
            <div class="flex flex-col w-full">
              <label for="name">Nome</label>
              <input type="text" id="name" class="border-2 rounded-lg" />
            </div>
            <div class="flex flex-col w-full">
              <label for="name">Nome</label>
              <input type="text" id="name" class="border-2 rounded-lg" />
            </div>
            <div class="flex flex-col w-full">
              <label for="name">Nome</label>
              <input type="text" id="name" class="border-2 rounded-lg" />
            </div>
            <div class="flex flex-col w-full">
              <label for="name">Nome</label>
              <input type="text" id="name" class="border-2 rounded-lg" />
            </div>
            <div class="flex flex-col w-full">
              <label for="email">E-mail</label>
              <input type="email" id="email" class="border-2 rounded-lg" />
            </div>
            <button type="submit" class="border bg-secondary-500 text-lg rounded-md px-12">
              Criar
            </button>
          </div>
          <div
            v-show="!isRegisterMode"
            class="flex flex-col w-full gap-4 p-4 items-center justify-center"
          >
            <div class="flex flex-col w-full">
              <label for="user">Usuário</label>
              <input type="text" name="user" id="user" class="border-2 rounded-lg" />
            </div>
            <div class="flex flex-col w-full">
              <label for="password">Senha</label>
              <input type="password" name="password" id="password" class="border-2 rounded-lg" />
              <span class="text-md flex justify-start items-start text-blue-600"
                >Esqueceu sua senha?</span
              >
            </div>
            <button type="submit" class="border bg-secondary-500 text-lg rounded-md px-12">
              Entrar
            </button>
          </div>
        </form>

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
          class="rounded-full bg-tertiary-500 text-sm hover:bg-tertiary-300 transition-all duration-300 cursor-pointer w-16 h-16"
        >
          {{ isRegisterMode ? 'Entrar' : 'Criar' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const isRegisterMode = ref(false)

function toggleMode() {
  isRegisterMode.value = !isRegisterMode.value
}
</script>

<style scoped>
.custom-scroll::-webkit-scrollbar {
  width: 4px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: #5f5f5f;
  border-radius: 9999px;
}
</style>
