const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const testLogin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bt04_cnpmm', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB\n');

    // Check if users exist
    const admin = await User.findOne({ email: 'admin@example.com' }).select('+password');
    const user = await User.findOne({ email: 'user@example.com' }).select('+password');

    console.log('📊 Users in database:');
    if (admin) {
      console.log('  - Admin:', admin.email);
      console.log('    Password hash:', admin.password ? admin.password.substring(0, 20) + '...' : 'NULL');
      console.log('    Role:', admin.role);
      
      // Test password
      const testAdmin = await admin.comparePassword('admin123');
      console.log('    Password test (admin123):', testAdmin ? '✅ CORRECT' : '❌ WRONG');
    } else {
      console.log('  - Admin: ❌ NOT FOUND');
    }

    if (user) {
      console.log('  - User:', user.email);
      console.log('    Password hash:', user.password ? user.password.substring(0, 20) + '...' : 'NULL');
      console.log('    Role:', user.role);
      
      // Test password
      const testUser = await user.comparePassword('user123');
      console.log('    Password test (user123):', testUser ? '✅ CORRECT' : '❌ WRONG');
    } else {
      console.log('  - User: ❌ NOT FOUND');
    }

    if (!admin || !user) {
      console.log('\n⚠️  Users not found! Run: npm run seed');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testLogin();

