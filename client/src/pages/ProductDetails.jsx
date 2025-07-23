import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => {
        console.error("❌ Error fetching product details:", err.response?.data || err.message);
        setError('فشل في تحميل بيانات المنتج');
      });
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm('هل أنت متأكد من حذف هذا المنتج؟');
    if (!confirm) return;

    try {
      await api.delete(`/products/${id}/`);
      navigate('/products');
    } catch (err) {
      console.error("❌ Delete error:", err.response?.data || err.message);
      alert('فشل في حذف المنتج');
    }
  };

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!product) return <div className="p-8">جارٍ تحميل البيانات...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-white shadow rounded">
      {product.image && (
        <img
          src={`http://127.0.0.1:8000${product.image}`}
          alt={product.name}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">السعر: {product.price} جنيه</p>
      <p className="text-gray-700 mb-2">الباركود: {product.barcode}</p>
      <p className="text-gray-700 mb-2">الفئة: {product.category}</p>
      <p className="text-gray-700 mb-2">الكمية: {product.quantity}</p>
      <p className="text-gray-700 mb-6">حد التنبيه الأدنى: {product.min_quantity_alert}</p>

      <div className="flex justify-between">
        <Link to={`/edit-product/${product.id}`} className="bg-blue-600 text-white px-4 py-2 rounded">
          تعديل
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          حذف
        </button>
        <Link to="/products" className="bg-gray-400 text-white px-4 py-2 rounded">
          رجوع
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
