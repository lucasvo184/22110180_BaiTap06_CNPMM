const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bt04_cnpmm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    // Note: User model has pre-save hook that hashes password automatically
    // So we pass plain password, not hashed
    const admin = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123', // Plain password - will be hashed by pre-save hook
      role: 'admin'
    });

    const user = await User.create({
      username: 'user',
      email: 'user@example.com',
      password: 'user123', // Plain password - will be hashed by pre-save hook
      role: 'user'
    });

    console.log('Created users:', { admin: admin.email, user: user.email });

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Electronics', description: 'Electronic devices and gadgets' },
      { name: 'Clothing', description: 'Apparel and fashion items' },
      { name: 'Books', description: 'Books and reading materials' },
      { name: 'Home & Garden', description: 'Home and garden products' },
      { name: 'Sports', description: 'Sports and outdoor equipment' }
    ]);

    console.log('Created categories:', categories.length);

    // Create products
    const products = [
      {
        name: 'Laptop Dell XPS 15',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        price: 1299.99,
        category: categories[0]._id,
        stock: 50,
        promotion: 10,
        views: 150,
        image: 'https://via.placeholder.com/300x200?text=Laptop'
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with A17 Pro chip and titanium design',
        price: 999.99,
        category: categories[0]._id,
        stock: 30,
        promotion: 5,
        views: 300,
        image: 'https://via.placeholder.com/300x200?text=iPhone'
      },
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones',
        price: 299.99,
        category: categories[0]._id,
        stock: 100,
        promotion: 15,
        views: 200,
        image: 'https://via.placeholder.com/300x200?text=Headphones'
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        category: categories[1]._id,
        stock: 200,
        promotion: 20,
        views: 80,
        image: 'https://via.placeholder.com/300x200?text=T-Shirt'
      },
      {
        name: 'Jeans Classic Fit',
        description: 'Classic fit denim jeans',
        price: 49.99,
        category: categories[1]._id,
        stock: 150,
        promotion: 0,
        views: 120,
        image: 'https://via.placeholder.com/300x200?text=Jeans'
      },
      {
        name: 'The Great Gatsby',
        description: 'Classic novel by F. Scott Fitzgerald',
        price: 12.99,
        category: categories[2]._id,
        stock: 500,
        promotion: 10,
        views: 250,
        image: 'https://via.placeholder.com/300x200?text=Book'
      },
      {
        name: 'JavaScript: The Definitive Guide',
        description: 'Comprehensive guide to JavaScript programming',
        price: 59.99,
        category: categories[2]._id,
        stock: 80,
        promotion: 0,
        views: 180,
        image: 'https://via.placeholder.com/300x200?text=JS+Book'
      },
      {
        name: 'Garden Tool Set',
        description: 'Complete set of gardening tools',
        price: 79.99,
        category: categories[3]._id,
        stock: 60,
        promotion: 25,
        views: 90,
        image: 'https://via.placeholder.com/300x200?text=Garden+Tools'
      },
      {
        name: 'Yoga Mat',
        description: 'Premium non-slip yoga mat',
        price: 29.99,
        category: categories[4]._id,
        stock: 120,
        promotion: 15,
        views: 140,
        image: 'https://via.placeholder.com/300x200?text=Yoga+Mat'
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes with cushioning',
        price: 89.99,
        category: categories[4]._id,
        stock: 90,
        promotion: 30,
        views: 220,
        image: 'https://via.placeholder.com/300x200?text=Running+Shoes'
      }
    ];

    await Product.insertMany(products);
    console.log('Created products:', products.length);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nTest accounts:');
    console.log('Admin - Email: admin@example.com, Password: admin123');
    console.log('User - Email: user@example.com, Password: user123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

