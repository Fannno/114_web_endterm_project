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
userSchema.pre('save', async function(next) {
  // 只有在密碼被修改時才加密
  if (!this.isModified('password')) return next();
  
  try {
    // 加密密碼
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model('User', userSchema);

export default User;