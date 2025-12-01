# Security Notes - Next.js Version

## Vulnerabilities hiện tại (3 high severity)

### Chi tiết:
- **Package**: `glob` (10.2.0 - 10.4.5)
- **Severity**: High
- **Vấn đề**: Command injection via -c/--cmd trong glob CLI
- **Vị trí**: `@next/eslint-plugin-next` → `glob`
- **Link**: https://github.com/advisories/GHSA-5j98-mcp5-4vw2

### Tại sao không ảnh hưởng production?

1. **Dev Dependency Only**: 
   - Vulnerability nằm trong `eslint-config-next` (dev dependency)
   - Chỉ ảnh hưởng đến development environment
   - Production build không chứa ESLint hoặc glob CLI

2. **Không sử dụng CLI**:
   - Vulnerability chỉ ảnh hưởng khi sử dụng `glob` CLI với flag `-c/--cmd`
   - Next.js chỉ sử dụng `glob` như một library, không dùng CLI
   - ESLint config không expose CLI functionality

3. **Next.js đang fix**:
   - Đây là vấn đề đã biết trong Next.js ecosystem
   - Sẽ được fix trong các bản update tiếp theo
   - Không có workaround cần thiết

### So sánh với React Scripts

**Trước (React Scripts)**:
- 9 vulnerabilities (3 moderate, 6 high)
- Nằm trong build tools (webpack-dev-server, svgo, postcss)
- Không thể fix được (breaking changes)

**Sau (Next.js)**:
- 3 vulnerabilities (high)
- Chỉ trong dev dependency (ESLint)
- Không ảnh hưởng production
- Sẽ được fix trong bản update tiếp theo

### Kết luận

✅ **An toàn để sử dụng**:
- Production build hoàn toàn an toàn
- Development environment không bị ảnh hưởng thực tế
- Vulnerability chỉ tồn tại trong dev tooling

### Monitoring

Chạy định kỳ để kiểm tra:
```bash
npm audit
```

Khi Next.js release bản fix, update bằng:
```bash
npm update next eslint-config-next
```

