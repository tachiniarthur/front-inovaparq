<template>
  <AppLoading :open="isLoading" />
  <div class="h-full bg-gray-100 flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Criar Novo Usuário</h1>
    <form @submit.prevent="submitForm">
      <div class="bg-white shadow-md rounded-lg w-full p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 mb-0 space-x-6">
          <BaseInput
            v-model="form.name"
            label="Nome completo"
            icon="fa-user-tie"
            placeholder="Digite o nome completo"
            required
          />
          <BaseInput
            v-model="form.username"
            label="Nome de usuário"
            icon="fa-user-tie"
            placeholder="Digite o nome de usuário"
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
            v-model="form.cpf"
            label="CPF"
            icon="fa-id-card"
            placeholder="Digite o CPF"
            v-mask="['###.###.###-##']"
            required
          />
          <BaseInput
            v-model="form.phone"
            label="Telefone"
            icon="fa-phone"
            placeholder="Digite o telefone"
            v-mask="['(##) #####-####', '(##) ####-####']"
          />
          <BaseInput v-model="form.role" label="Cargo" icon="fa-user-shield" placeholder="Digite o cargo" />
          <BaseInput
            label="Senha"
            placeholder="••••••••••"
            icon="lock"
            type="password"
            name="password"
            id="password"
            v-model="form.password"
          />
          <BaseInput
            label="Confirmar Senha"
            placeholder="••••••••••"
            icon="lock"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            v-model="form.confirm_password"
          />
          <PasswordValidation :password="form.password" :confirmPassword="form.confirm_password" />
        </div>
        <div class="mt-5">
          <BaseSelect
            class="text-black"
            v-model="form.empresa_id"
            label="Vincular Empresa"
            icon="fa-building"
            :options="companyOptions"
            required
          />
        </div>
        <div class="flex justify-between items-center w-full mt-6">
          <router-link
            to="/section-admin/users"
            class="text-md py-3 px-6 bg-secondary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
          >
            Cancelar
          </router-link>
          <span v-if="!isFormValid" class="flex items-center">
            <BaseButton
              :buttonText="'Criar Usuário'"
              :size="'lg'"
              :loading="isLoading"
              :disabled="!isFormValid"
              @click="handleRegister"
              class="self-center"
              v-tippy="{
                content: 'Preencha todos os campos obrigatórios para criar o usuário',
                placement: 'top',
                arrow: true,
              }"
            />
          </span>
          <template v-else>
            <BaseButton
              :buttonText="'Criar Usuário'"
              :size="'lg'"
              :loading="isLoading"
              :disabled="!isFormValid"
              @click="handleRegister"
              class="self-center"
            />
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AppLoading from '@/components/AppLoading.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import PasswordValidation from '@/components/PasswordValidation.vue';
import { useNotification } from '@/composables/useNotification';
import CompanyService from '@/services/internal/Company/CompanyService.js';
import AuthService from '@/services/internal/Auth/AuthService.js';
import { useRouter } from 'vue-router';
import moment from 'moment';

const router = useRouter();

const notification = useNotification();
const isLoading = ref(false);

const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);

const companies = ref([]);

const companyOptions = computed(() =>
  companies.value.map(company => ({
    label: company.nomeEmpresa,
    value: company.id
  }))
);

const form = ref({
  name: '',
  username: '',
  email: '',
  cpf: '',
  phone: '',
  birthdate: '',
  role: '',
  password: '',
  confirm_password: '',
  empresa_id: null,
});

// Validação do formulário
const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.username &&
    form.value.email &&
    form.value.cpf &&
    form.value.password &&
    form.value.confirm_password &&
    form.value.empresa_id
  );
});

onMounted(async () => {
  try {
    const response = await CompanyService.getAll(userParsed.id);
    companies.value = response.data.data;
  } catch (error) {
    console.error('Erro ao carregar empresas:', error);
    notification.notificationError('Erro ao carregar empresas', error.data.message);
  }
});

function handleRegister() {
  const payload = { ...form.value };
  payload.cpf = payload.cpf.replace(/\D/g, '');
  payload.phone = payload.phone.replace(/\D/g, '');
  payload.birthdate = moment(payload.birthdate, 'DD/MM/YYYY').format('YYYY-MM-DD');
  AuthService.register(payload)
    .then((response) => {
      notification.notificationSuccess('Sucesso', response.data.message);
      router.push({ path: '/section-admin/users' });
    })
    .catch((error) => {
      console.error('Erro ao registrar usuário:', error);
      notification.notificationError('Erro ao registrar usuário', error.data.message);
    });
}
</script>
