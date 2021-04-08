// Required to connect to dotenv
// require("dotenv").config();

// Express and mongoose
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const winston = require("winston");

// Create custom logger to keep track of error and exception logs
const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exception.log" }),
  ],
});

// Connecting to MongoDB Databse
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    logger.error(err.message);
  });

// Middleware
app.use(express.json());

// Allows the use of arrays, objects, etc
app.use(express.urlencoded({ extended: true }));

// Routes
const animeRouter = require("./routes/anime");
app.use("api/anime", animeRouter);

// Start server
app.listen(PORT, () => {
  logger.info(`Server has started at PORT ${PORT}`);
});
