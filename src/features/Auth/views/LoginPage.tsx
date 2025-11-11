// import { useAppDispatch } from "@/store/hooks";
import { api } from "../../../lib/axiosInstance";
import { useAppDispatch } from "../../../store/hook";
import { loginSuccess } from "../redux/authSlice";
// import { api } from "@/lib/axiosInstance";
import { useState } from "react";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { username, password });
      dispatch(loginSuccess({ token: data.access_token, username }));
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">Iniciar sesión</h1>

      {error && <p className="text-red-500">{error}</p>}

      <input
        className="w-full border rounded p-2 mb-3"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        className="w-full border rounded p-2 mb-3"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
      >
        Entrar
      </button>
    </form>
  );
}
