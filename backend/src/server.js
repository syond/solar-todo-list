const express   = require("express");
const cors      = require('cors');
const routes    = require('./routes');
require('dotenv').config();
require('./database/connection');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3000, process.env.HOST || "localhost");
