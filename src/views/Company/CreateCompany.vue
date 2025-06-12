<template>
  <AppLoading :open="loading" />
  <div class="h-full bg-gray-100 flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Criar Nova Empresa</h1>
    <form @submit.prevent="submitForm" class="space-y-8 max-w-10xl mx-auto">
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Informações Básicas</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <BaseInput
            v-model="form.companyName"
            label="Nome da Empresa"
            placeholder="Digite o nome da empresa"
            icon="fa-building"
            required
          />
          <BaseInput
            v-model="form.cnpj"
            label="CNPJ"
            icon="fa-id-card"
            placeholder="Digite o CNPJ da empresa"
            v-mask="['##.###.###/####-##']"
            required
          />
          <BaseInput
            v-model="form.stateRegistration"
            label="Inscrição Estadual"
            icon="fa-file-signature"
            placeholder="Digite a inscrição estadual"
            required
            v-mask="['##############']"
          />
          <BaseInput
            v-model="form.municipalRegistration"
            label="Inscrição Municipal"
            icon="fa-file-signature"
            placeholder="Digite a inscrição municipal"
            required
            v-mask="['###########']"
          />
          <BaseInput
            v-model="form.corporateName"
            label="Razão Social"
            icon="fa-briefcase"
            placeholder="Digite a razão social"
            required
          />
          <BaseInput
            v-model="form.tradeName"
            label="Nome Fantasia"
            icon="fa-tag"
            placeholder="Digite o nome fantasia"
            required
          />
          <BaseInput
            v-model="form.phone"
            label="Telefone"
            icon="fa-phone"
            placeholder="Digite o telefone"
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
          />
          <BaseInput
            v-model="form.email"
            label="E-mail"
            icon="fa-envelope"
            placeholder="Digite o e-mail"
            type="email"
            required
          />
          <BaseInput
            v-model="form.website"
            label="Site (opcional)"
            icon="fa-globe"
            placeholder="Digite o site"
            type="text"
          />
          <BaseInput
            v-model="form.foundingDate"
            label="Data de Fundação"
            icon="fa-calendar-alt"
            placeholder="Digite a data de fundação"
            type="text"
            v-mask="['##/##/####']"
            required
          />
          <BaseSelect
            v-model="form.legalNature"
            label="Natureza Jurídica"
            icon="fa-balance-scale"
            :options="[
              { value: 'MEI', label: 'MEI' },
              { value: 'ME', label: 'Microempresa (ME)' },
              { value: 'EPP', label: 'Empresa de Pequeno Porte (EPP)' },
              { value: 'LTDA', label: 'Sociedade Limitada (LTDA)' },
              { value: 'SA', label: 'Sociedade Anônima (SA)' },
              { value: 'EIRELI', label: 'Empresa Individual de Responsabilidade Limitada (EIRELI)' },
            ]"
            required
          />
          <BaseInput
            v-model="form.businessActivity"
            label="Ramo de Atividade"
            icon="fa-industry"
            placeholder="Digite o ramo de atividade"
            type="text"
            required
          />
        </div>
      </div>
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Endereço</h2>
        <div class="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div class="md:col-span-2">
            <BaseInput
              v-model="form.cep"
              label="CEP"
              icon="fa-map-marker-alt"
              placeholder="Digite o CEP"
              v-mask="['#####-###']"
              required
              @input="getAddressFromCep(form.cep)"
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="form.state"
              label="Estado"
              icon="fa-map-marker-alt"
              placeholder="Estado"
              required
              disabled
            />
          </div>
          <div class="md:col-span-3">
            <BaseInput
              v-model="form.city"
              label="Cidade"
              icon="fa-map-marker-alt"
              placeholder="Cidade"
              required
              disabled
            />
          </div>
          <div class="md:col-span-4">
            <BaseInput
              v-model="form.address"
              label="Rua/Logradouro"
              icon="fa-map-marker-alt"
              placeholder="Digite o endereço"
              required
              disabled
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="form.number"
              label="Número"
              icon="fa-map-marker-alt"
              placeholder="Nº"
              required
              v-mask="['########']"
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="form.neighborhood"
              label="Bairro"
              icon="fa-map-marker-alt"
              placeholder="Bairro"
              required
              disabled
            />
          </div>
          <div class="md:col-span-2">
            <BaseInput
              v-model="form.complement"
              label="Complemento"
              icon="fa-map-marker-alt"
              placeholder="(opcional)"
            />
          </div>
        </div>
      </div>
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Representantes Legais</h2>
        <div v-for="(rep, idx) in form.legalRepresentatives" :key="idx" class="border-b pb-4 mb-4">
          <div class="flex items-center gap-4 mb-4">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="rep.isNew" />
              <span>Cadastrar novo representante legal</span>
            </label>
            <button
              v-if="form.legalRepresentatives.length > 1"
              type="button"
              class="text-red-600 hover:underline ml-auto"
              @click="removeRepresentative(idx)"
            >
              Remover
            </button>
          </div>
          <template v-if="!rep.isNew">
            <BaseSelect
              v-model="rep.userId"
              label="Usuário existente"
              icon="fa-user"
              :options="userOptions"
              placeholder="Selecione um usuário"
              required
            />
          </template>
          <template v-else>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BaseInput
                v-model="rep.name"
                label="Nome completo"
                icon="fa-user-tie"
                placeholder="Digite o nome completo"
                required
              />
              <BaseInput
                v-model="rep.email"
                label="E-mail"
                icon="fa-envelope"
                placeholder="Digite o e-mail"
                type="email"
                required
              />
              <BaseInput
                v-model="rep.cpf"
                label="CPF"
                icon="fa-id-card"
                placeholder="Digite o CPF"
                v-mask="['###.###.###-##']"
                required
              />
              <BaseInput
                v-model="rep.phone"
                label="Telefone"
                icon="fa-phone"
                placeholder="Digite o telefone"
                v-mask="['(##) #####-####', '(##) ####-####']"
              />
              <BaseInput
                v-model="rep.birthDate"
                label="Data de nascimento"
                icon="fa-birthday-cake"
                placeholder="DD/MM/AAAA"
                v-mask="['##/##/####']"
              />
              <BaseInput v-model="rep.role" label="Cargo" icon="fa-user-shield" placeholder="Digite o cargo" />
            </div>
          </template>
        </div>
        <BaseButton
          :buttonText="'Adicionar representante legal'"
          :size="'sm'"
          :color="'bg-primary-600'"
          @click="addRepresentative"
        />
      </div>
      <!-- Documentos -->
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Documentos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <BaseInput
            v-model="form.operatingLicense"
            label="Alvará de Funcionamento"
            icon="fa-file-certificate"
            placeholder="Insira o alvará de funcionamento"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <BaseInput
            v-model="form.registrationDocument"
            label="Inscrição"
            icon="fa-file-signature"
            placeholder="Digite a inscrição"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <BaseInput
            v-model="form.addressProof"
            label="Comprovante de Endereço"
            icon="fa-file-invoice"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <BaseInput
            v-model="form.addressProof"
            label="Documentos do representante legal"
            icon="fa-id-badge"
            required
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
          />
        </div>
      </div>
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
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useViaCEP } from '@/services/external/ViaCepService.js';
import { useNotification } from '@/composables/useNotification.js';
import AppLoading from '@/components/AppLoading.vue';

