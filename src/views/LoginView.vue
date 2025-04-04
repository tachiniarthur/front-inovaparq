<template>
  <section class="h-screen w-full flex">
    <div class="bg-red-500 w-2/3">
      <img
        :src="'./imagem-inovaparq.png'"
        alt="Imagem Inovaparq"
        class="h-full w-full object-cover"
      />
    </div>
    <div class="bg-gray-300 h-full w-1/3 flex flex-col items-center py-10 px-6 overflow-y-auto">
      <img :src="'./logo-inovaparq.png'" alt="Logo Inovaparq" class="h-28 w-auto object-cover" />
      <h1 class="mt-8">Login</h1>
    </div>
  </section>
</template>

<script setup></script>
