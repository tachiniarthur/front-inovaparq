<template>
  <div class="bg-gray-100 flex flex-col p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-6">Nome Empresa</h1>

    <div class="flex space-x-4 mb-6">
      <NavComponent v-for="tab in tabs" :key="tab.title" :route="tab.route + `/${companyId}`" :title="tab.title" />
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Informações da Empresa</h2>
      <p class="text-gray-700 mb-2"><strong>Nome:</strong> {{ company.name }}</p>
      <p class="text-gray-700 mb-2"><strong>CNPJ:</strong> {{ company.cnpj }}</p>
      <p class="text-gray-700 mb-2"><strong>Email:</strong> {{ company.email }}</p>
      <p class="text-gray-700 mb-2"><strong>Telefone:</strong> {{ company.telefone }}</p>
      <p class="text-gray-700 mb-2"><strong>Site:</strong> {{ company.site }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CompanyService from '@/services/internal/Company/CompanyService.js';
import NavComponent from '@/components/NavComponent.vue';
import { useRoute } from 'vue-router';

const tabs = ref([
  { title: 'Informações Básicas', route: '/company-view/informacoes-basicas' },
  { title: 'Endereço', route: '/company-view/endereco' },
  { title: 'Representante Legal', route: '/company-view/representantes-legais' },
  { title: 'Documentos', route: '/company-view/documentos' },
]);

const companyId = ref(null);
const company = ref([]);

onMounted(async () => {
  companyId.value = useRoute().params.id;
  try {
    const response = await CompanyService.getCompanyById(companyId.value, 'informacoes-basicas');
    company.value = response.data.data;
  } catch (error) {
    console.error('Erro ao carregar os dados da empresa:', error);
  }
});
</script>