// const router = useRouter();
const { getAddress } = useViaCEP();

const loading = ref(false);

const form = ref({
  companyName: '',
  cnpj: '',
  stateRegistration: '',
  municipalRegistration: '',
  corporateName: '',
  tradeName: '',
  phone: '',
  email: '',
  website: '',
  foundingDate: '',
  legalNature: '',
  businessActivity: '',
  operatingLicense: '',
  registrationDocument: '',
  addressProof: '',
  address: '',
  neighborhood: '',
  city: '',
  cep: '',
  state: '',
  country: '',
  number: '',
  complement: '',
  legalRepresentatives: [
    {
      isNew: false,
      userId: '',
      name: '',
      email: '',
      cpf: '',
      phone: '',
      birthDate: '',
      role: '',
    },
  ],
});

const userOptions = ref([]);
const fetchUsers = async () => {
  userOptions.value = [
    { value: '1', label: 'Arthur Silva' },
    { value: '2', label: 'Maria Souza' },
    { value: '3', label: 'Carlos Oliveira' },
  ];
};
onMounted(fetchUsers);

const getAddressFromCep = async (cep) => {
  if (cep.length === 0) {
    form.value.address = '';
    form.value.neighborhood = '';
    form.value.city = '';
    form.value.state = '';
    return;
  }
  if (!cep || cep.length < 9) {
    return;
  }
  loading.value = true;
  const { data, error } = await getAddress(cep);
  if (error) {
    useNotification().error('Erro ao buscar endereço', error.message);
  } else if (data) {
    form.value.address = data.logradouro || '';
    form.value.neighborhood = data.bairro || '';
    form.value.city = data.localidade || '';
    form.value.state = data.uf || '';
    form.value.country = 'Brasil';
  } else {
    useNotification().error('CEP não encontrado', 'Verifique o CEP informado.');
  }
  loading.value = false;
};

const addRepresentative = () => {
  form.value.legalRepresentatives.push({
    isNew: false,
    userId: '',
    name: '',
    email: '',
    cpf: '',
    phone: '',
    birthDate: '',
    role: '',
  });
};
const removeRepresentative = (idx) => {
  form.value.legalRepresentatives.splice(idx, 1);
};
</script>
