import http from '@/services/http';

export default class ProfileService {
  async getAll() {
    try {
      const response = await http.get('/users');
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  async update(id, req) {
    try {
      const response = await http.put(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await http.delete(`/users/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      throw error;
    }
  }
}
