require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedUsers() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Create or update student user
    let student = await User.findOne({ email: 'test@university.edu' });
    if (student) {
      student.password = 'test123';
      student.name = 'Test Student';
      student.role = 'student';
      await student.save();
      console.log('✅ Updated test student: test@university.edu / test123');
    } else {
      student = await User.create({
        name: 'Test Student',
        email: 'test@university.edu',
        password: 'test123',
        role: 'student'
      });
      console.log('✅ Created test student: test@university.edu / test123');
    }

    // Create or update admin user
    let admin = await User.findOne({ email: 'admin@university.com' });
    if (admin) {
      admin.password = 'admin123';
      admin.name = 'System Administrator';
      admin.role = 'admin';
      await admin.save();
      console.log('✅ Updated test admin: admin@university.com / admin123');
    } else {
      admin = await User.create({
        name: 'System Administrator',
        email: 'admin@university.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Created test admin: admin@university.com / admin123');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
}

seedUsers();
