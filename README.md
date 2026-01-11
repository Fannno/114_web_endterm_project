# 114_web_endterm_project
## <img src="./frontend/public/my-logo.png" width="40" height="40" style="vertical-align: middle;"> CoinKeep - 記帳系統

CoinKeep 是一個基於 MERN Stack 開發的響應式記帳應用程式，旨在幫助使用者輕鬆管理個人財務，並提供直觀的數據統計與視覺化體驗。

## 專案特色
- **安全驗證**：採用 JWT (JSON Web Token) 認證與 Bcrypt 密碼雜湊加密。
- **互動體驗**：註冊頁面內建即時密碼強度偵測與格式檢查，提供友善的使用者錯誤回饋 (UX)。
- **數據分析**：自動計算本月總收入、總支出與目前資產餘額。
- **智慧排序**：帳目自動按日期分組，並由新到舊排序顯示。
- **響應式設計**：完美支援手機與桌機瀏覽，具備流暢的操作體驗。

## 使用技術
- **Frontend**: React.js, Axios, CSS3 (Flexbox/Grid), Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT, Bcryptjs
- **Deployment**: Render (Backend), GitHub Pages (Frontend)
  
|維度|實作技術|目標|
| :--- | :--- | :--- |
|資料安全|Bcrypt (Salted Hash)|防止密碼明文外洩|
|表單驗證|Regex & Real-time Validation|前端即時攔截格式錯誤與弱密碼|
|身份認證|JWT (Stateless Auth)|安全且高效的 API 存取控管|
|前端架構|Component-Based (React)|提升 UI 複用性與渲染效能|
|後端架構|Middleware Pattern|實現邏輯解耦與安全性檢查|

## 技術核心與設計實踐
### 1. 登入與權限管理 (Auth & Authorization)
- 安全儲存：後端實作 Bcrypt 對使用者密碼進行 Salt 雜湊處理，確保資料庫遭洩漏時密碼依然安全。
- 強度檢測：前端實作 Regex 邏輯，即時計算密碼複雜度（弱/中/強）並強制要求 8 碼以上含英數組合。
- 權限控管：採用 JWT (JSON Web Token) 機制。登入成功後，Token 會存於前端 Local Storage，後續請求皆須通過後端自定義的 verifyToken 中介軟體進行身份驗證。

### 2. 設計模式應用 (Design Patterns)
- Observer Pattern (觀察者模式 - 前端)：
  - 應用場景：全站使用者登入狀態管理。
  - 實現方式：利用 React 的 State (useState) 機制，當 App.jsx 中的 user 狀態變更時，自動驅動 Login、Signup 與 Dashboard 組件進行視圖切換與重新渲染。

- Middleware Pattern (中介軟體模式 - 後端)：
  - 應用場景：API 安全保護。
  - 實現方式：將「JWT 驗證」抽離成獨立的 Middleware，並在 routes 層進行掛載。這實現了職責分離，確保帳目 CRUD 邏輯不會與驗證邏輯耦合。

- Singleton Pattern (單例模式 - 資料庫)：
  - 應用場景：MongoDB 資料庫連線。
  - 實現方式：後端程式碼確保資料庫連線在伺服器啟動時僅被建立一次，並在整個應用生命週期中重複使用該連線實例。
  
---

## 系統開發文件

### 1. 系統架構圖 (System Architecture)
- 展示本專案之 MERN 前後端分離架構與資料庫整合流向。
![系統架構圖](./docs/architecture.jpg)

### 2. 運作流程圖 (System Flowchart)
- 展示使用者從身份驗證到儀表板統計邏輯的完整流程。
![系統流程圖](./docs/flowchart.jpg)

---

## API 規格說明

| 方法 | 路徑 | 說明 | 需要驗證 |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/signup` | 使用者註冊 | 否 |
| POST | `/api/auth/login` | 使用者登入 (核發 Token) | 否 |
| GET | `/api/expenses` | 取得當前使用者所有帳目 | 是 (JWT) |
| POST | `/api/expenses` | 新增一筆帳目紀錄 | 是 (JWT) |
| PATCH |`/api/expenses/:id`|修改指定帳目紀錄|是 (JWT)|
| DELETE | `/api/expenses/:id` | 刪除指定帳目 | 是 (JWT) |

---

## 安裝與執行步驟

### 環境需求
- Node.js v16+
- npm
- MongoDB（可使用 MongoDB Atlas）
  
### 必要環境變數
請在 `backend` 資料夾建立 `.env`
```env
# Backend (.env)
MONGO_URI=mongodb+srv://<db_user>:<db_password>@cluster0.mongodb.net/CoinKeep?retryWrites=true&w=majority
JWT_SECRET=your_strong_jwt_secret_here
PORT=5500
# ALLOWED_ORIGIN 設定建議：
ALLOWED_ORIGIN=http://localhost:5173
```

前端 `frontend/.env` 設定：
```env
# Frontend (.env)
# 如果要在本地測試完整的前後端連線，請指向本地後端：
VITE_API_URL=http://localhost:5500

# 若只想測試前端介面，可指向已部署的 Render 後端：
# VITE_API_URL=https://coinkeep-backend.onrender.com
```

### 1. 啟動後端 (Backend)
```Bash
cd backend
npm install
# 建立 .env，填入上方範例變數
npm run dev
```
### 2. 啟動前端 (Frontend)
```Bash
cd frontend
npm install
npm run dev
```
## 使用指引與演示
1. 註冊與登入：系統具備密碼強度偵測，建議測試使用包含英數的8碼密碼進行註冊，觀察強度條變化。登入後 Token 將安全存入 localStorage。
2. 記帳操作：在儀表板輸入標題、金額與日期，系統將即時更新總餘額。
3. 數據管理：使用者可隨時修改或刪除錯誤的帳目，系統會重新計算統計數據。

### Demo 影片連結：[點擊此處觀看演示影片 (Google Drive)](https://drive.google.com/file/d/17bzkL9ppAVmQDvn_4-BXDimSwBXNRTCI/view?usp=sharing)
### 線上部署網站：[點擊前往 CoinKeep 記帳系統](https://fannno.github.io/114_web_endterm_project/)