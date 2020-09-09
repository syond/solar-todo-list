const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};
