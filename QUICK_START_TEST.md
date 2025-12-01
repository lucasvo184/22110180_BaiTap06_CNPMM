# Hướng dẫn Chạy Project để Test

## Bước 1: Kiểm tra MongoDB

Đảm bảo MongoDB đang chạy:
- **Local MongoDB**: Chạy `mongod` hoặc MongoDB service
- **MongoDB Atlas**: Sử dụng connection string từ Atlas

## Bước 2: Chạy Backend

Mở terminal 1:

```bash
cd backend
npm install          # Nếu chưa cài
npm run dev          # Development mode với nodemon
```

Backend sẽ chạy tại: **http://localhost:5000**

Kiểm tra: Mở browser vào `http://localhost:5000/api/health`

## Bước 3: Seed dữ liệu mẫu (Optional nhưng khuyến nghị)

Trong terminal backend (Ctrl+C để dừng, sau đó):

```bash
npm run seed
```

Sẽ tạo:
- **Admin**: `admin@example.com` / `admin123`
- **User**: `user@example.com` / `user123`
- 5 categories và 10 products mẫu

Sau đó chạy lại: `npm run dev`

## Bước 4: Chạy Frontend

Mở terminal 2 (mới):

```bash
cd frontend
npm install          # Nếu chưa cài
npm run dev          # Next.js development server
```

Frontend sẽ chạy tại: **http://localhost:3000**

## Bước 5: Test các tính năng

### 1. Test Authentication
- Truy cập: http://localhost:3000/login
- Đăng nhập với: `admin@example.com` / `admin123`
- Hoặc đăng ký user mới

### 2. Test Products
- Truy cập: http://localhost:3000/products
- Test search, filter, lazy loading
- Scroll xuống để test infinite scroll

### 3. Test Admin Dashboard
- Đăng nhập với admin account
- Truy cập: http://localhost:3000/admin
- Test CRUD products và categories

### 4. Test API trực tiếp
- Health check: http://localhost:5000/api/health
- Products: http://localhost:5000/api/products
- Categories: http://localhost:5000/api/categories

## Troubleshooting

### Backend không chạy được:
1. Kiểm tra MongoDB đang chạy
2. Kiểm tra file `.env` có đúng không
3. Kiểm tra port 5000 có bị chiếm không

### Frontend không chạy được:
1. Kiểm tra backend đang chạy
2. Kiểm tra `NEXT_PUBLIC_API_URL` trong `.env` (nếu có)
3. Xóa `.next` folder và chạy lại `npm run dev`

### Lỗi kết nối API:
1. Kiểm tra backend đang chạy tại port 5000
2. Kiểm tra CORS settings trong backend
3. Kiểm tra network tab trong browser DevTools

## Test với cURL (Optional)

### Test Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"Test123\"}"
```

### Test Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

### Test Products:
```bash
curl http://localhost:5000/api/products
```

## Checklist trước khi test

- [ ] MongoDB đang chạy
- [ ] Backend `.env` đã được cấu hình
- [ ] Backend đang chạy tại port 5000
- [ ] Frontend đang chạy tại port 3000
- [ ] Đã seed data (optional)
- [ ] Browser console không có lỗi

## Lưu ý

- Backend và Frontend phải chạy đồng thời
- Backend phải chạy trước Frontend
- Nếu thay đổi `.env`, cần restart server

