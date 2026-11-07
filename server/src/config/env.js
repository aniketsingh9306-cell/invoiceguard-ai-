const dotenv = require("dotenv");

// Read the .env file and load its values into process.env
dotenv.config();

// Variables the app cannot run without
const requiredVars = ["MONGO_URI"];

for (const name of requiredVars) {
  if (!process.env[name] || process.env[name].trim() === "") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

// One clean object that the rest of the app imports
const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
};

module.exports = env;