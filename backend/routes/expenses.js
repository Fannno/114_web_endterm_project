import express from 'express';
import { addExpense, getExpenses, deleteExpense } from '../controllers/expense.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// 設定路徑：全部都要經過 verifyToken (登入驗證)
router.post('/', verifyToken, addExpense);       // 新增
router.get('/', verifyToken, getExpenses);       // 查詢
// 使用 PATCH 修改支出
router.patch('/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // $set 會確保只更新傳入的欄位
      { new: true, runValidators: true }
    );
    
    if (!updatedExpense) return res.status(404).json({ message: '找不到該筆資料' });
    res.json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: '修改失敗', error });
  }
});
router.delete('/:id', verifyToken, deleteExpense); // 刪除

export default router;