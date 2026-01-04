import Expense from '../models/Expense.js';

// 新增記帳
export const addExpense = async (req, res) => {
    try {
        const { title, amount, type, date, category } = req.body;

        // 建立新資料 (user ID 從登入驗證的中介軟體 req.user 拿)
        const expense = new Expense({
            user: req.user.id, 
            title,
            amount,
            type,
            date,
            category
        });

        await expense.save();
        res.status(201).json({ message: '記帳成功！', expense });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '伺服器錯誤' });
    }
};

// 取得該使用者的所有帳目
export const getExpenses = async (req, res) => {
    try {
        // 根據使用者 ID 查詢帳目
        const expenses = await Expense.find({ user: req.user.id })
                                      .sort({ date: -1 }); 
        
        res.status(200).json(expenses);

    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
};

// 刪除帳目
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        
        // 根據 ID 和使用者 ID 刪除帳目，確保只能刪除自己的資料
        const expense = await Expense.findOneAndDelete({ _id: id, user: req.user.id });
        
        if (!expense) {
            return res.status(404).json({ message: '找不到此資料或無權限' });
        }

        res.status(200).json({ message: '刪除成功' });
    } catch (error) {
        res.status(500).json({ message: '伺服器錯誤' });
    }
};