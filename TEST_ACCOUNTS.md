# 🔐 Test Accounts

## Accounts đã được tạo trong database

### 👑 Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: `admin`
- **Quyền**: 
  - ✅ Truy cập Admin Dashboard
  - ✅ CRUD Products
  - ✅ CRUD Categories
  - ✅ Tất cả quyền của User

### 👤 User Account
- **Email**: `user@example.com`
- **Password**: `user123`
- **Role**: `user`
- **Quyền**:
  - ✅ Xem Products
  - ✅ Search & Filter
  - ✅ Xem Categories
  - ❌ Không thể truy cập Admin Dashboard

---

## 📦 Dữ liệu mẫu đã tạo

### Categories (5)
1. Electronics
2. Clothing
3. Books
4. Home & Garden
5. Sports

### Products (10)
- Laptop Dell XPS 15
- iPhone 15 Pro
- Wireless Headphones
- Cotton T-Shirt
- Jeans Classic Fit
- The Great Gatsby
- JavaScript: The Definitive Guide
- Garden Tool Set
- Yoga Mat
- Running Shoes

---

## 🧪 Cách test

### 1. Test với Admin
```
URL: http://localhost:3000/login
Email: admin@example.com
Password: admin123
```

Sau khi login:
- Truy cập: http://localhost:3000/admin
- Test CRUD products và categories

### 2. Test với User
```
URL: http://localhost:3000/login
Email: user@example.com
Password: user123
```

Sau khi login:
- Chỉ có thể xem products
- Không thể truy cập /admin

### 3. Test Register mới
- Truy cập: http://localhost:3000/register
- Tạo account mới (mặc định là role: user)

---

## 🔄 Reset dữ liệu

Nếu muốn reset và seed lại:

```bash
cd backend
npm run seed
```

⚠️ Lưu ý: Script sẽ xóa tất cả dữ liệu cũ và tạo lại từ đầu.

---

## 📝 Lưu ý

- Passwords đã được hash bằng bcrypt
- JWT tokens sẽ được tạo khi login
- Tokens expire sau 7 ngày (có thể config trong `.env`)

