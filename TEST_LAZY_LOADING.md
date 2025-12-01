# 🧪 Hướng dẫn Test Lazy Loading

## ✅ Đã implement

1. **Script tạo thêm products**: `backend/scripts/addMoreProducts.js`
2. **Giảm limit**: Frontend giờ load **8 products/lần** (thay vì 12) để test dễ hơn

---

## 🚀 Bước 1: Tạo thêm Products

Chạy script để tạo thêm 25 products:

```bash
cd backend
node scripts/addMoreProducts.js
```

Sau khi chạy, bạn sẽ có **35 products** tổng cộng (10 ban đầu + 25 mới).

---

## 🧪 Bước 2: Test Lazy Loading

### 1. Mở trang Products
- Truy cập: http://localhost:3000/products
- Mở **Browser DevTools** (F12)

### 2. Mở Network Tab
1. Click tab **Network** trong DevTools
2. Filter: Chọn **XHR** hoặc **Fetch**
3. Clear network log (icon 🚫)

### 3. Scroll và Quan sát

**Lần đầu load:**
- ✅ Thấy request: `GET /api/products?page=1&limit=8`
- ✅ Hiển thị 8 products đầu tiên

**Scroll xuống cuối trang:**
- ✅ Tự động gọi: `GET /api/products?page=2&limit=8`
- ✅ Hiển thị "Loading more products..."
- ✅ Products 9-16 xuất hiện

**Tiếp tục scroll:**
- ✅ Load page 3, 4, 5... tự động
- ✅ Tổng cộng sẽ có ~5 pages (35 products / 8 per page)

**Khi hết products:**
- ✅ Hiển thị "No more products to load"

---

## 🔍 Các dấu hiệu Lazy Loading hoạt động

### ✅ Hoạt động đúng:
1. **Scroll indicator**: Khi scroll xuống cuối, thấy "Loading more products..."
2. **Products xuất hiện dần**: Products mới xuất hiện khi scroll
3. **Network requests**: Thấy nhiều requests với page khác nhau
4. **No "Load More" button**: Tự động load, không cần click
5. **Smooth scrolling**: Không bị giật lag

### ❌ Không hoạt động:
1. Tất cả products hiện ra cùng lúc
2. Không có request mới khi scroll
3. Thấy "No more products to load" ngay từ đầu
4. Phải click button để load thêm

---

## 🎯 Test Cases

### Test Case 1: Basic Lazy Loading ✅
1. Mở trang Products
2. Scroll xuống từ từ
3. **Expected**: Products load thêm khi đến cuối trang (cách cuối 100px)

### Test Case 2: Fast Scroll ✅
1. Scroll nhanh xuống cuối
2. **Expected**: Vẫn load đúng, không bị miss pages

### Test Case 3: End of Data ✅
1. Scroll đến khi hết products (page 5)
2. **Expected**: Hiển thị "No more products to load"

### Test Case 4: Filter + Lazy Loading ✅
1. Chọn category "Electronics"
2. Scroll xuống
3. **Expected**: Chỉ load products thuộc category Electronics

### Test Case 5: Search + Lazy Loading ✅
1. Search "laptop" hoặc "phone"
2. Scroll xuống
3. **Expected**: Chỉ load products có từ khóa trong tên/mô tả

### Test Case 6: Price Filter + Lazy Loading ✅
1. Set Min Price: 50, Max Price: 200
2. Scroll xuống
3. **Expected**: Chỉ load products trong khoảng giá

---

## 🔧 Debug nếu không hoạt động

### 1. Kiểm tra số lượng products
```javascript
// Trong MongoDB Compass Shell
use('bt04_cnpmm');
db.products.countDocuments();
```
Cần ít nhất **9+ products** (vì load 8/lần).

### 2. Kiểm tra Console Errors
- Mở DevTools > Console
- Xem có lỗi JavaScript không
- Lỗi thường gặp: CORS, Network error, API error

### 3. Kiểm tra Network Tab
- Xem requests có được gửi không
- Xem response status (200 OK?)
- Xem response data có đúng format không

### 4. Test API trực tiếp
```bash
# Test pagination
curl "http://localhost:5000/api/products?page=1&limit=8"
curl "http://localhost:5000/api/products?page=2&limit=8"
```

### 5. Kiểm tra Scroll Event
Thêm console.log vào code để debug:
```javascript
// Trong frontend/app/products/page.js
useEffect(() => {
  const handleScroll = () => {
    console.log('Scroll position:', window.innerHeight + document.documentElement.scrollTop);
    console.log('Document height:', document.documentElement.offsetHeight);
    // ... existing code
  };
  // ...
}, [hasNextPage, isFetchingNextPage, fetchNextPage]);
```

---

## 📊 Expected Behavior với 35 products

### Với limit=8:
- **Page 1**: Products 1-8 (load ngay khi vào trang)
- **Scroll down** → **Page 2**: Products 9-16 (auto load)
- **Scroll down** → **Page 3**: Products 17-24 (auto load)
- **Scroll down** → **Page 4**: Products 25-32 (auto load)
- **Scroll down** → **Page 5**: Products 33-35 (auto load)
- **Scroll down** → "No more products to load"

---

## 💡 Tips để test tốt hơn

### 1. Giảm limit hơn nữa (nếu muốn)
Sửa trong `frontend/app/products/page.js`:
```javascript
limit: 5  // Thay vì 8
```
Với limit=5, sẽ thấy lazy loading rõ ràng hơn.

### 2. Tạo thêm products
Chạy lại script nhiều lần:
```bash
node scripts/addMoreProducts.js
```

### 3. Test với nhiều filters
- Test với category filter
- Test với price range
- Test với search
- Test với sort options

### 4. Monitor Performance
- Xem Network tab để thấy thời gian load
- Xem có duplicate requests không
- Xem có requests không cần thiết không

---

## 🎬 Video Test Flow

1. **0:00** - Mở trang Products
2. **0:02** - Thấy 8 products đầu tiên load
3. **0:05** - Scroll xuống
4. **0:07** - Thấy "Loading more products..."
5. **0:08** - Products 9-16 xuất hiện
6. **0:10** - Tiếp tục scroll
7. **0:12** - Products 17-24 xuất hiện
8. **0:15** - Scroll đến cuối
9. **0:17** - Thấy "No more products to load"

---

## ✅ Checklist Test

- [ ] Đã chạy script addMoreProducts.js
- [ ] Có ít nhất 9+ products trong database
- [ ] Backend đang chạy tại port 5000
- [ ] Frontend đang chạy tại port 3000
- [ ] Mở DevTools Network tab
- [ ] Scroll xuống và thấy requests mới
- [ ] Products load thêm khi scroll
- [ ] Hiển thị "No more products to load" khi hết

---

## 🐛 Common Issues

### Issue 1: Không load thêm khi scroll
**Nguyên nhân**: Scroll event không trigger
**Giải pháp**: Kiểm tra scroll position calculation

### Issue 2: Load tất cả cùng lúc
**Nguyên nhân**: Infinite query không hoạt động
**Giải pháp**: Kiểm tra useInfiniteQuery configuration

### Issue 3: Duplicate requests
**Nguyên nhân**: Scroll event trigger nhiều lần
**Giải pháp**: Đã có check `!isFetchingNextPage`

### Issue 4: Không hiển thị "Loading more"
**Nguyên nhân**: `isFetchingNextPage` không update
**Giải pháp**: Kiểm tra React Query state

---

Chúc bạn test thành công! 🎉

