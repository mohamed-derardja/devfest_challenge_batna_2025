const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/devfest2025';

        console.log(`Attempting to connect to MongoDB...`);

        const conn = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Please make sure you have a .env file with MONGO_URI=mongodb://localhost:27017/devfest2025');
        process.exit(1);
    }
};

module.exports = connectDB;
