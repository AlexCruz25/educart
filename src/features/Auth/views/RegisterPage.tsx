import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { loginSuccess } from "../redux/authSlice";

import { useAppDispatch } from "../../../store/hook";
import { api } from "../../../lib/axiosInstance";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", { username, email, password });

      // Ahora hacemos login automático tras el registro
      const { data } = await api.post("/auth/login", { username, password });
      dispatch(loginSuccess({ token: data.access_token, username }));

      navigate("/"); // Redirigir al home
    } catch (err) {
      const detail =
        err instanceof AxiosError
          ? (err.response?.data as { detail?: string })?.detail
          : null;
      setError(detail ?? "No se pudo registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-6"
      >
        <h1 className="text-2xl font-bold text-indigo-600 mb-4 text-center">
          Crear cuenta
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}    
        <label className="block text-sm font-medium text-gray-700">Nombre de usuario</label>

        <input
          type="text"
          className="w-full border rounded p-2 mb-3"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          className="w-full border rounded p-2 mb-3"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          className={`w-full py-2 rounded text-white font-semibold transition ${
            loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Creando cuenta..." : "Registrarme"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </section>
  );
}
