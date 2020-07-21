const User = require("../models/User");

module.exports = class UserController {
  async store(request, response) {
    const { email } = request.body;

    if (await User.findOne({ where: { email } }))
      return response.status(400).send({ error: "User already registred." });

    const user = await User.create(request.body);

    response.status(200).json(user);
  }

  update(request, response) {
    response.json({
      message: "Hello update UserController",
    });
  }
};
