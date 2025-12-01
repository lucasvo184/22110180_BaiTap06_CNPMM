const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
require('dotenv').config();

const addMoreProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bt04_cnpmm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    const categories = await Category.find();
    
    if (categories.length === 0) {
      console.log('❌ No categories found. Please run seed script first: npm run seed');
      process.exit(1);
    }

    const products = [];
    
    // Tạo 25 products mới với dữ liệu đa dạng
    const productData = [
      { name: 'Gaming Mouse', price: 79.99, category: 0, stock: 150, promotion: 15 },
      { name: 'Mechanical Keyboard', price: 129.99, category: 0, stock: 100, promotion: 10 },
      { name: 'Monitor 4K 27inch', price: 399.99, category: 0, stock: 50, promotion: 20 },
      { name: 'Webcam HD 1080p', price: 89.99, category: 0, stock: 200, promotion: 5 },
      { name: 'USB-C Hub', price: 49.99, category: 0, stock: 300, promotion: 25 },
      { name: 'External SSD 1TB', price: 149.99, category: 0, stock: 80, promotion: 0 },
      { name: 'Bluetooth Speaker', price: 59.99, category: 0, stock: 250, promotion: 30 },
      { name: 'Smart Watch', price: 299.99, category: 0, stock: 60, promotion: 15 },
      { name: 'Tablet Stand', price: 29.99, category: 0, stock: 400, promotion: 10 },
      { name: 'Cable Organizer', price: 19.99, category: 0, stock: 500, promotion: 0 },
      { name: 'Desk Lamp LED', price: 39.99, category: 3, stock: 200, promotion: 20 },
      { name: 'Ergonomic Chair', price: 249.99, category: 3, stock: 30, promotion: 0 },
      { name: 'Standing Desk', price: 499.99, category: 3, stock: 20, promotion: 10 },
      { name: 'Monitor Arm', price: 79.99, category: 3, stock: 150, promotion: 15 },
      { name: 'Laptop Stand', price: 49.99, category: 0, stock: 180, promotion: 25 },
      { name: 'USB Flash Drive 64GB', price: 24.99, category: 0, stock: 500, promotion: 0 },
      { name: 'Power Bank 20000mAh', price: 39.99, category: 0, stock: 300, promotion: 20 },
      { name: 'Wireless Charger', price: 34.99, category: 0, stock: 250, promotion: 10 },
      { name: 'Phone Case Premium', price: 29.99, category: 0, stock: 400, promotion: 15 },
      { name: 'Screen Protector', price: 14.99, category: 0, stock: 600, promotion: 0 },
      { name: 'Nike Running Shoes', price: 129.99, category: 4, stock: 100, promotion: 20 },
      { name: 'Yoga Block Set', price: 24.99, category: 4, stock: 200, promotion: 10 },
      { name: 'Dumbbells 10kg', price: 49.99, category: 4, stock: 80, promotion: 0 },
      { name: 'Resistance Bands', price: 19.99, category: 4, stock: 300, promotion: 25 },
      { name: 'Fitness Tracker', price: 89.99, category: 4, stock: 150, promotion: 15 }
    ];
    
    for (const data of productData) {
      const categoryIndex = data.category < categories.length ? data.category : 0;
      products.push({
        name: data.name,
        description: `High-quality ${data.name.toLowerCase()} with excellent features and durability`,
        price: data.price,
        category: categories[categoryIndex]._id,
        stock: data.stock,
        promotion: data.promotion,
        views: Math.floor(Math.random() * 500),
        image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(data.name)}`,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    await Product.insertMany(products);
    const totalProducts = await Product.countDocuments();
    
    console.log(`✅ Created ${products.length} additional products`);
    console.log(`📊 Total products in database: ${totalProducts}`);
    console.log('\n🎯 Now you can test lazy loading with', totalProducts, 'products!');
    console.log('   Frontend loads 12 products per page');
    console.log('   You should see lazy loading when scrolling down\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

addMoreProducts();

