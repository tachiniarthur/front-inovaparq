<template>
  <div class="h-full bg-gray-100 flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Criar Nova Empresa</h1>
    <form @submit.prevent="submitForm" class="space-y-8 max-w-4xl mx-auto">
      <!-- Informações Básicas -->
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Informações Básicas</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BaseInput
            v-model="form.name"
            label="Nome da Empresa"
            placeholder="Digite o nome da empresa"
            icon="building"
            required
          />
          <BaseInput
            v-model="form.cnpj"
            label="CNPJ"
            icon="id-card"
            placeholder="Digite o CNPJ da empresa"
            required
          />
          <BaseInput
            v-model="form.stateSubscription"
            label="Inscrição Estadual"
            icon="pen-to-square"
            placeholder="Digite a inscrição estadual da empresa"
            required
          />
          <BaseInput
            v-model="form.civicSubscription"
            label="Inscrição Municipal"
            icon="pen-to-square"
            placeholder="Digite a inscrição municipal da empresa"
            required
          />
          <BaseInput
            v-model="form.corporateName"
            label="Razão social"
            icon="id-card"
            placeholder="Digite a razão social da empresa"
            required
          />
          <BaseInput
            v-model="form.fantasyName"
            label="Nome fantasia"
            icon="id-card"
            placeholder="Digite o nome fantasia da empresa"
            required
          />
          <BaseInput
            v-model="form.cnpj"
            label="Telefone"
            icon="id-card"
            placeholder="Digite o telefone da empresa"
            v-mask="['(##) ####-####'],['(##) #####-####']"
            required
          />
          <BaseInput
            v-model="form.email"
            label="E-mail"
            icon="envelope"
            placeholder="Digite o e-mail da empresa"
            type="email"
            required
          />
          <BaseInput
            v-model="form.website"
            label="Site (opcional)"
            icon="globe"
            placeholder="Digite o site da empresa"
            type="text"
            required
          />
          <BaseInput
            v-model="form.foundingDate"
            label="Data de fundação"
            icon="envelope"
            placeholder="Digite a data de fundação da empresa"
            type="text"
            v-mask="['##/##/####']"
            required
          />
          <select
            v-model="form.legalNature"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            required
            >
            <option value="LTDA">LTDA</option>
            <option value="MEI">MEI</option>
            <option value="S/A">S/A</option>
          </select>
          <BaseInput
            v-model="form.email"
            label="E-mail"
            icon="envelope"
            placeholder="Digite o e-mail da empresa"
            type="email"
            required
          />
        </div>
      </div>
      <!-- Documentos -->
      <!-- <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Documentos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BaseInput
            v-model="form.order"
            label="Alvará de Funcionamento"
            icon="file-alt"
            placeholder="Insira o alvará de funcionamento"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <BaseInput
            v-model="form.subscription"
            label="Inscrição"
            placeholder="Digite a inscrição"
            icon="square-pen"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <BaseInput
            v-model="form.proof"
            label="Comprovante de Endereço"
            icon="map-marker-alt"
            placeholder="Insira o comprovante de endereço"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div> -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-primary-600 hover:bg-primary-700 text-white cursor-pointer font-semibold py-3 px-8 rounded-lg shadow transition"
        >
          Salvar Empresa
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import BaseInput from '@/assets/components/BaseInput.vue';

const router = useRouter();

const form = ref({
  name: '',
  cnpj: '',
  order: '',
  subscription: '',
  proof: '',
})
</script>
