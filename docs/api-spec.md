# CoinKeep API 規格文件

## 使用者認證 (Auth)
- **POST /api/auth/signup**
  - 描述：註冊新使用者，密碼經 Bcrypt 加密儲存。
- **POST /api/auth/login**
  - 描述：驗證身份並回傳 JWT Token。

## 記帳管理 (Expenses)
- **GET /api/expenses**
  - 描述：取得該登入使用者的所有帳目（依日期排序）。
  - Header: `Authorization: Bearer <token>`
- **POST /api/expenses**
  - 描述：新增一筆帳目（包含標題、金額、類型、日期）。
- **DELETE /api/expenses/:id**
  - 描述：刪除指定 ID 的帳目。