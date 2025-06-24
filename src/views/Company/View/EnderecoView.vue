<template>
  <div class="bg-gray-100 flex flex-col p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-6">Nome Empresa</h1>

    <div class="flex space-x-4 mb-6">
      <NavComponent v-for="tab in tabs" :key="tab.title" :route="tab.route + `/${companyId}`" :title="tab.title" />
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Endereço</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CompanyService from '@/services/internal/Company/CompanyService.js';
import NavComponent from '@/components/NavComponent.vue';
import { useRoute } from 'vue-router';

const companyService = new CompanyService();

const tabs = ref([
  { title: 'Informações Básicas', route: '/company-view/informacoes-basicas' },
  { title: 'Endereço', route: '/company-view/endereco' },
  { title: 'Representantes Legais', route: '/company-view/representantes-legais' },
  { title: 'Documentos', route: '/company-view/documentos' },
]);

const companyId = ref(null);
const company = ref([]);

onMounted(async () => {
  companyId.value = useRoute().params.id;
  // try {
  //   const response = await companyService.getCompanyById(companyId.value);
  //   company.value = response.data;
  // } catch (error) {
  //   console.error('Erro ao carregar os dados da empresa:', error);
  // }
});
</script>
