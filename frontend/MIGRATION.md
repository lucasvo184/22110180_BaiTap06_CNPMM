# Migration từ React (CRA) sang Next.js

## ✅ Đã hoàn thành

Project đã được migrate từ Create React App sang Next.js 14 với App Router.

## Thay đổi chính

### 1. Cấu trúc mới
```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   ├── globals.css         # Global styles
│   ├── products/
│   │   └── page.js         # Products page
│   ├── login/
│   │   └── page.js         # Login page
│   ├── register/
│   │   └── page.js         # Register page
│   └── admin/
│       └── page.js         # Admin dashboard
├── components/             # React components
├── context/               # React Context
├── lib/                   # Utilities (API client)
└── public/                # Static files
```

### 2. Dependencies mới
- `next`: ^14.0.0
- `@tanstack/react-query`: ^5.0.0 (thay thế react-query v3)
- Removed: `react-router-dom`, `react-scripts`

### 3. Routing
- **Trước**: React Router (`/products`, `/login`, etc.)
- **Sau**: Next.js App Router (file-based routing)
  - `/` → `app/page.js`
  - `/products` → `app/products/page.js`
  - `/login` → `app/login/page.js`
  - `/register` → `app/register/page.js`
  - `/admin` → `app/admin/page.js`

### 4. Navigation
- **Trước**: `<Link to="/products">`
- **Sau**: `<Link href="/products">`

### 5. Client Components
- Tất cả components có hooks/interactivity cần `'use client'` directive
- Server components mặc định (không cần directive)

### 6. Environment Variables
- **Trước**: `REACT_APP_API_URL`
- **Sau**: `NEXT_PUBLIC_API_URL`

## Cài đặt và chạy

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại `http://localhost:3000`

## Build cho production

```bash
npm run build
npm start
```

## Lợi ích của Next.js

1. **Performance**: 
   - Server-side rendering (SSR)
   - Automatic code splitting
   - Image optimization

2. **SEO**: 
   - Better SEO với SSR
   - Metadata API

3. **Developer Experience**:
   - File-based routing
   - Fast Refresh
   - Better error messages

4. **No vulnerabilities**: 
   - Không còn vulnerabilities từ react-scripts
   - Modern build toolchain

## Lưu ý

- Tất cả tính năng cũ vẫn hoạt động bình thường
- API integration không thay đổi
- Authentication flow giữ nguyên
- Lazy loading và filtering vẫn hoạt động

## Troubleshooting

Nếu gặp lỗi:
1. Xóa `node_modules` và `package-lock.json`
2. Chạy `npm install` lại
3. Xóa `.next` folder nếu có
4. Chạy `npm run dev` lại

