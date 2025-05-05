import axios from "axios";
import { useRoute } from "vue-router";

const api = axios.create({baseURL: import.meta.env.VITE_API_URL});
const route = useRoute();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
      config.headers.Authorization = `Bearer ${token}`
      config.headers.ContentType = 'application/json'
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 401 && route.fullPath !== '/') {
      window.location = '/'
  }
})

export default api;
