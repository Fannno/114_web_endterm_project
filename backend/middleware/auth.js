import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // 從請求標頭取得 Token
    const token = req.header('Authorization');

    // 若沒有提供 Token
    if (!token) return res.status(401).json({ message: '拒絕存取，請先登入' });

    try {
        // 去除 Bearer 前綴字串
        const tokenString = token.startsWith('Bearer ') ? token.slice(7) : token;

        const verified = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        // 將使用者資訊附加到請求物件上，供後續中介軟體或路由使用
        req.user = verified;
        next(); 

    } catch (error) {
        res.status(400).json({ message: '無效的 Token' });
    }
};