// import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { api } from "../../../lib/axiosInstance";
import { useAppDispatch } from "../../../store/hook";
import { loginSuccess } from "../redux/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname ?? "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { username, password });
      dispatch(loginSuccess({ token: data.access_token, username }));
      navigate(from, { replace: true });
    } catch (err: any) {
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setError(detail ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/demo-login");
      dispatch(loginSuccess({ token: data.access_token, username: "demo_user" }));
      navigate("/products");
    } catch (err) {
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setError(detail ?? "Demo login failed");
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="max-w-sm w-full p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Iniciar sesión</h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center" role="alert">
            {error}
          </p>
        )}

        <label className="block text-sm font-medium text-gray-700">Usuario</label>
        <input
          className="w-full border rounded p-2 mb-3"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          className="w-full border rounded p-2 mb-4"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={demoLoading}
          className="w-full mt-3 border border-indigo-600 text-indigo-600 py-2 rounded hover:bg-indigo-50 disabled:opacity-60"
        >
          {demoLoading ? "Cargando demo..." : "Ingresar en modo demo"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-indigo-600 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </section>
  );
}
