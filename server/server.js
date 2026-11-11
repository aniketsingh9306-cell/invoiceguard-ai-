const app = require("./src/app");
const connectDB = require("./src/config/db");
const env = require("./src/config/env");

const startServer = async () => {
    await connectDB();

    app.listen(env.port, () => {
        console.log(`server running on port ${env.port} in ${env.nodeEnv} mode`)
    });
}
startServer();