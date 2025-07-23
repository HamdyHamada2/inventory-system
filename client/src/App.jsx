import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ProductDetails from './pages/ProductDetails';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* صفحة تسجيل الدخول */}
          <Route path="/login" element={<Login />} />

          {/* الصفحة الرئيسية → داشبورد */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* صفحة عرض كل المنتجات */}
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Layout>
                  <Products />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* إضافة منتج */}
          <Route
            path="/add-product"
            element={
              <ProtectedRoute>
                <Layout>
                  <AddProduct />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* تعديل منتج */}
          <Route
            path="/edit-product/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <EditProduct />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* تفاصيل منتج */}
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <ProductDetails />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* أي مسار غير معروف → يرجعه لـ login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
