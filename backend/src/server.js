const express = require("express");
require('dotenv').config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3000, process.env.HOST || "localhost");
