<template>
  <AppLoading :open="isLoading" />
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
              v-model="endereco.cep"
              label="CEP"
              icon="fa-map-marker-alt"
              placeholder="Digite o CEP"
              v-mask="['#####-###']"
              required
              @input="getAddressFromCep(endereco.cep)"
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="endereco.state"
              label="Estado"
              icon="fa-map-marker-alt"
              placeholder="Estado"
              required
              disabled
            />
          </div>
          <div class="md:col-span-3">
            <BaseInput
              v-model="endereco.city"
              label="Cidade"
              icon="fa-map-marker-alt"
              placeholder="Cidade"
              required
              disabled
            />
          </div>
          <div class="md:col-span-3">
            <BaseInput
              v-model="endereco.address"
              label="Rua/Logradouro"
              icon="fa-map-marker-alt"
              placeholder="Digite o endereço"
              required
              disabled
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="endereco.number"
              label="Número"
              icon="fa-map-marker-alt"
              placeholder="Nº"
              required
              v-mask="['########']"
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="endereco.neighborhood"
              label="Bairro"
              icon="fa-map-marker-alt"
              placeholder="Bairro"
              required
              disabled
            />
          </div>
          <div class="md:col-span-1">
            <BaseInput
              v-model="endereco.complement"
              label="Complemento"
              icon="fa-map-marker-alt"
              placeholder="(opcional)"
            />
          </div>
        </div>
      </div>
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold pb-2">Representantes Legais</h2>
        <div class="flex items-center gap-4 mb-4">
          <label class="flex items-center gap-2">
            <BaseSwitch
              v-model="rep.isNew"
              size="md"
              label="Cadastrar novo representante legal"
            />

          </label>
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
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <h2 class="text-lg font-semibold mb-4 border-b pb-2">Documentos</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FileUpload
            label="Alvará de Funcionamento"
            icon="fa fa-certificate"
            placeholder="Selecione o arquivo"
            accept=".pdf,.jpg,.jpeg,.png"
            :required="true"
            @update:file="(file) => handleFileChange('operatingLicense', file)"
          />
          <FileUpload
            label="Inscrição"
            icon="fa fa-file-signature"
            placeholder="Selecione o arquivo"
            accept=".pdf,.jpg,.jpeg,.png"
            :required="true"
            @update:file="(file) => handleFileChange('registrationDocument', file)"
          />
          <FileUpload
            label="Comprovante de Endereço"
            icon="fa fa-file-invoice"
            placeholder="Selecione o arquivo"
            accept=".pdf,.jpg,.jpeg,.png"
            :required="true"
            @update:file="(file) => handleFileChange('addressProof', file)"
          />
        </div>
      </div>
      <div class="flex justify-between">
        <router-link
          to="/home"
          class="text-md py-3 px-6 bg-secondary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
        >
          Voltar
        </router-link>
        <span v-if="!isFormValid">
          <BaseButton
            :buttonText="'Salvar Empresa'"
            :color="'bg-primary-700'"
            :loading="isLoading"
            :disabled="!isFormValid"
            @click="submit()"
              v-tippy="{
              content: 'Preencha todos os campos obrigatórios para salvar',
              placement: 'top',
              arrow: true,
              theme: 'custom'
            }"
          />
        </span>
        <template v-else>
          <BaseButton
            :buttonText="'Salvar Empresa'"
            :color="'bg-primary-700'"
            :loading="isLoading"
            :disabled="!isFormValid"
            @click="submit()"
          />
        </template>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseSwitch from '@/components/BaseSwitch.vue';
import { useRouter } from 'vue-router';
import FileUpload from '@/components/FileUpload.vue';

import { useViaCEP } from '@/services/external/ViaCepService.js';
import UserService from '@/services/internal/User/UserService.js';
import CompanyService from '@/services/internal/Company/CompanyService';

import { useNotification } from '@/composables/useNotification.js';
import AppLoading from '@/components/AppLoading.vue';

const notification = useNotification();
const router = useRouter();
const { getAddress } = useViaCEP();

const isLoading = ref(false);
const usersRaw = ref([]);

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
});

const endereco = ref({
  cep: '',
  country: '',
  state: '',
  city: '',
  address: '',
  neighborhood: '',
  number: '',
  complement: '',
});

const rep = ref({
  isNew: false,
  userId: '',
  name: '',
  email: '',
  cpf: '',
  phone: '',
  birthDate: '',
  role: '',
});

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleFileChange(type, file) {
  if (!file) {
    form.value[type] = '';
    return;
  }
  if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
    form.value[type] = await fileToBase64(file);
  } else {
    form.value[type] = '';
  }
}

