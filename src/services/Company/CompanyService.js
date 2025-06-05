import api from '@/services/api';

export default class AuthService {
  async getInfoCompany(req) {
    try {
        console.log('oi');
        
    //   const response = await api.post('/login/', req);
    //   return response;
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      throw error;
    }
  }
}
