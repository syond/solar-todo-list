const jwt           = require("jsonwebtoken");
const authConfig    = require("../config/auth.json");

module.exports = class SessionController {
  index(request, response) {
    const user = request.body;

    response.json(user);
  }
};
