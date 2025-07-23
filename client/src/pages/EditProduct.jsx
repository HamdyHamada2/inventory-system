import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    barcode: '',
    category: '',
    price: '',
    quantity: '',
    min_quantity_alert: 5,
    image: null,
  });

  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/products/${id}/`)
      .then(res => {
        const data = res.data;
        setFormData({
          name: data.name,
          barcode: data.barcode,
          category: data.category,
          price: data.price,
          quantity: data.quantity,
          min_quantity_alert: data.min_quantity_alert || 5,
          image: null, // فقط عند رفع صورة جديدة
        });
      })
      .catch(err => {
        console.error('❌ Fetch product error:', err.response?.data || err.message);
        setError('فشل في تحميل بيانات المنتج');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      // تجاهل حقل الصورة لو مش موجودة
      if (key === 'image' && formData[key] === null) continue;
      data.append(key, formData[key]);
    }

    try {
      await api.put(`/products/${id}/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/products');
    } catch (err) {
      console.error('❌ Update product error:', err.response?.data || err.message);
      setError('فشل في تعديل المنتج');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">تعديل المنتج</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="اسم المنتج"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="barcode"
          placeholder="الباركود"
          value={formData.barcode}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="الفئة"
          value={formData.category}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="الكمية"
          value={formData.quantity}
          onChange={handleChange}
          className="p-2 border rounded w-full"
          required
        />
        <input
          type="number"
          name="min_quantity_alert"
          placeholder="حد التنبيه الأدنى"
          value={formData.min_quantity_alert}
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
