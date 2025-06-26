<template>
  <div class="h-screen flex flex-col">
    <div class="p-4 pb-0 flex flex-col space-y-4">
      <div class="flex justify-between">
        <h1 class="text-3xl font-medium">Início</h1>
        <router-link
          :to="{ path: '/create-company' }"
          class="text-md py-3 px-6 bg-primary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px] gap-x-2"
        >
          Nova Empresa
          <font-awesome-icon :icon="['fas', 'plus']" class="text-2xl font-medium" />
        </router-link>
      </div>
    </div>
    <div class="p-6 flex gap-6 h-full overflow-x-auto">
      <div
        v-for="step in steps"
        :key="step.id"
        class="bg-primary-400 p-5 rounded-2xl flex-shrink-0 flex flex-col w-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
        @drop="onDrop(step.id)"
        @dragover.prevent
      >
        <h2 class="text-xl font-semibold mb-4 text-white text-center tracking-wide">{{ step.title }}</h2>
        <div v-if="companies" class="flex-1 space-y-4 overflow-y-auto hide-scrollbar min-h-0">
          <router-link
            :to="'/company-view/informacoes-basicas/' + companie.id"
            v-for="companie in companies.filter((c) => c.slugStatus === step.id)"
            :key="companie.id"
            class="bg-white hover:bg-gray-100 transtion-all duration-200 p-4 rounded-xl shadow-sm cursor-pointer flex flex-col border border-gray-100"
            @dragstart="dragStart(company)"
            draggable="true"
          >
            <span class="text-base font-medium text-gray-800">{{ companie.nomeEmpresa }}</span>
            <span class="text-sm text-gray-500 mt-1">Responsável: {{ companie.nomeResponsavel }}</span>
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
  if (localStorage.getItem('savedCompany')) {
    notification.notificationSuccess('Sucesso', localStorage.getItem('savedCompany'));
    localStorage.removeItem('savedCompany');
  }
  try {
    const response = await CompanyService.getAll(userParsed.id);
    companies.value = response.data.data;
    if (!localStorage.getItem('savedCompany')) {
      notification.notificationSuccess('Sucesso', 'Empresas carregadas com sucesso!');
    }
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
    CompanyService.updateStatus(draggedCard.value.id, newStatus)
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
