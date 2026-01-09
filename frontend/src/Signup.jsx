import { useState } from 'react';
import api from './api';
import './App.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // 清除該欄位錯誤以提供即時回饋
    setErrors(prev => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const validateAll = () => {
    const newErrors = {};
    // 姓名
    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = '請輸入姓名';
    }
    // Email
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = '請輸入Email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = 'Email格式不正確';
    }
    // 密碼
    if (!formData.password) {
      newErrors.password = '請輸入密碼';
    } else {
      if (formData.password.length < 8) newErrors.password = '密碼需至少8碼';
      else {
        const pwRegex = /(?=.*[A-Za-z])(?=.*\d)/;
        if (!pwRegex.test(formData.password)) newErrors.password = '密碼需包含英文字母與數字';
      }
    }
    // 確認密碼
    if (!formData.confirmPassword || formData.confirmPassword === '') {
      newErrors.confirmPassword = '請確認密碼';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = '兩次密碼不一致';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const newErrors = { ...errors };
    if (name === 'name') {
      if (!value || value.trim() === '') newErrors.name = '請輸入姓名';
      else delete newErrors.name;
    }
    if (name === 'email') {
      if (!value || value.trim() === '') newErrors.email = '請輸入Email';
      else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) newErrors.email = 'Email格式不正確';
        else delete newErrors.email;
      }
    }
    if (name === 'password') {
      if (!value) newErrors.password = '請輸入密碼';
      else if (value.length < 8) newErrors.password = '密碼需至少8碼';
      else {
        const pwRegex = /(?=.*[A-Za-z])(?=.*\d)/;
        if (!pwRegex.test(value)) newErrors.password = '密碼需包含英文字母與數字';
        else delete newErrors.password;
      }
      // 同時檢查確認密碼一致性
      if (formData.confirmPassword && formData.confirmPassword !== value) newErrors.confirmPassword = '兩次密碼不一致';
      else if (formData.confirmPassword) delete newErrors.confirmPassword;
    }
    if (name === 'confirmPassword') {
      if (!value || value === '') newErrors.confirmPassword = '請確認密碼';
      else if (value !== formData.password) newErrors.confirmPassword = '兩次密碼不一致';
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };

  const getPasswordStrength = (pw) => {
    if (!pw) return '';
    const hasUpper = /[A-Z]/.test(pw);
    const hasLower = /[a-z]/.test(pw);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>\[\]\\\/;'`~\-+=_]/.test(pw);
    if (hasUpper && hasLower && pw.length >= 8) {
      return hasSpecial ? '強' : '中';
    }
    return '弱';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateAll();
    if (Object.keys(newErrors).length > 0) return;

    try {
      await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      alert('註冊成功！請切換到登入頁面進行登入。');
    } catch (error) {
      console.error(error);
      alert('註冊失敗：' + (error.response?.data?.message || '伺服器錯誤'));
    }
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColor = strength === '強' ? '#52c41a' : (strength === '中' ? '#fa8c16' : '#ff4d4f');
  const strengthWidth = strength === '強' ? '100%' : (strength === '中' ? '66%' : (strength === '弱' ? '33%' : '0%'));

  return (
    <div className="card">
      <h2>會員註冊</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <label>姓名</label>
        <input
          type="text"
          name="name"
          placeholder="請輸入姓名"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && <small style={{ color: '#ff4d4f' }}>{errors.name}</small>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="請輸入Email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <small style={{ color: '#ff4d4f' }}>{errors.email}</small>}

        <label>密碼</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="password"
            name="password"
            placeholder="請輸入密碼"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ flex: 1 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '64px' }}>
            <div style={{ minWidth: '32px', textAlign: 'center', fontWeight: 600, color: strength ? '#000' : '#8c8c8c' }}>{strength || ''}</div>
            <div style={{ width: '40px', height: '6px', background: '#f0f0f0', borderRadius: '4px' }}>
              <div style={{ width: strengthWidth, height: '100%', background: strengthColor, borderRadius: '4px', transition: 'width 0.15s ease' }} />
            </div>
          </div>
        </div>
        {errors.password && <small style={{ color: '#ff4d4f' }}>{errors.password}</small>}

        <label>確認密碼</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="請再次輸入密碼"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.confirmPassword && <small style={{ color: '#ff4d4f' }}>{errors.confirmPassword}</small>}

        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '12px' }}>
          確認註冊
        </button>
      </form>
    </div>
  );
}

export default Signup;