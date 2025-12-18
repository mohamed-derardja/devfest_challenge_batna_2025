const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            console.error('ERROR: MONGO_URI is not defined in your .env file');
            console.error('Please add: MONGO_URI=your_mongodb_connection_string');
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
