<template>
  <div class="bg-gray-100 flex flex-col p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-6">Nome Empresa</h1>

    <div class="flex space-x-4 mb-6">
      <router-link
        :to="'#'"
        :class="[
          'bg-primary-500 hover:bg-primary-700 transition-all text-white px-4 py-2 rounded-lg cursor-pointer',
          { 'bg-primary-900': router.currentRoute.value.path.includes('/company-view/info') },
        ]"
      >
        Informações Pessoais
      </router-link>
      <router-link
        :to="'#'"
        class="bg-primary-500 hover:bg-primary-700 transition-all text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Endereço
      </router-link>
      <router-link
        :to="'#'"
        class="bg-primary-500 hover:bg-primary-700 transition-all text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Representantes Legais
      </router-link>
      <router-link
        :to="'#'"
        class="bg-primary-500 hover:bg-primary-700 transition-all text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Documentos
      </router-link>
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Informações da Empresa</h2>
      <p class="text-gray-700 mb-2"><strong>Nome:</strong> Nome Empresa</p>
      <p class="text-gray-700 mb-2"><strong>Endereço:</strong> Rua Exemplo, 123, Cidade, Estado</p>
      <p class="text-gray-700 mb-2"><strong>Telefone:</strong> (11) 1234-5678</p>
      <p class="text-gray-700 mb-2"><strong>Email:</strong></p>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue';
// import CompanyService from '@/services/Company/CompanyService.js';
import router from '@/router';

console.log(router.currentRoute.value.path.includes('/company/info'));

// const companyService = new CompanyService();

// const company = ref(null);

// onMounted(() => {
//   companyService.getInfoCompany()
//     .then((response) => {
//         company.value = response.data;
//     })
//     .catch((error) => {
//         console.error('Error fetching company info:', error);
//     });
// });
</script>
