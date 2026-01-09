import { useState, useEffect, useCallback } from 'react';
import api from './api';
import './App.css';

function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: '', amount: '', type: 'expense',
    date: new Date().toISOString().split('T')[0]
  });

  // 使用 api instance；在每次請求時從 localStorage 重新取得 token
  const fetchExpenses = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await api.get('/expenses', config);
      setExpenses(res.data);
    } catch (err) {
      console.error('資料載入失敗:', err);
    }
  }, []);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // --- 高效邏輯計算區 (效能最佳化) ---
  const stats = { total: 0, mInc: 0, mExp: 0, grouped: {} };
  const now = new Date();

  expenses.forEach(item => {
    const amt = Number(item.amount);
    const isInc = item.type === 'income';
    const itemDate = new Date(item.date);
    
    // 1. 計算總餘額
    stats.total += isInc ? amt : -amt;

    // 2. 計算本月統計
    if (itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear()) {
      isInc ? (stats.mInc += amt) : (stats.mExp += amt);
    }

    // 3. 處理日期分組
    const dateStr = itemDate.toLocaleDateString();
    if (!stats.grouped[dateStr]) stats.grouped[dateStr] = [];
    stats.grouped[dateStr].push(item);
  });

  // 排序日期 (由新到舊)
  const sortedDates = Object.keys(stats.grouped).sort((a, b) => new Date(b) - new Date(a));

  // --- 事件處理邏輯 ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post('/expenses', formData, config);
      alert('記帳成功！');
      // 重置表單為預設值
      setFormData({
        title: '', amount: '', type: 'expense',
        date: new Date().toISOString().split('T')[0]
      });
      fetchExpenses();
    } catch (err) {
      alert('新增失敗，請檢查網路或重新登入');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('確定要刪除這筆紀錄嗎？')) return;
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.delete(`/expenses/${id}`, config);
      fetchExpenses();
    } catch (err) {
      alert('刪除失敗');
    }
  };

  const handleEdit = async (item) => {
    // 編輯流程：標題與金額
    const newTitle = window.prompt('編輯標題', item.title);
    if (newTitle === null) return; // 使用者取消
    const newAmountStr = window.prompt('編輯金額', item.amount);
    if (newAmountStr === null) return;
    const newAmount = Number(newAmountStr);
    if (Number.isNaN(newAmount)) {
      alert('金額格式錯誤');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.patch(`/expenses/${item._id}`, { title: newTitle, amount: newAmount }, config);
      fetchExpenses();
    } catch (err) {
      console.error('更新失敗:', err);
      alert('更新失敗');
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* 資產總覽卡片 */}
      <div className="balance-card" style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src="my-logo.png" 
          alt="Logo" 
          style={{ 
            position: 'absolute', 
            right: '20px', 
            top: '20px', 
            width: '60px', 
            borderRadius: '15px'
          }} 
        />
        <h3>目前餘額</h3>
        <h1>$ {stats.total.toLocaleString()}</h1>
        <p>記帳人：{user?.name || '使用者'}</p>
      </div>

      {/* 本月統計網格 */}
      <div className="stats-grid">
        <div className="card">
          <small className="text-muted">本月收入</small>
          <h2 className="text-green">+${stats.mInc.toLocaleString()}</h2>
        </div>
        <div className="card">
          <small className="text-muted">本月支出</small>
          <h2 className="text-red">-${stats.mExp.toLocaleString()}</h2>
        </div>
      </div>

      {/* 新增項目表單 */}
      <div className="card">
        <h3>新增帳目</h3>
        <form onSubmit={handleSubmit} className="dashboard-form">
          <input 
            type="text" 
            placeholder="項目 (如: 午餐)" 
            value={formData.title} 
            onChange={e => setFormData({...formData, title: e.target.value})} 
            required 
          />
          <input 
            type="number" 
            placeholder="金額" 
            value={formData.amount} 
            onChange={e => setFormData({...formData, amount: e.target.value})} 
            required 
          />
          <div className="form-full">
            <select style={{ flex: 1 }} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="expense">支出</option>
              <option value="income">收入</option>
            </select>
            <input 
              style={{ flex: 2 }} 
              type="date" 
              value={formData.date} 
              onChange={e => setFormData({...formData, date: e.target.value})} 
            />
            <button type="submit" className="btn-primary" style={{ flex: 1 }}>新增</button>
          </div>
        </form>
      </div>

      {/* 歷史清單列表 */}
      {sortedDates.map(date => (
        <div key={date} className="date-group">
          <span className="date-label">{date}</span>
          {stats.grouped[date].map(item => (
            <div key={item._id} className="expense-item">
              <div className="expense-info">
                <h4>{item.title}</h4>
              </div>
              <div className="expense-actions">
                <span className={item.type === 'income' ? 'text-green' : 'text-red'}>
                  {item.type === 'income' ? '+' : '-'}${item.amount.toLocaleString()}
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                  <button className="del-btn" onClick={() => handleDelete(item._id)}>刪除</button>
                  <button className="edit-btn" onClick={() => handleEdit(item)}>編輯</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;