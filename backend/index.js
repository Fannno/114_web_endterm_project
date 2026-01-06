import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import signupRouter from './routes/auth.js';
import expenseRoutes from './routes/expenses.js';

const app = express();
// 定義允許的來源清單
const allowedOrigins = [
  process.env.ALLOWED_ORIGIN, // 雲端 GitHub Pages 網址
  'http://localhost:5173',    // 本地 Vite 預設網址
  'http://localhost:5500'     // 本地後端預防萬一
];

app.use(cors({
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求 (例如 Postman) 或是在清單內的來源
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked by server settings'));
    }
  },
  credentials: true
}));
app.use(express.json());

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

app.use('/api/auth', signupRouter);
app.use('/api/expenses', expenseRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

const port = process.env.PORT || 5500;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect MongoDB', error);
    process.exit(1);
  });