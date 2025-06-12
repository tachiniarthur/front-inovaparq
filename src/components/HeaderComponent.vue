<template>
  <nav class="h-auto bg-gray-300 flex items-center justify-between py-4 px-12 relative">
    <router-link :to="'/home'">
      <img :src="'/logo-inovaparq.png'" alt="Logo Inovaparq" class="h-20 w-auto" />
    </router-link>
    <div class="flex space-x-2">
      <button @click="toggleNotifications" class="cursor-pointer hover:bg-primary-200 px-3 rounded-lg duration-300">
        <font-awesome-icon :icon="['fas', 'bell']" class="text-2xl text-primary-700" />
      </button>
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="cursor-pointer flex space-x-2 items-center justify-center hover:bg-primary-200 py-2 px-4 rounded-lg duration-300"
        >
          <div class="h-10 w-10 flex items-center justify-center bg-primary-600 rounded-full">
            <font-awesome-icon :icon="['fas', 'user']" class="text-2xl" />
          </div>
          <span class="text-lg font-medium">{{ props.user.nome }}</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </button>
        <ul v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg">
          <router-link :to="'/profile'">
            <li class="px-4 py-2 hover:bg-primary-200 cursor-pointer rounded-t-lg" @click="handleOption('Perfil')">
              Meu perfil
            </li>
          </router-link>
          <router-link :to="'/section-admin'" v-if="props.user.admin">
            <li class="px-4 py-2 hover:bg-primary-200 cursor-pointer" @click="handleOption('Editar Perfil')">
              Sessão Admin
            </li>
          </router-link>
          <li class="px-4 py-2 hover:bg-primary-200 cursor-pointer rounded-b-lg" @click="handleOption('Sair')">Sair</li>
        </ul>
      </div>
    </div>

    <div
      class="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transition-transform duration-300"
      :class="isNotificationsOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex items-center justify-between p-4 border-b border-gray-400">
        <h2 class="text-2xl font-bold">Notificações</h2>
        <button @click="toggleNotifications" class="cursor-pointer hover:text-gray-700">
          <font-awesome-icon :icon="['fas', 'times']" class="text-xl" />
        </button>
      </div>
      <div class="p-4 space-y-4 overflow-y-auto hide-scrollbar h-full">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="bg-primary-400 p-4 rounded shadow hover:scale-105 hover:bg-primary-200 duration-300 cursor-pointer"
        >
          <p class="text-sm">{{ notification.message }}</p>
          <span class="text-xs">{{ notification.time }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  user: Object,
});

const isDropdownOpen = ref(false);
const isNotificationsOpen = ref(false);

const notifications = ref([
  { id: 1, message: 'Você tem uma nova mensagem.', time: '2 minutos atrás' },
  { id: 2, message: 'Seu relatório foi aprovado.', time: '1 hora atrás' },
  { id: 3, message: 'Atualização disponível.', time: 'Ontem' },
  { id: 1, message: 'Você tem uma nova mensagem.', time: '2 minutos atrás' },
  { id: 2, message: 'Seu relatório foi aprovado.', time: '1 hora atrás' },
  { id: 3, message: 'Atualização disponível.', time: 'Ontem' },
  { id: 1, message: 'Você tem uma nova mensagem.', time: '2 minutos atrás' },
  { id: 2, message: 'Seu relatório foi aprovado.', time: '1 hora atrás' },
  { id: 3, message: 'Atualização disponível.', time: 'Ontem' },
]);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function toggleNotifications() {
  isNotificationsOpen.value = !isNotificationsOpen.value;
}

function handleOption(option) {
  if (option === 'Sair') {
    localStorage.removeItem('token');
    localStorage.clear();
    window.location = '/login';
  }
  isDropdownOpen.value = false;
}
</script>
