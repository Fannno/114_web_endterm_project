import express from 'express';
import { signup } from '../controllers/auth.js'; 

const router = express.Router();

// 定義註冊路徑：POST /signup
router.post('/signup', signup);

export default router;