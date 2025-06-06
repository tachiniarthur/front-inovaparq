import api from '@/services/api';

export default class ProfileService {
  async update(id, req) {
    try {
      const response = await api.post('/login/', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async register(id, req) {
    try {
      const response = await api.delete('/users/', req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  }
}
