import api from '@/services/api';

export default class AuthService {
  async login(req) {
    try {
      const response = await api.post('/login', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async register(req) {
    try {
      const response = await api.post('/register', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  }
}
