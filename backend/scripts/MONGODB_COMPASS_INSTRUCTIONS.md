# 📝 Hướng dẫn chạy script trong MongoDB Compass

## Cách 1: Sử dụng MongoDB Compass Shell

### Bước 1: Mở MongoDB Compass
1. Mở MongoDB Compass
2. Kết nối đến MongoDB (local hoặc Atlas)
3. Chọn database `bt04_cnpmm` (hoặc tạo mới nếu chưa có)

### Bước 2: Mở Shell tab
1. Click vào tab **"Shell"** ở phía dưới
2. Hoặc nhấn `Ctrl + L` để mở shell

### Bước 3: Copy và paste script
1. Mở file `mongodbCompassSeedSimple.js`
2. Copy **toàn bộ** nội dung
3. Paste vào MongoDB Compass Shell
4. Nhấn `Enter` để chạy

### Bước 4: Kiểm tra kết quả
Bạn sẽ thấy output:
```
✅ Cleared existing data
✅ Created 2 users
✅ Created 5 categories
✅ Created 10 products
✅ Seed data created successfully!
```

---

## Cách 2: Import từ file JSON (Nếu shell không hoạt động)

### Tạo file JSON và import thủ công:

1. **Users Collection:**
```json
[
  {
    "username": "admin",
    "email": "admin@example.com",
    "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    "role": "admin",
    "createdAt": {"$date": "2024-01-01T00:00:00Z"}
  },
  {
    "username": "user",
    "email": "user@example.com",
    "password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
    "role": "user",
    "createdAt": {"$date": "2024-01-01T00:00:00Z"}
  }
]
```

2. Trong MongoDB Compass:
   - Chọn collection `users`
   - Click "Add Data" > "Insert Document"
   - Paste JSON và save

---

## 🔐 Passwords đã hash

Các passwords đã được hash sẵn bằng bcrypt:
- `admin123` → `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`
- `user123` → `$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

---

## ⚠️ Lưu ý

1. **Database name**: Đảm bảo database tên là `bt04_cnpmm` hoặc sửa trong script
2. **Collections**: Script sẽ tạo collections: `users`, `categories`, `products`
3. **Xóa dữ liệu cũ**: Script sẽ xóa tất cả dữ liệu cũ trước khi insert mới
4. **ObjectId**: Categories sẽ được tự động tạo ObjectId và link với products

---

## 🧪 Test sau khi seed

1. Chạy backend: `npm run dev`
2. Test login với:
   - Admin: `admin@example.com` / `admin123`
   - User: `user@example.com` / `user123`

---

## 🔄 Reset dữ liệu

Nếu muốn reset lại, chỉ cần chạy lại script trong MongoDB Compass Shell.

