import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  // 資料建立者 (關聯至 User 模型)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // 標題(ex.午餐、捷運...)
  title: {
    type: String,
    required: [true, '請輸入標題'],
    trim: true
  },
  // 金額
  amount: {
    type: Number,
    required: [true, '請輸入金額'],
  },
  // 類型 (預設為支出)
  type: {
    type: String,
    enum: ['expense', 'income'], 
    default: 'expense'
  },
  // 日期 (預設當下時間)
  date: {
    type: Date,
    default: Date.now
  },
  // 分類 (ex.飲食、交通...)
  category: {
    type: String,
    default: '其他'
  }
}, {
  timestamps: true // 自動建立 createdAt 和 updatedAt
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;