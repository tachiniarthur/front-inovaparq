// composables/usePasswordValidation.js
import { ref, computed } from 'vue';

export function usePasswordValidation() {
  const changePasswordForm = ref({
    password: '',
    confirm_password: '',
  });

  const isPasswordValid = computed(() => {
    const password = changePasswordForm.value.password;
    const confirmPassword = changePasswordForm.value.confirm_password;

    return (
      password.length >= 8 &&
      password === confirmPassword &&
      /(?=.*[0-9])/.test(password) &&
      /(?=.*[a-z])(?=.*[A-Z])/.test(password) &&
      /(?=.*\W)/.test(password)
    );
  });

  return {
    changePasswordForm,
    isPasswordValid,
  };
}
