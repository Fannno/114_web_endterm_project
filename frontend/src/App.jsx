import { useState, useEffect } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  // 檢查 localStorage 有沒有存過的使用者資料
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('無法讀取使用者資料:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, []);

  // 登出處理
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    alert('已登出');
  };

  return (
    <div className="container" style={{ maxWidth: user ? '800px' : '400px' }}>
      
      {/* --- 頂部導覽區域 --- */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* 未登入時顯示 Logo */}
      {!user && (
      <img 
        src="/my-logo.png" 
        alt="Logo" 
        style={{ 
          width: '45px', 
          height: '45px'        
        }}/>
      )}
        <h1 style={{ margin: 0, fontSize: user ? '1.5rem' : '2.5rem' }}>
          {user ? `${user?.name || '使用者'} 的帳本` : 'CoinKeep'}
        </h1>
        </div>
        {user && (
          <button onClick={handleLogout} className="logout-btn">
            登出
          </button>
        )}
      </div>

      {!user && <p className="subtitle">月底不吃土，從記帳開始</p>}
      
      {/* --- 主要內容區域 --- */}
      {user ? (
        // 已登入：顯示儀表板
        <Dashboard user={user} />
      ) : (
        // 未登入：顯示登入或註冊切換介面
        <>
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