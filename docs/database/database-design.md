# CoinKeep 資料庫設計

## 資料表總覽

| 資料表 | 中文名稱 | 用途 |
|---|---|---|
| Users | 使用者主檔 | 儲存使用者帳號與登入資料 |
| Wallets | 錢包主檔 | 儲存使用者管理的現金、銀行存款與電子錢包等資金來源 |

---

## Users（使用者主檔）

### 用途

儲存使用者帳號與登入相關資料。

### 欄位設計

| 欄位 | 型別 | PK/FK | Null | Default | 說明 |
|---|---|---|---|---|---|
| UserId | INT | PK | NO | IDENTITY | 使用者編號 |
| UserName | NVARCHAR(50) |  | NO |  | 使用者名稱 |
| Email | NVARCHAR(100) | UNIQUE | NO |  | 登入電子郵件 |
| PasswordHash | NVARCHAR(500) |  | NO |  | 密碼雜湊值 |
| CreatedAt | DATETIME |  | NO | GETDATE() | 建立時間 |

### 設計說明

- Email 作為登入識別，因此設定唯一索引。
- UserName 僅作為顯示名稱，因此允許重複。
- 密碼僅保存雜湊值，不保存原始密碼。

---

## Wallets（錢包主檔）

### 用途

儲存使用者的現金、銀行存款與電子錢包等資產資料。

### 欄位設計

| 欄位 | 型別 | PK/FK | Null | Default | 說明 |
|---|---|---|---|---|---|
| WalletId | INT | PK | NO | IDENTITY | 資產編號 |
| UserId | INT | FK → Users.UserId | NO |  | 所屬使用者 |
| WalletName | NVARCHAR(50) |  | NO |  | 資產名稱 |
| WalletType | NVARCHAR(20) |  | NO |  | 資產類型 |
| InitialBalance | DECIMAL(18,2) |  | NO | 0 | 初始金額 |
| IsActive | BIT |  | NO | 1 | 是否啟用 |
| CreatedAt | DATETIME |  | NO | GETDATE() | 建立時間 |

### 關聯

Users 1 : N Wallets

### 設計說明

- Wallet 僅保存 InitialBalance。
- 實際餘額後續由交易紀錄計算。
- IsActive 用來停用資產，避免直接刪除已有交易紀錄的 Wallet。