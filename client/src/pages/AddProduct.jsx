import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      await api.post('/products/', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/products');
    } catch (err) {
      console.error(err);
      setError('فشل في إضافة المنتج');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">إضافة منتج جديد</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow rounded" encType="multipart/form-data">
        <input name="name" placeholder="اسم المنتج" value={formData.name} onChange={handleChange} required className="input" />
        <input name="barcode" placeholder="الباركود" value={formData.barcode} onChange={handleChange} required className="input" />
        <input name="category" placeholder="الفئة" value={formData.category} onChange={handleChange} required className="input" />
        <input name="price" type="number" placeholder="السعر" value={formData.price} onChange={handleChange} required className="input" />
        <input name="quantity" type="number" placeholder="الكمية" value={formData.quantity} onChange={handleChange} required className="input" />
        <input name="min_quantity_alert" type="number" placeholder="حد التنبيه الأدنى" value={formData.min_quantity_alert} onChange={handleChange} className="input" />
        <input name="image" type="file" accept="image/*" onChange={handleChange} className="input" />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">حفظ المنتج</button>
      </form>
    </div>
  );
};

export default AddProduct;
