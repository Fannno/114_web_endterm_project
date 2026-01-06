import { useState } from 'react';
import api from './api';
import './App.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 發送 POST 請求給後端 API
        await api.post('/auth/signup', formData);
      alert('註冊成功！請切換到登入頁面進行登入。');
    } catch (error) {
      console.error(error);
      alert('註冊失敗：' + (error.response?.data?.message || '伺服器錯誤'));
    }
  };

  return (
    <div className="card">
      <h2>會員註冊</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          name="name"
          placeholder="請輸入名字"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="請輸入 Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="請輸入密碼"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">確認註冊</button>
      </form>
    </div>
  );
}

export default Signup;