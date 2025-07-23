import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Products = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProducts = () => {
    api.get('/products/')
      .then(res => setProducts(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          logout();
        }
      });
  };

  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا المنتج؟');
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}/`);
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      alert('فشل في حذف المنتج');
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">قائمة المنتجات</h2>
        <Link to="/add-product" className="bg-green-600 text-white px-4 py-2 rounded">
          إضافة منتج
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="ابحث باسم المنتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6 p-2 border rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white shadow rounded-lg overflow-hidden">
            {p.image && (
              <img
                src={`http://127.0.0.1:8000${p.image}`}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col justify-between h-full">
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <p className="text-gray-700 mb-2">{p.price} جنيه</p>
              <div className="flex justify-between items-center mt-auto text-sm">
                <Link to={`/edit-product/${p.id}`} className="text-blue-600 hover:underline">تعديل</Link>
                <Link to={`/product/${p.id}`} className="text-green-600 hover:underline">تفاصيل</Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;