import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: '請輸入有效的 Email 格式'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, {
  timestamps: true, // 自動建立 createdAt 和 updatedAt 時間戳記
});

// 密碼加密中介軟體
userSchema.pre('save', async function() {
  // 只有在密碼被修改時才處理
  if (!this.isModified('password')) return;
  
  // 直接處理加密，async 函式會自動處理 Promise
  // 不需要手動呼叫 next()，這能避免在驗證失敗時發生 next 衝突
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;