function submit() {
  isLoading.value = true;
  const payload = {
    companyData: { ...form.value },
    addressData: { ...endereco.value },
    responsibleData: { ...rep.value },
  };
  CompanyService.create(payload)
    .then((response) => {
      router.push({ path: '/home' });
      localStorage.setItem('savedCompany', response.data.message);
    })
    .catch((error) => {
      notification.notificationError('Erro ao criar empresa', error.data.message);
    })
    .finally(() => {
      isLoading.value = false;
    });
}

const userOptions = ref([]);
const fetchUsers = async () => {
  isLoading.value = true;
  UserService.getAll()
    .then((response) => {
      usersRaw.value = response.data.data;

      userOptions.value = usersRaw.value
        .filter((user) => !!user.cpf && user.cpf.trim() !== '')
        .map((user) => ({
          value: user.id,
          label: `${user.nome} (${user.email})`,
        }));
    })
    .catch((error) => {
      notification.notificationError('Erro ao buscar usuários', error.message);
    })
    .finally(() => {
      isLoading.value = false;
    });
};


const getAddressFromCep = async (cep) => {
  if (cep.length === 0) {
    endereco.value.address = '';
    endereco.value.neighborhood = '';
    endereco.value.city = '';
    endereco.value.state = '';
    return;
  }
  if (!cep || cep.length < 9) {
    return;
  }
  isLoading.value = true;
  const { data, error } = await getAddress(cep);
  if (error) {
    notification.notificationError('Erro ao buscar endereço', error.message);
  } else if (data) {
    endereco.value.address = data.logradouro || '';
    endereco.value.neighborhood = data.bairro || '';
    endereco.value.city = data.localidade || '';
    endereco.value.state = data.uf || '';
    endereco.value.country = 'Brasil';
  } else {
    notification.notificationError('CEP não encontrado', 'Verifique o CEP informado.');
  }
  isLoading.value = false;
};

const isFormValid = computed(() => {
  // Campos obrigatórios do formulário principal
  const requiredFormFields = [
    'companyName',
    'cnpj',
    'stateRegistration',
    'municipalRegistration',
    'corporateName',
    'tradeName',
    'phone',
    'email',
    'foundingDate',
    'legalNature',
    'businessActivity',
    'operatingLicense',
    'registrationDocument',
    'addressProof',
  ];

  // Validação dos campos do formulário principal
  const formValid = requiredFormFields.every((key) => {
    const value = form.value[key];
    // Para arquivos, pode ser base64 (string) ou objeto File
    if (
      ['operatingLicense', 'registrationDocument', 'addressProof'].includes(key)
    ) {
      return typeof value === 'string' && value.trim() !== '';
    }
    // Para outros campos, string não vazia
    return !!value && (typeof value === 'string' ? value.trim() !== '' : true);
  });

  // Campos obrigatórios do endereço
  const requiredEnderecoFields = [
    'cep',
    'state',
    'city',
    'address',
    'number',
    'neighborhood',
  ];

  // Validação dos campos do endereço
  const enderecoValid = requiredEnderecoFields.every((key) => {
    const value = endereco.value[key];
    // Permitir número como string ou número, mas não vazio
    if (key === 'number') {
      return value !== undefined && value !== null && String(value).trim() !== '';
    }
    return !!value && (typeof value === 'string' ? value.trim() !== '' : true);
  });

  // Validação do representante legal
  let repValid = false;
  if (rep.value.isNew) {
    repValid =
      !!rep.value.name &&
      rep.value.name.trim() !== '' &&
      !!rep.value.email &&
      rep.value.email.trim() !== '' &&
      !!rep.value.cpf &&
      rep.value.cpf.trim() !== '';
  } else {
    repValid = !!rep.value.userId && rep.value.userId !== '';
  }

  return formValid && enderecoValid && repValid;
});

watch(
  () => rep.value.isNew,
  (isNew) => {
    rep.value = {
      isNew,
      userId: '',
      name: '',
      email: '',
      cpf: '',
      phone: '',
      birthDate: '',
      role: '',
    };
  }
);

watch(
  () => rep.value.userId,
  (newUserId) => {
    if (!rep.value.isNew && newUserId) {
      const fullUser = usersRaw.value.find((u) => u.id === Number(newUserId));
      if (fullUser) {
        rep.value.name = fullUser.nome || '';
        rep.value.email = fullUser.email || '';
        rep.value.cpf = fullUser.cpf || '';
        rep.value.phone = fullUser.telefone || '';
        rep.value.birthDate = '';
        rep.value.role = '';
      }
    }
  }
);



onMounted(async () => {
  fetchUsers();
});
</script>
