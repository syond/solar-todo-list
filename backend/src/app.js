require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

require("./database/connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

module.exports = app;
