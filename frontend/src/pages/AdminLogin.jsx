import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import Footer from '../components/Footer';
import colors from '../utils/colors';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      
      let token = null;
      let user = null;

      if (response?.data?.token && response?.data?.user) {
        token = response.data.token;
        user = response.data.user;
      } else if (response?.token && response?.user) {
        token = response.token;
        user = response.user;
      }

      if (token && user && user.role === 'admin') {
        login(user, token);
        navigate('/admin-dashboard');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main style={{ padding: '50px', minHeight: '80vh', backgroundColor: colors.background }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: colors.white, padding: '30px', borderRadius: '8px' }}>
          <h2 style={{ color: colors.primary, textAlign: 'center' }}>Admin Login</h2>
          <p style={{ textAlign: 'center', color: colors.lightText, marginBottom: '20px' }}>Default: admin@healnow.com / Admin@123</p>
          
          {error && <div style={{ backgroundColor: colors.error, color: colors.white, padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: `1px solid ${colors.border}`, borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: colors.text }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: `1px solid ${colors.border}`, borderRadius: '5px', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: '5px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px'
              }}
            >
              {loading ? 'Logging in...' : 'Admin Login'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;