import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">📦 المخزون</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/products" className="text-gray-700 hover:text-blue-600">المنتجات</Link>
          <Link to="/add-product" className="text-gray-700 hover:text-blue-600">إضافة منتج</Link>
          <button onClick={handleLogout} className="text-red-600 hover:underline text-left">
            تسجيل الخروج
          </button>
        </nav>
      </aside>

      {/* ✅ Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
