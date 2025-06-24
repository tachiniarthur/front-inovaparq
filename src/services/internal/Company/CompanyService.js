import http from '@/services/http';

export const CompanyService = {
  async getAll(id) {
    try {
      const response = await http.get(`/companies/list/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao obter empresas:', error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const response = await http.get(`/companies/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao obter empresa por ID:', error);
      throw error;
    }
  },

  async create(req) {
    try {
      const response = await http.post('/companies', req);
      return response;
    } catch (error) {
      console.error('Erro ao criar empresa:', error);
      throw error;
    }
  },

  async update(req){
    try {
      const response = await http.put('/companies', req);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      throw error;
    }
  },
  async delete(id) {
    try {
      const response = await http.delete(`/companies/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      throw error;
    }
  },
  async updateKanban(id, req) {
    try {
      const response = await http.put(`/companies/kanban-status/${id}?novoSlug=`, req);
      return response;
    } catch (error) {
      console.error('Erro ao atualizar kanban de empresas:', error);
      throw error;
    }
  }
}

export default CompanyService
