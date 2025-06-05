<template>
  <div class="h-screen">
    <div class="p-4 pb-0 flex flex-col space-y-4">
      <div class="flex justify-between">
        <h1 class="text-3xl font-medium">Início</h1>
        <router-link
          :to="'#'"
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
            :to="'/company-view/info/' + card.id"
            v-for="card in cards.filter((c) => c.status === step.id)"
            :key="card.id"
            class="bg-gray-100 p-3 rounded shadow cursor-pointer flex flex-col"
            @dragstart="dragStart(card)"
            draggable="true"
          >
            <span class="text-md">{{ card.title }}</span>
            <span class="text-xs">Responsável: {{ card.resp }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const steps = ref([
  { id: 'todo', title: 'A Fazer' },
  { id: 'in_progress', title: 'Em Progresso' },
  { id: 'review', title: 'Em Revisão' },
  { id: 'documents', title: 'Documentos Pendentes' },
  { id: 'financeiro', title: 'Pendências Financeiras' },
]);

const cards = ref([
  { id: 1, title: 'NÓRIO Nanotecnologia', resp: 'Arthur', status: 'todo' },
  { id: 2, title: 'NANOBIOCELL', resp: 'Gabriel', status: 'todo' },
  { id: 3, title: '4Factory', resp: 'Giordano', status: 'in_progress' },
  { id: 4, title: 'Moralar', resp: 'Hagedorn', status: 'in_progress' },
  { id: 3, title: '4Factory', resp: 'Giordano', status: 'in_progress' },
  { id: 4, title: 'Moralar', resp: 'Hagedorn', status: 'in_progress' },
  { id: 3, title: '4Factory', resp: 'Giordano', status: 'in_progress' },
  { id: 4, title: 'Moralar', resp: 'Hagedorn', status: 'in_progress' },
]);

const draggedCard = ref(null);

function dragStart(card) {
  draggedCard.value = card;
}

function onDrop(newStatus) {
  if (draggedCard.value) {
    draggedCard.value.status = newStatus;
    draggedCard.value = null;
  }
}
</script>
