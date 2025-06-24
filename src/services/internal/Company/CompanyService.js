import http from '@/services/http';

export default class CompanyService {
  async getAll(id) {
    try {
      const response = await http.get(`/companies/list/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao obter empresas:', error);
      throw error;
    }
  }

  async getCompanyById(id) {
    try {
      const response = await http.get(`/companies/${id}`);
      return response;
    } catch (error) {
      console.error('Erro ao obter empresa por ID:', error);
      throw error;
    }
  }

  async updateStatus(id, status) {
    try {
      const response = await http.put(`/kanban-status/${id}`, { status });
      return response;
    } catch (error) {
      console.error('Erro ao atualizar status da empresa:', error);
      throw error;
    }
  }
}
