import api from '@/services/api';

export default class ProfileService {
  async update(id, req) {
    try {
      const response = await api.put(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  async delete(id, req) {
    try {
      const response = await api.delete(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  }
}
