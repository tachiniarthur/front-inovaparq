import http from '@/services/http';

export const ProfileService = {
  async update(id, req) {
    console.log(req);

    try {
      const response = await http.put(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  },

  async delete(id, req) {
    try {
      const response = await http.delete(`/users/${id}`, req);
      return response;
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      throw error;
    }
  },
};

export default ProfileService;
