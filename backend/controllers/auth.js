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

// 處理登入邏輯
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 檢查是否填寫
        if (!email || !password) {
            return res.status(400).json({ message: '請輸入 Email 和密碼' });
        }

        // 根據 Email 找使用者
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: '找不到此使用者' });
        }

        // 驗證密碼 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: '密碼錯誤' });
        }

        // 驗證通過 -> 發放 JWT 通行證
        const token = jwt.sign(
            { id: user._id, name: user.name }, 
            process.env.JWT_SECRET,            
            { expiresIn: '1d' }                
        );

        res.status(200).json({ 
            message: '登入成功！', 
            token, 
            user: { name: user.name, email: user.email } 
        });

    } catch (error) {
        console.error('登入錯誤:', error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
};