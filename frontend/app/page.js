import Link from 'next/link';
import './home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <h1>Welcome to BT04 CNPMM</h1>
        <p>Product Management System with Advanced Features</p>
        <div className="home-actions">
          <Link href="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
      <div className="home-features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🔒 Security</h3>
              <p>4 layers of security: Input validation, Rate limiting, JWT Authentication, and Authorization</p>
            </div>
            <div className="feature-card">
              <h3>🔍 Search & Filter</h3>
              <p>Fuzzy search and multi-condition filtering by category, price, promotion, and views</p>
            </div>
            <div className="feature-card">
              <h3>📄 Lazy Loading</h3>
              <p>Efficient pagination and lazy loading for better performance</p>
            </div>
            <div className="feature-card">
              <h3>👤 User Management</h3>
              <p>Role-based access control with user and admin roles</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

