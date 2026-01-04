import { useState, useEffect } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true); // 控制顯示登入或註冊表單

  // 檢查 localStorage 有沒有存過的使用者資料
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 登出功能
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('已登出');
  };

  return (
    <div className="container">
      <h1>CoinKeep</h1>
      <p className="subtitle">錢錢沒有不見，只是變成了你喜歡的樣子</p>
      
      {user ? (
        // --- 登入後的畫面 ---
        <div className="card">
          <h2>歡迎回來，{user.name}！</h2>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ color: '#6b7280' }}>帳號：{user.email}</p>
          </div>
          <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>（儀表板功能即將上線）</p>
          <button className="btn-danger" onClick={handleLogout}>
            登出系統
          </button>
        </div>
      ) : (
        // --- 未登入的畫面 ---
        <>
          {/* 切換按鈕區塊 */}
          <div className="tab-group">
            <button 
              className={`tab-btn ${showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(true)}
            >
              登入
            </button>
            <button 
              className={`tab-btn ${!showLogin ? 'active' : ''}`}
              onClick={() => setShowLogin(false)}
            >
              註冊
            </button>
          </div>
          
          {/* 顯示對應的表單 */}
          {showLogin ? (
            <Login onLogin={(userData) => setUser(userData)} />
          ) : (
            <Signup />
          )}
        </>
      )}
    </div>
  );
}

export default App;