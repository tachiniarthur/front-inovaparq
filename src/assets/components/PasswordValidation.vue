<template>
    <div class="flex justify-start">
      <ul class="rounded-md p-4 w-full">
        <li class="flex items-center py-1" v-for="(validation, index) in validations" :key="index">
          <font-awesome-icon
            :icon="validation.check()"
            :class="validation.isValid() ? 'text-green-700' : 'text-red-700'"
            class="text-lg"></font-awesome-icon>
          <span :class="validation.isValid() ? 'text-green-700' : 'text-red-700'"
                class="font-medium text-sm ml-3">
            {{ validation.message }}
          </span>
        </li>
      </ul>
    </div>
  </template>

  <script setup>

  const props = defineProps({
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    }
  });

  const validations = [
    {
      message: 'Mínimo 8 caracteres',
      check: () => (props.password.length >= 8) ? 'circle-check' : 'circle-xmark',
      isValid: () => props.password.length >= 8,
    },
    {
        message: 'As senhas coincidem',
        check: () => (props.password && props.confirmPassword && props.password === props.confirmPassword) ? 'circle-check' : 'circle-xmark',
        isValid: () => (props.password && props.confirmPassword && props.password === props.confirmPassword),
    },
    {
      message: 'Mínimo um número',
      check: () => (/\d/.test(props.password)) ? 'circle-check' : 'circle-xmark',
      isValid: () => /\d/.test(props.password),
    },
    {
      message: 'Mínimo uma letra maiúscula e minúscula',
      check: () => (/(?=.*[a-z])(?=.*[A-Z])/.test(props.password)) ? 'circle-check' : 'circle-xmark',
      isValid: () => /(?=.*[a-z])(?=.*[A-Z])/.test(props.password),
    },
    {
      message: 'Mínimo um caractere especial',
      check: () => (/\W/.test(props.password)) ? 'circle-check' : 'circle-xmark',
      isValid: () => /\W/.test(props.password),
    }
  ];
  </script>
