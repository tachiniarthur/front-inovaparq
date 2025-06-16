import http from '@/services/http';

export const AuthService = {
  async login(req) {
    try {
      const response = await http.post('/login', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async register(req) {
    try {
      const response = await http.post('/users', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  }
}

export default AuthService;
