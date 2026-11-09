// Step 1: import Mongoose and our settings object
const mongoose = require("mongoose");
const env = require("./env");

// Step 2: an async function, because connecting is a network call that takes time
const connectDB = async () => {
  try {
    // Step 3: wait here until the connection succeeds or fails
    const conn = await mongoose.connect(env.mongoUri);

    // Step 4: log only the host name, never the full URI (it has your password)
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    // Step 5: show a readable message and stop the app (exit code 1 = failure)
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

// Step 6: share the function so server.js can call it
module.exports = connectDB;