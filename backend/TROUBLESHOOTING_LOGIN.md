# 🔧 Troubleshooting: Invalid Email or Password

## Nguyên nhân có thể

### 1. Password hash không đúng
- Nếu bạn tạo users trực tiếp trong MongoDB Compass, password phải được hash bằng bcrypt
- User model tự động hash password khi save, nhưng nếu insert trực tiếp thì cần hash trước

### 2. Email không tồn tại trong database
- Kiểm tra xem user có tồn tại không
- Email phải chính xác (case-sensitive trong một số trường hợp)

### 3. Password field bị select: false
- User model có `select: false` cho password
- Khi query cần dùng `.select('+password')` để lấy password field

## ✅ Giải pháp

### Cách 1: Chạy lại seed script (Khuyến nghị)

```bash
cd backend
npm run seed
```

Script này sẽ:
- Xóa users cũ
- Tạo lại users với password được hash đúng cách
- Tạo categories và products

### Cách 2: Tạo user mới qua API Register

Truy cập: http://localhost:3000/register

Hoặc dùng cURL:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

### Cách 3: Kiểm tra database

1. Mở MongoDB Compass
2. Kiểm tra collection `users`
3. Xem có user với email `admin@example.com` không
4. Kiểm tra password field có được hash không (phải bắt đầu với `$2a$10$`)

## 🔍 Debug Steps

### 1. Kiểm tra backend đang chạy
```bash
# Test health endpoint
curl http://localhost:5000/api/health
```

### 2. Test login với cURL
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

### 3. Kiểm tra logs backend
Xem console output khi login để thấy lỗi chi tiết

### 4. Kiểm tra User trong database
```javascript
// Trong MongoDB Compass Shell
use('bt04_cnpmm');
db.users.find({ email: 'admin@example.com' });
```

## 📝 Test Accounts sau khi seed

Sau khi chạy `npm run seed`:
- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`

## ⚠️ Lưu ý

1. **Password hash**: Mỗi lần hash sẽ tạo ra string khác nhau, nhưng bcrypt.compare() vẫn verify được
2. **Email case**: Email được normalize thành lowercase trong User model
3. **Password select**: Password field mặc định không được select, cần `.select('+password')` khi query

## 🔄 Reset hoàn toàn

Nếu vẫn không được, reset database:

```bash
cd backend
npm run seed
```

Hoặc trong MongoDB Compass:
```javascript
use('bt04_cnpmm');
db.users.deleteMany({});
db.categories.deleteMany({});
db.products.deleteMany({});
```

Sau đó chạy lại seed script.

