// api.js
import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

// Interceptor de requisição
api.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/auth")) {
      const token = Cookies.get("token"); // pega token do cookie
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized - Token may be invalid or expired");
      // Aqui você pode redirecionar o usuário para login, por exemplo
    }
    return Promise.reject(error);
  }
);

export default api;
