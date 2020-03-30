const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  error => {
    if (error) console.log(`Error: ${error}`);

    console.log("Database connection successful!");
  }
);

app.listen(PORT, () => {
  console.log(`Server running smoothly on port ${PORT}`);
});
