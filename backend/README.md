# Backend API - BT04 CNPMM

Express.js REST API với MongoDB.

## Cấu trúc

- `models/` - MongoDB schemas (User, Product, Category)
- `controllers/` - Business logic handlers
- `routes/` - API route definitions
- `middleware/` - Custom middleware (auth, validation, rate limiting)
- `server.js` - Entry point

## Security Layers

### 1. Input Validation (express-validator)
- Validate tất cả input từ client
- Custom validation rules cho từng field
- Error messages rõ ràng

### 2. Rate Limiting (express-rate-limit)
- `apiLimiter`: 100 req/15min cho general API
- `authLimiter`: 5 req/15min cho auth endpoints
- `productLimiter`: 50 req/hour cho admin operations

### 3. JWT Authentication
- Token-based authentication
- Token expires sau 7 ngày (có thể config)
- Secure password hashing với bcryptjs

### 4. Authorization Middleware
- `authenticate`: Verify JWT token
- `authorize`: Check user role (user/admin)
- Role-based access control

## Environment Variables

Tạo file `.env` với các biến sau:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bt04_cnpmm
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## API Documentation

Xem README.md ở root để biết chi tiết về các endpoints.

