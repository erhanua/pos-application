const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const PORT = 5000;

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DATABASE);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

app.get("/", (req, res) => res.send("Hello world"));

app.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
