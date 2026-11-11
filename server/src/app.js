const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const healthRoutes = require("./routes/health.routes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api", healthRoutes);
app.use(notFound);

// 6. Error handler must always be last
app.use(errorHandler);

module.exports =app;