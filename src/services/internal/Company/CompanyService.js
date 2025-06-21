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
}
