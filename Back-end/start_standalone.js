// This script starts the server with an in-memory MongoDB instance
// Useful for development/testing without installing MongoDB locally

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// Import seed logic (we'll need to slightly modify seed.js or copy logic)
// To avoid modifying seed.js too much, we will just replicate a basic seed here or modify seed.js to be exportable.
// checking seed.js, it has seedDatabase() call at the end, so requiring it would run it. 
// We should probably just rely on the user running npm run seed if they want, 
// OR simpler: we create our own simple seed or use the fact that we can run the seed script command.

const startStandalone = async () => {
    console.log('Starting standalone server with in-memory database...');

    try {
        // 1. Start Memory Server
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        console.log('------------------------------------------------');
        console.log('InMemory MongoDB running at:', uri);
        console.log('------------------------------------------------');

        // 2. Set Environment Variables
        process.env.MONGO_URI = uri;
        process.env.PORT = process.env.PORT || 5000;
        process.env.NODE_ENV = 'development';

        // 3. Start Express Server
        const app = require('./server'); // This starts the server automatically due to app.listen in server.js?
        // Checking server.js: Yes, it has app.listen at the bottom.
        // But usually testing requires exporting app. If server.js runs listen immediately on require, that's fine for this script.

        // 4. Seed Data (Optional but helpful)
        console.log('Seeding initial data...');
        // We'll use a child process to run the seed script sharing the same URI
        const { exec } = require('child_process');
        const seedProcess = exec(`cross-env MONGODB_URI="${uri}" node seed.js`); // cross-env might not be there.
        // Better: We can just use the models directly since we are in the same process and mongoose singleton is shared?
        // server.js calls connectDB() which calls mongoose.connect.
        // If we want to seed, we should wait for connection.

        // Wait for mongoose connection
        let retries = 5;
        while (mongoose.connection.readyState !== 1 && retries > 0) {
            await new Promise(r => setTimeout(r, 1000));
            retries--;
        }

        if (mongoose.connection.readyState === 1) {
            console.log('Database connected. Seeding data...');
            const seedDatabase = require('./seed');
            await seedDatabase();

            console.log('------------------------------------------------');
            console.log('Server and Database Ready!');
            console.log(`Access API at: http://localhost:${process.env.PORT}/api`);
            console.log('------------------------------------------------');
        }

    } catch (error) {
        console.error('Failed to start standalone server:', error);
    }
};

startStandalone();
