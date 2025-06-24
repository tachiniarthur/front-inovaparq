import http from '@/services/http';

export const UserService = {
  async getAll() {
    try {
      const response = await http.get('/users');
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await http.get(`/users/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  },

  async handleStatus(id) {
    try {
      const response = await http.put(`/users/status/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao alterar status do usuário:', error);
      throw error;
    }
  },

  async update(id, req) {
    try {
      const response = await http.put(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  },

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

export default UserService;
