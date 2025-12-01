# 🚀 BẮT ĐẦU TẠI ĐÂY - Hướng dẫn chạy project

## ⚡ Quick Start (3 bước)

### Bước 1: Chạy Backend

**Mở Terminal/PowerShell 1:**

```powershell
cd backend
npm install
npm run dev
```

✅ Backend chạy tại: **http://localhost:5000**

**Kiểm tra:** Mở browser vào `http://localhost:5000/api/health` → Phải thấy `{"status":"OK"}`

---

### Bước 2: Seed dữ liệu mẫu (Khuyến nghị)

**Trong Terminal backend (Ctrl+C để dừng server, sau đó):**

```powershell
npm run seed
```

Sẽ tạo:
- ✅ Admin: `admin@example.com` / `admin123`
- ✅ User: `user@example.com` / `user123`  
- ✅ 5 categories và 10 products mẫu

**Sau đó chạy lại backend:**
```powershell
npm run dev
```

---

### Bước 3: Chạy Frontend

**Mở Terminal/PowerShell 2 (terminal mới):**

```powershell
cd frontend
npm install
npm run dev
```

✅ Frontend chạy tại: **http://localhost:3000**

---

## 🧪 Test các tính năng

### 1. Test Authentication
- Truy cập: http://localhost:3000/login
- Login với: `admin@example.com` / `admin123`

### 2. Test Products với Lazy Loading
- Truy cập: http://localhost:3000/products
- Test search, filter, scroll xuống để load thêm

### 3. Test Admin Dashboard
- Login với admin account
- Truy cập: http://localhost:3000/admin
- Test CRUD products và categories

---

## ⚠️ Lưu ý quan trọng

1. **MongoDB phải đang chạy:**
   - Local: Đảm bảo MongoDB service đang chạy
   - Hoặc dùng MongoDB Atlas (update MONGODB_URI trong `.env`)

2. **Backend phải chạy trước Frontend**

3. **Cả 2 terminal phải chạy đồng thời:**
   - Terminal 1: Backend (port 5000)
   - Terminal 2: Frontend (port 3000)

---

## 🔧 Troubleshooting

### Backend không chạy:
```
❌ Error: MongoDB connection failed
→ Kiểm tra MongoDB đang chạy
→ Kiểm tra MONGODB_URI trong backend/.env
```

### Frontend không kết nối được API:
```
❌ Error: Network Error
→ Kiểm tra backend đang chạy tại port 5000
→ Mở http://localhost:5000/api/health để test
```

### Port đã được sử dụng:
```
❌ Error: Port 5000 already in use
→ Đổi PORT trong backend/.env
→ Hoặc kill process đang dùng port đó
```

---

## 📋 Checklist

Trước khi test, đảm bảo:
- [ ] MongoDB đang chạy
- [ ] Backend `.env` đã cấu hình đúng
- [ ] Backend đang chạy (Terminal 1)
- [ ] Frontend đang chạy (Terminal 2)
- [ ] Đã seed data (optional nhưng khuyến nghị)

---

## 🎯 Test Accounts (sau khi seed)

- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

---

## 📚 Chi tiết hơn

Xem file `QUICK_START_TEST.md` để biết thêm chi tiết.

