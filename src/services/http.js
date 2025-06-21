import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  // (error) => {
  //   if (error.response && error.response.status === 401) {
  //     window.location = '/auth';
  //   }
  //   return Promise.reject(error);
  // }
);

export default api;
