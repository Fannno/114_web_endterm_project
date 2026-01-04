import User from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// 處理註冊邏輯
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 檢查資料是否完整
        if (!name || !email || !password) {
            return res.status(400).json({ message: '請填寫所有欄位！' });
        }

        // 檢查 Email 是否已被註冊
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: '這個 Email 已經註冊過了' });
        }
        // 密碼加密
        const hashedPassword = await bcrypt.hash(password, 10);

        // 建立新使用者
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // 存入資料庫
        await newUser.save();

        res.status(201).json({ message: '註冊成功！', user: { name, email } });

    } catch (error) {
        console.error('註冊錯誤:', error);
        res.status(500).json({ message: '伺服器發生錯誤，請稍後再試' });
    }
};