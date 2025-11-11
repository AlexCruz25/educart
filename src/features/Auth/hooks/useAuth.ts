import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, RegisterPayload } from "../types/types";
import { api } from "../../../lib/axiosInstance";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post("/auth/login", payload);
      localStorage.setItem("token", data.access_token);
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await api.post("/auth/register", payload);
      return data;
    },
  });
};