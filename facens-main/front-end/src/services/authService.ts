/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";

export const authService = {
  async registerUser(data: any) {
    return await api.post("/register", data);
  },

  async loginUser(data: any) {
    return await api.post("/login", data);
  },
};
