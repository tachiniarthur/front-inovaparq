<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Usuários</h1>
      <router-link
        to="/section-admin/users/new"
        class="text-md py-3 px-6 bg-primary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
      >
        Novo Usuário
      </router-link>
    </div>

    <div class="grid grid-cols-12 text-sm text-gray-500 font-semibold px-6 py-3 uppercase">
      <div class="col-span-1 flex items-center">
        <input type="checkbox" class="form-checkbox rounded" />
      </div>
      <div class="col-span-3">Nome</div>
      <div class="col-span-3">E-mail</div>
      <div class="col-span-2">CPF</div>
      <div class="col-span-2 text-center">Ativo</div>
      <div class="col-span-1 text-right">Ações</div>
    </div>

    <div class="space-y-3 mt-2">
      <div
        v-for="item in users"
        :key="item.id"
        :class="[
          'grid grid-cols-12 items-center px-6 py-4 rounded-lg shadow-sm w-full relative transition',
          selectedIds.includes(item.id)
            ? 'bg-[rgba(59,130,246,0.1)] border-1 border-primary-500'
            : 'bg-white border border-gray-200',
        ]"
      >
        <div class="col-span-1">
          <input
            type="checkbox"
            :id="'checkbox-' + item.id"
            class="form-checkbox rounded text-primary-500"
            :checked="selectedIds.includes(item.id)"
            @change="toggleSelection(item.id)"
          />
        </div>

        <div class="col-span-3 font-medium text-gray-800">{{ item.nome }}</div>
        <div class="col-span-3 text-gray-600 text-sm">{{ item.email }}</div>
        <div class="col-span-2 text-gray-600 text-sm">{{ item.cpf }}</div>
        <div class="col-span-2 text-center">
          <font-awesome-icon v-if="item.ativo == 1" :icon="'fa-solid fa-check'" class="text-green-700" />
          <font-awesome-icon v-else :icon="'fa-solid fa-xmark'" class="text-red-700" />
        </div>

        <div class="col-span-1 flex justify-end relative">
          <button
            @click.stop="toggleDropdown(item.id)"
            class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
          >
            ⋯
          </button>

          <div
            v-if="dropdownOpen === item.id"
            class="absolute right-0 top-10 bg-white border border-gray-200 rounded-md shadow-md z-10 w-36"
            :ref="(el) => (dropdownRefs[item.id] = el)"
          >
            <button
              class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              @click="handleStatus(item.id)"
            >
              {{ item.ativo == 1 ? 'Desativar' : 'Ativar' }}
            </button>
            <button
              class="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-gray-100 cursor-pointer"
              @click="handleActions('editar', item.id)"
            >
              Editar
            </button>
            <button
              class="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 cursor-pointer"
              @click="handleActions('excluir', item.id)"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import router from '@/router';
import UserService from '@/services/internal/User/UserService';

// const service = new UserService();
const users = ref([]);
const selectedIds = ref([]);
const dropdownOpen = ref(null);
const dropdownRefs = ref({});

onMounted(() => {
  UserService.getAll().then((response) => {
    users.value = response.data.data;
    console.log(users.value)
  });

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function toggleSelection(id) {
  if (selectedIds.value.includes(id)) {
    selectedIds.value = selectedIds.value.filter((i) => i !== id);
  } else {
    selectedIds.value.push(id);
  }
}

function toggleDropdown(id) {
  dropdownOpen.value = dropdownOpen.value === id ? null : id;
}

function handleClickOutside(event) {
  if (dropdownOpen.value !== null) {
    const dropdown = dropdownRefs.value[dropdownOpen.value];
    if (dropdown && !dropdown.contains(event.target)) {
      dropdownOpen.value = null;
    }
  }
}

function handleActions(action, id) {
  dropdownOpen.value = null;
  if (action === 'editar') {
    router.push({ path: `/section-admin/users/edit/${id}` });
  } else if (action === 'excluir') {
    alert(`Excluir usuário ${id}`);
  }
}

function handleStatus(id) {
  dropdownOpen.value = null;
  UserService.handleStatus(id).then(() => {
    UserService.getAll().then((response) => {
      users.value = response.data;
    });
  });
}
</script>
