import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    lowStock: 0,
    categories: 0,
  });

  useEffect(() => {
    api.get('/products/')
      .then(res => {
        const products = res.data;
        const total = products.length;
        const lowStock = products.filter(p => p.quantity < p.min_quantity_alert).length;
        const categories = new Set(products.map(p => p.category)).size;
        setStats({ total, lowStock, categories });
      })
      .catch(err => {
        if (err.response?.status === 401) logout();
      });
  }, [logout]);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">لوحة التحكم</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">إجمالي المنتجات</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">منتجات منخفضة المخزون</h3>
          <p className="text-2xl">{stats.lowStock}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow">
          <h3 className="text-lg font-semibold">عدد الفئات</h3>
          <p className="text-2xl">{stats.categories}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link to="/products" className="bg-green-600 text-white px-6 py-3 rounded">
          عرض المنتجات
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
