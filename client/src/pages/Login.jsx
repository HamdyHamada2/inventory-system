import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/token/", {
        username,
        password,
      });
      console.log("✅ Login success:", response.data);
      login(response.data.access);
      navigate("/products");
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      setError("البيانات غير صحيحة");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="space-y-4">
        <h1 className="text-xl font-bold">تسجيل الدخول</h1>
        <input
          type="text"
          placeholder="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-800 w-full"
        />
        {error && <p className="text-red-400">{error}</p>}
        <button type="submit" className="bg-white text-black px-4 py-2 rounded">
          دخول
        </button>
      </form>
    </div>
  );
};

export default Login;
