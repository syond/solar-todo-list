const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const bcrypt = require("bcrypt");

const User = require("../models/User");

module.exports = class SessionController {
  async login(request, response) {
    const { email, password } = request.body;

    if (!password || !email)
      return response.status(400).send({ error: "Credentials not provided" });

    const user = await User.findOne({ where: { email } });

    if (!user) return response.status(400).send({ error: "User not found" });

    if (!(await bcrypt.compare(password, user.password)))
      return response.status(401).send({ error: "Invalid password" });

    try {
      const accessToken = await jwt.sign(user.id, authConfig.secret);
      return response
        .status(200)
        .send({ sucess: "Sucess!", userId: user.id, accessToken: accessToken });
    } catch (error) {
      response.status(500).send({ error: "Something went wrong" });
    }
  }
};
