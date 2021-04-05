// Required to connect to dotenv
require("dotenv").config();

// Express and mongoose
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

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

// const db = mongoose.connection

// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to Database'))

// app.use(express.json())

// const animeRouter = require('./routes/anime')
// app.use('/anime', animeRouter)

app.listen(PORT, () => {
  console.log("Server has started"), PORT;
});
