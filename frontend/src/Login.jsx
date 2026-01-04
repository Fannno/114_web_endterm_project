import { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login({ onLogin }) { // 接收 onLogin 作為 props
  const [formData, setFormData] = useState({
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
      const response = await axios.post('http://localhost:5500/api/auth/login', formData);
      
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
          required
        />
        <input
          type="password"
          name="password"
          placeholder="密碼"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary">登入</button>
      </form>
    </div>
  );
}

export default Login;