// Required to connect to dotenv
require("dotenv").config();

// Express and mongoose
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

// Connecting to MongoDB Databse
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Connecting error. Try again", err);
  });

// Middleware
app.use(express.json());

// Allows the use of arrays, objects, etc
app.use(express.urlencoded({ extended: true }));

// Routes
const animeRouter = require("./routes/anime");
app.use("/anime", animeRouter);

app.listen(PORT, () => {
  console.log("Server has started"), PORT;
});
