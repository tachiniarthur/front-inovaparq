<template>
  <AppLoading :open="isLoading" />
  <div class="h-full bg-gray-100 flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Editar Usuário - {{ form.name }}</h1>
    <form @submit.prevent="handleRegister">
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
            v-model="form.confirmPassword"
          />
          <PasswordValidation :password="form.password" :confirmPassword="form.confirmPassword" />
        </div>
        <div class="mt-5">
          <BaseSelect
            v-model="form.empresa_id"
            label="Vincular Empresa"
            icon="fa-building"
            :options="companyOptions"
            required
          />
        </div>
        <div class="flex justify-between w-full">
          <router-link
            to="/profile"
            class="text-md py-3 px-6 bg-secondary-500 text-white cursor-pointer font-bold rounded transition-transform active:scale-95 hover:opacity-90 flex items-center justify-center min-w-[150px] h-[48px]"
          >
            Cancelar
          </router-link>
          <div class="flex space-x-4">
            <BaseButton
              type="submit"
              :buttonText="'Editar Usuário'"
              :size="'lg'"
              :loading="isLoading"
              class="self-center"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppLoading from '@/components/AppLoading.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import PasswordValidation from '@/components/PasswordValidation.vue';
import UserService from '@/services/internal/User/UserService';
import CompanyService from '@/services/internal/Company/CompanyService';
import { useNotification } from '@/composables/useNotification';

const notification = useNotification();
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const companies = ref([]);
const user = ref(localStorage.getItem('user'));
const userParsed = JSON.parse(user.value);

const form = ref({
  name: '',
  username: '',
  email: '',
  cpf: '',
  phone: '',
  data_nascimento: '',
  role: '',
  password: '',
  confirmPassword: '',
  empresa_id: null,
});

const props = defineProps({
  id: {
    type: [String, Number],
    required: false,
  },
});

const fetchUserById = async () => {
  const id = props.id || route.params.id;
  if (!id) return;

  isLoading.value = true;
  try {
    const response = await UserService.getById(id);
    const data = response.data;

    form.value.name = data.data.nome || '';
    form.value.username = data.data.username || '';
    form.value.email = data.data.email || '';
    form.value.cpf = data.data.cpf || '';
    form.value.phone = data.data.telefone || '';
    form.value.data_nascimento = data.data.data_nascimento || '';
    form.value.cargo = data.data.cargo || '';
    form.value.role = data.data.role || '';
    form.value.empresa_id = data.data.empresa_id || null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  isLoading.value = true;
  try {
    const id = props.id || route.params.id;
    console.log(form.value);
    const response = await UserService.update(id, form.value);
    notification.notificationSuccess('Sucesso', response.data.message);
    router.push({ path: '/section-admin/users' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    notification.notificationError('Erro ao registrar usuário', error.data.message);
  } finally {
    isLoading.value = false;
  }
};

const companyOptions = computed(() =>
  companies.value.map((company) => ({
    label: company.nomeEmpresa,
    value: company.id,
  }))
);

onMounted(async () => {
  fetchUserById();
  try {
    const response = await CompanyService.getAll(userParsed.id);
    companies.value = response.data.data;
  } catch (error) {
    console.error('Erro ao carregar empresas:', error);
    notification.notificationError('Erro ao carregar empresas', error.data.message);
  }
});
</script>
