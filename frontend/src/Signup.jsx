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
    
    // 前端第一層阻擋：如果長度不夠，根本不發送請求
    if (formData.password.length < 6) {
      alert('密碼長度需至少為 6 個字元');
      return;
    }
    // 呼叫註冊 API
    try {
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
        <label>姓名</label>
        <input
          type="text"
          name="name"
          placeholder="請輸入名字 (至少 3 個字)"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="請輸入 Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>密碼</label>
        <input
          type="password"
          name="password"
          placeholder="請輸入密碼 (至少 6 個字)"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        {/* 動態提示文字 */}
        <div style={{ textAlign: 'left', marginTop: '-10px', marginBottom: '15px' }}>
          <small style={{ 
            color: formData.password.length > 0 && formData.password.length < 6 ? '#ff4d4f' : '#8c8c8c',
            fontSize: '0.85rem',
            transition: 'color 0.3s ease'
          }}>
            {formData.password.length > 0 && formData.password.length < 6 
              ? '密碼太短了 (目前: ' + formData.password.length + ' 字)' 
              : '* 密碼長度需至少為 6 個字元'}
          </small>
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          確認註冊
        </button>
      </form>
    </div>
  );
}

export default Signup;