<template>
  <div class="bg-gray-100 flex flex-col p-6 overflow-y-auto">
    <h1 class="text-2xl font-bold mb-6">Documentos</h1>

    <div class="flex space-x-4 mb-6">
      <NavComponent v-for="tab in tabs" :key="tab.title" :route="tab.route + `/${companyId}`" :title="tab.title" />
    </div>

    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-xl font-semibold mb-4">Documentos</h2>

      <p
        class="text-gray-700 mb-2 cursor-pointer underline hover:text-blue-600"
        @click="downloadFile(company.alvaraFuncionamento, 'alvara_funcionamento.pdf')"
      >
        <strong>Alvará de Funcionamento:</strong>
        arquivo disponível
      </p>

      <p
        class="text-gray-700 mb-2 cursor-pointer underline hover:text-blue-600"
        @click="downloadFile(company.inscricaoEstadualArquivo, 'inscricao_estadual.pdf')"
      >
        <strong>Inscrição Estadual:</strong>
        arquivo disponível
      </p>

      <p
        class="text-gray-700 mb-2 cursor-pointer underline hover:text-blue-600"
        @click="downloadFile(company.comprovanteEndereco, 'comprovante_endereco.pdf')"
      >
        <strong>Comprovante de Endereço:</strong>
        arquivo disponível
      </p>
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
const company = ref({});

onMounted(async () => {
  companyId.value = useRoute().params.id;
  try {
    const response = await CompanyService.getCompanyById(companyId.value, 'documentos');
    company.value = response.data.data;
  } catch (error) {
    console.error('Erro ao carregar os dados da empresa:', error);
  }
});

function downloadFile(base64Data, fileName) {
  if (!base64Data) {
    alert('Arquivo não disponível para download.');
    return;
  }
  const linkSource = `data:application/pdf;base64,${base64Data}`;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
</script>
