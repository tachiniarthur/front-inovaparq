import http from '@/services/http';

export default class AuthService {
  async login(req) {
    try {
      const response = await api.post('/login/', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async register(req) {
    try {
      const response = await http.post('/register', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  }
}
