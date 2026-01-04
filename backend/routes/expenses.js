import express from 'express';
import { addExpense, getExpenses, deleteExpense } from '../controllers/expense.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// 設定路徑：全部都要經過 verifyToken (登入驗證)
router.post('/', verifyToken, addExpense);       // 新增
router.get('/', verifyToken, getExpenses);       // 查詢
router.delete('/:id', verifyToken, deleteExpense); // 刪除

export default router;