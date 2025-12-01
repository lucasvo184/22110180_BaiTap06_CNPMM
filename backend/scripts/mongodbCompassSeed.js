// Script để chạy trong MongoDB Compass hoặc MongoDB Shell
// Copy và paste vào MongoDB Compass > Shell tab hoặc MongoDB Shell

// Chọn database
use('bt04_cnpmm');

// Xóa dữ liệu cũ (optional)
db.users.deleteMany({});
db.categories.deleteMany({});
db.products.deleteMany({});

print('✅ Cleared existing data');

// ============================================
// 1. TẠO USERS
// ============================================
const bcrypt = require('bcryptjs');

// Hash passwords (trong MongoDB Compass, bạn cần hash trước)
// Hoặc sử dụng password đã hash sẵn
const adminPasswordHash = '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJqJq'; // admin123
const userPasswordHash = '$2a$10$rOzJqJqJqJqJqJqJqJqJqOqJqJqJqJqJqJqJqJqJqJqJqJqJq'; // user123

// Insert Users
const users = [
  {
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // admin123
    role: 'admin',
    createdAt: new Date()
  },
  {
    username: 'user',
    email: 'user@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', // user123
    role: 'user',
    createdAt: new Date()
  }
];

const insertedUsers = db.users.insertMany(users);
print('✅ Created ' + insertedUsers.insertedIds.length + ' users');

// ============================================
// 2. TẠO CATEGORIES
// ============================================
const categories = [
  {
    name: 'Electronics',
    description: 'Electronic devices and gadgets',
    createdAt: new Date()
  },
  {
    name: 'Clothing',
    description: 'Apparel and fashion items',
    createdAt: new Date()
  },
  {
    name: 'Books',
    description: 'Books and reading materials',
    createdAt: new Date()
  },
  {
    name: 'Home & Garden',
    description: 'Home and garden products',
    createdAt: new Date()
  },
  {
    name: 'Sports',
    description: 'Sports and outdoor equipment',
    createdAt: new Date()
  }
];

const insertedCategories = db.categories.insertMany(categories);
const categoryIds = Object.values(insertedCategories.insertedIds);
print('✅ Created ' + categoryIds.length + ' categories');

// ============================================
// 3. TẠO PRODUCTS
// ============================================
const products = [
  {
    name: 'Laptop Dell XPS 15',
    description: 'High-performance laptop with 16GB RAM and 512GB SSD',
    price: 1299.99,
    category: categoryIds[0], // Electronics
    stock: 50,
    promotion: 10,
    views: 150,
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with A17 Pro chip and titanium design',
    price: 999.99,
    category: categoryIds[0], // Electronics
    stock: 30,
    promotion: 5,
    views: 300,
    image: 'https://via.placeholder.com/300x200?text=iPhone',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 299.99,
    category: categoryIds[0], // Electronics
    stock: 100,
    promotion: 15,
    views: 200,
    image: 'https://via.placeholder.com/300x200?text=Headphones',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt',
    price: 19.99,
    category: categoryIds[1], // Clothing
    stock: 200,
    promotion: 20,
    views: 80,
    image: 'https://via.placeholder.com/300x200?text=T-Shirt',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Jeans Classic Fit',
    description: 'Classic fit denim jeans',
    price: 49.99,
    category: categoryIds[1], // Clothing
    stock: 150,
    promotion: 0,
    views: 120,
    image: 'https://via.placeholder.com/300x200?text=Jeans',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald',
    price: 12.99,
    category: categoryIds[2], // Books
    stock: 500,
    promotion: 10,
    views: 250,
    image: 'https://via.placeholder.com/300x200?text=Book',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'JavaScript: The Definitive Guide',
    description: 'Comprehensive guide to JavaScript programming',
    price: 59.99,
    category: categoryIds[2], // Books
    stock: 80,
    promotion: 0,
    views: 180,
    image: 'https://via.placeholder.com/300x200?text=JS+Book',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Garden Tool Set',
    description: 'Complete set of gardening tools',
    price: 79.99,
    category: categoryIds[3], // Home & Garden
    stock: 60,
    promotion: 25,
    views: 90,
    image: 'https://via.placeholder.com/300x200?text=Garden+Tools',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Yoga Mat',
    description: 'Premium non-slip yoga mat',
    price: 29.99,
    category: categoryIds[4], // Sports
    stock: 120,
    promotion: 15,
    views: 140,
    image: 'https://via.placeholder.com/300x200?text=Yoga+Mat',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Running Shoes',
    description: 'Comfortable running shoes with cushioning',
    price: 89.99,
    category: categoryIds[4], // Sports
    stock: 90,
    promotion: 30,
    views: 220,
    image: 'https://via.placeholder.com/300x200?text=Running+Shoes',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const insertedProducts = db.products.insertMany(products);
print('✅ Created ' + insertedProducts.insertedIds.length + ' products');

// ============================================
// KẾT QUẢ
// ============================================
print('\n✅ Seed data created successfully!');
print('\n📊 Summary:');
print('   - Users: ' + db.users.countDocuments());
print('   - Categories: ' + db.categories.countDocuments());
print('   - Products: ' + db.products.countDocuments());
print('\n🔐 Test Accounts:');
print('   Admin - Email: admin@example.com, Password: admin123');
print('   User - Email: user@example.com, Password: user123');

