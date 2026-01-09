import { useState } from 'react';
import api from './api';
import './App.css';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  // 使用 src/api.js 的 axios instance，預設由 Vite 環境變數或 localhost 決定

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除該欄位錯誤
    setErrors(prev => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (name === 'email') {
      if (!value || value.trim() === '') newErrors.email = '請輸入Email';
      else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors.email = 'Email格式不正確';
        else delete newErrors.email;
      }
    }
    if (name === 'password') {
      if (!value || value.trim() === '') newErrors.password = '請輸入密碼';
      else delete newErrors.password;
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 簡單前端檢查 email 格式
    const email = formData.email || '';
    const newErrors = {};
    if (!email.trim()) newErrors.email = '請輸入Email';
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) newErrors.email = 'Email格式不正確';
    }
    // 檢查密碼是否有輸入（不做格式驗證）
    if (!formData.password || formData.password.trim() === '') {
      newErrors.password = '請輸入密碼';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await api.post('/auth/login', formData);
      
      // 取得 Token 和使用者資料
      const { token, user } = response.data;
      
      // 存到 localStorage 
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // 登入成功後，呼叫 onLogin 更新 App 狀態
      onLogin(user);

    } catch (error) {
      console.error(error);
      alert('登入失敗：' + (error.response?.data?.message || '伺服器錯誤'));
    }
  };

  return (
    <div className="card">
      <h2>會員登入</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <small style={{ color: '#ff4d4f' }}>{errors.email}</small>}
        <input
          type="password"
          name="password"
          placeholder="密碼"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <small style={{ color: '#ff4d4f' }}>{errors.password}</small>}
        <button type="submit" className="btn-primary">登入</button>
      </form>
    </div>
  );
}

export default Login;