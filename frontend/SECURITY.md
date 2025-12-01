# Security Notes

## Vulnerabilities trong Dependencies

Project này sử dụng `react-scripts@5.0.1` và có một số vulnerabilities được báo cáo từ npm audit. Các vulnerabilities này chủ yếu nằm trong **devDependencies** (build tools), không ảnh hưởng đến production build.

### Vulnerabilities hiện tại (9 total):

1. **nth-check <2.0.1** (High severity)
   - Nằm trong: `svgo` → `css-select` → `nth-check`
   - Ảnh hưởng: Development dependencies only
   - Fix: Cần update react-scripts (có thể breaking changes)

2. **postcss <8.4.31** (Moderate severity)
   - Nằm trong: `resolve-url-loader` → `postcss`
   - Ảnh hưởng: Development dependencies only
   - Fix: Cần update react-scripts

3. **webpack-dev-server <=5.2.0** (Moderate severity)
   - Nằm trong: `react-scripts` → `webpack-dev-server`
   - Ảnh hưởng: Development server only
   - Fix: Cần update react-scripts

### Tại sao không fix ngay?

- `npm audit fix --force` sẽ cài đặt `react-scripts@0.0.0` (breaking change)
- Các vulnerabilities này chỉ ảnh hưởng đến development environment
- Production build không bị ảnh hưởng
- React Scripts 5.0.1 là phiên bản stable mới nhất hiện tại

### Giải pháp khuyến nghị:

1. **Cho development hiện tại**: Các vulnerabilities này không ảnh hưởng đến production code, có thể tiếp tục sử dụng.

2. **Cho production**: Production build được tối ưu và không chứa các dependencies có vulnerabilities.

3. **Nếu muốn fix**: Có thể migrate sang:
   - **Vite** (modern build tool, faster)
   - **Next.js** (nếu cần SSR)
   - Hoặc đợi react-scripts update các dependencies

### Monitoring:

Chạy `npm audit` định kỳ để kiểm tra vulnerabilities mới:
```bash
npm audit
```

### Production Security:

- Tất cả production dependencies (react, react-dom, axios, etc.) đều là các phiên bản stable và an toàn
- Backend API có đầy đủ 4 lớp bảo mật:
  - Input validation
  - Rate limiting
  - JWT authentication
  - Authorization middleware

