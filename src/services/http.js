import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL });

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ContentType = 'application/json';
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const customError = {
      status: error.response?.status,
      data: error.response?.data || null,
    };

    // Se quiser redirecionar em caso de 401:
    // if (customError.status === 401) {
    //   window.location = '/auth';
    // }

    return Promise.reject(customError); // retorna só o necessário
  }
);


export default http;
