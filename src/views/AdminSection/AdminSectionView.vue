<template>
  <div class="min-h-screen p-6 bg-gray-100">
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-800">Painel do Administrador</h1>
      <p class="text-sm text-gray-500">Gerencie o sistema abaixo</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link
        to="/section-admin/users"
        class="rounded-xl bg-white shadow p-6 flex flex-col hover:bg-gray-50 transition"
      >
        <span class="text-xl font-bold text-primary-600">Central de Usuários</span>
        <span class="text-sm text-gray-500 mt-2">Editar, cadastrar e desativar usuários</span>
      </router-link>
    </div>
  </div>
</template>

<script setup></script>
