const jwt = require("jsonwebtoken");

module.exports = function generateAccessToken({}) {
  return jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: "1d" });
};
