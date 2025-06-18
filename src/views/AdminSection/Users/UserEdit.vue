<template>
  <AppLoading :open="isLoading" />
  <div class="h-full bg-gray-100 flex flex-col p-6">
    <h1 class="text-2xl font-bold mb-6">Editar Usuário - {{ form.name }}</h1>
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
            label="Username"
            icon="fa-user-tie"
            placeholder="Digite o username"
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
        </div>
        <div class="flex justify-end mt-6">
          <BaseButton
            :buttonText="'Criar Usuário'"
            :size="'lg'"
            :loading="isLoading"
            @click="handleRegister"
            class="self-center"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import AppLoading from '@/components/AppLoading.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import PasswordValidation from '@/components/PasswordValidation.vue';
import UserService from '@/services/internal/User/UserService';

const route = useRoute();
const isLoading = ref(false);
const service = new UserService();

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

const fetchUserById = async () => {
  const id = route.params.id;
  if (!id) return;

  isLoading.value = true;
  try {
    const response = await service.getById(id);
    const data = response.data;

    form.value.name = data.nome || '';
    form.value.username = data.username || '';
    form.value.email = data.email || '';
    form.value.cpf = data.cpf || '';
    form.value.phone = data.telefone || '';
    form.value.data_nascimento = data.data_nascimento || '';
    form.value.cargo = data.cargo || '';
    form.value.role = data.role || '';
    form.value.empresa_id = data.empresa_id || null;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchUserById();
});
</script>
