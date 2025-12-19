const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function createStaffUser() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Check if staff user exists
        const Staff = require('./models/UniversityStaff');
        const existingStaff = await Staff.findOne({ email: 'admin@university.com' });
        
        if (existingStaff) {
            console.log('✅ Staff user already exists');
            console.log('Email: admin@university.com');
            console.log('Password: admin123');
            process.exit(0);
        }
        
        // Create staff user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        
        const staffUser = new Staff({
            name: 'System Administrator',
            email: 'admin@university.com',
            password: hashedPassword,
            position: 'System Admin'
        });
        
        await staffUser.save();
        console.log('✅ Staff user created successfully!');
        console.log('Email: admin@university.com');
        console.log('Password: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

createStaffUser();
