import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../../lib/axiosInstance";

interface AuthState {
  token: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  username: localStorage.getItem("user"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<{ token: string; username: string }>) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;

      // Persistimos en localStorage y axios
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.username);
      api.defaults.headers.common.Authorization = `Bearer ${action.payload.token}`;
    },

    logout(state) {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common.Authorization;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
