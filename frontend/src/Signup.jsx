import { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:5500/api/auth/signup', formData);
      alert('註冊成功！歡迎 ' + response.data.user.name);
    } catch (error) {
      console.error(error);
      alert('註冊失敗：' + (error.response?.data?.message || '伺服器錯誤'));
    }
  };

  return (
    <div className="card">
      <h2>會員註冊</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '300px', margin: '0 auto' }}>
        <input
          type="text"
          name="name"
          placeholder="請輸入名字"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="請輸入 Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="請輸入密碼"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>送出註冊</button>
      </form>
    </div>
  );
}

export default Signup;