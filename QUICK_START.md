# Quick Start Guide

## Bước 1: Cài đặt Backend

```bash
cd backend
npm install
cp .env.example .env
# Chỉnh sửa .env với MongoDB URI của bạn
npm run dev
```

## Bước 2: Seed dữ liệu mẫu (Optional)

Trong terminal backend:
```bash
npm run seed
```

Sẽ tạo:
- Admin user: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123`
- 5 categories và 10 products mẫu

## Bước 3: Cài đặt Frontend

Mở terminal mới:
```bash
cd frontend
npm install
npm start
```

## Bước 4: Truy cập ứng dụng

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Test Accounts

Sau khi chạy seed:
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## API Testing

### Đăng ký user mới
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"Test123"}'
```

### Đăng nhập
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

### Lấy danh sách sản phẩm
```bash
curl http://localhost:5000/api/products
```

### Lấy sản phẩm với filter
```bash
curl "http://localhost:5000/api/products?search=laptop&minPrice=500&maxPrice=2000&category=Electronics"
```

## Tính năng đã implement

✅ 4 lớp bảo mật:
- Input validation với express-validator
- Rate limiting với express-rate-limit
- JWT Authentication
- Authorization middleware (user/admin)

✅ Lazy Loading:
- Infinite scroll tự động load thêm sản phẩm
- Sử dụng React Query useInfiniteQuery

✅ Fuzzy Search:
- Tìm kiếm trong tên và mô tả sản phẩm
- Không phân biệt hoa thường

✅ Multi-condition Filtering:
- Lọc theo category, price range, promotion
- Sắp xếp theo nhiều tiêu chí (date, price, views, promotion, name)

