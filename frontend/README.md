# Frontend - BT04 CNPMM

React.js application với React Router và React Query.

## Cấu trúc

- `src/components/` - Reusable components (Navbar, ProductCard, ProtectedRoute)
- `src/pages/` - Page components (Home, Products, Login, Register, AdminDashboard)
- `src/context/` - React Context (AuthContext)
- `src/utils/` - Utilities (API client)

## Features

### Authentication
- Login/Register với JWT
- Protected routes
- Role-based UI (admin/user)

### Products Display
- Lazy loading với infinite scroll
- Search và filter UI
- Responsive design

### Admin Dashboard
- CRUD operations cho products và categories
- Form validation
- Real-time updates với React Query

## Environment Variables

Tạo file `.env` (optional):

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Dependencies

- `react` - UI library
- `react-router-dom` - Routing
- `react-query` - Data fetching và caching
- `axios` - HTTP client

