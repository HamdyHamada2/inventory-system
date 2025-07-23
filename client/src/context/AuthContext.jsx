import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // لما يفتح الموقع يتأكد هل فيه توكن محفوظ
    const savedToken = localStorage.getItem("access");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = (accessToken) => {
    console.log("✅ Saving token:", accessToken);
    localStorage.setItem("access", accessToken);
    // لما يسجل دخول يحفظ التوكن في الحالة
    setToken(accessToken);
  };

  const logout = () => {
    localStorage.removeItem("access");
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
