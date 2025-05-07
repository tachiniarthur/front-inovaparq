<template>
  <HeaderComponent />
  <div class="flex gap-4 p-4 h-screen">
    <div
      v-for="step in steps"
      :key="step.id"
      class="bg-primary-400 p-4 rounded flex-1 flex flex-col"
      @drop="onDrop(step.id)"
      @dragover.prevent
    >
      <h2 class="text-lg font-bold mb-4 text-center">{{ step.title }}</h2>

      <div class="flex-1 space-y-3 min-h-0 overflow-y-auto">
        <div
          v-for="card in cards.filter((c) => c.status === step.id)"
          :key="card.id"
          class="bg-white p-3 rounded shadow cursor-pointer"
          @dragstart="dragStart(card)"
          draggable="true"
        >
          {{ card.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { ref } from 'vue';

const steps = ref([
  { id: 'todo', title: 'A Fazer' },
  { id: 'in_progress', title: 'Em Progresso' },
  { id: 'review', title: 'Em Revisão' },
  { id: 'testing', title: 'Testes' },
  { id: 'done', title: 'Concluído' },
]);

const cards = ref([
  { id: 1, title: 'Criar layout', status: 'todo' },
  { id: 2, title: 'Implementar lógica', status: 'todo' },
  { id: 3, title: 'Revisar código', status: 'in_progress' },
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
