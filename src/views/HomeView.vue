<template>
  <div class="h-screen flex flex-col">
    <div class="p-4 pb-0 flex flex-col space-y-4">
      <div class="flex justify-between">
        <h1 class="text-3xl font-medium">Início</h1>
        <router-link
          :to="{ path: '/create-company' }"
          class="cursor-pointer flex items-center justify-center gap-2 font-medium bg-primary-400 hover:bg-primary-200 px-3 rounded-lg duration-300"
        >
          Nova Empresa
          <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl font-medium" />
        </router-link>
      </div>
    </div>
    <div class="p-4 flex gap-4 h-full overflow-x-auto">
      <div
        v-for="step in steps"
        :key="step.id"
        class="bg-primary-400 p-4 rounded flex-shrink-0 flex flex-col w-80"
        @drop="onDrop(step.id)"
        @dragover.prevent
      >
        <h2 class="text-lg font-bold mb-4 text-center">{{ step.title }}</h2>

        <div class="flex-1 space-y-3 min-h-0 overflow-y-auto hide-scrollbar">
          <router-link
            :to="'/company-view/info/' + companie.id"
            v-for="companie in companies.filter((c) => c.status === step.id)"
            :key="companie.id"
            class="bg-gray-100 p-3 rounded shadow cursor-pointer flex flex-col"
            @dragstart="dragStart(companie)"
            draggable="true"
          >
            <span class="text-md">{{ companie.title }}</span>
            <span class="text-xs">Responsável: {{ companie.resp }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotification } from '@/composables/useNotification';
import CompanyService from '@/services/internal/Company/CompanyService.js';

const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);


const notification = useNotification();
const companies = ref([]);

onMounted(async () => {
  try {
    const response = await CompanyService.getAll(userParsed.id);
    companies.value = response.data;
    console.log('Empresas carregadas:', companies.value);
  } catch (error) {
    console.error('Erro ao carregar empresas:', error);
    notification.notificationError('Erro ao carregar empresas', error.data.message);
  }
});

const steps = ref([
  { id: 'todo', title: 'A Fazer' },
  { id: 'in_progress', title: 'Em Progresso' },
  { id: 'review', title: 'Em Revisão' },
  { id: 'documents', title: 'Documentos Pendentes' },
  { id: 'financeiro', title: 'Pendências Financeiras' },
]);

const draggedCard = ref(null);

function dragStart(companies) {
  draggedCard.value = companies;
}

function onDrop(newStatus) {
  if (draggedCard.value) {
    CompanyService
      .updateStatus(draggedCard.value.id, newStatus)
      .then(() => {
        const index = companies.value.findIndex((c) => c.id === draggedCard.value.id);
        if (index !== -1) {
          companies.value[index].status = newStatus;
        }
        draggedCard.value = null;
      })
      .catch((error) => {
        console.error('Erro ao atualizar status:', error);
      });
  }
}
</script>
