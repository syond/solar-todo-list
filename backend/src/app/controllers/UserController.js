const User = require("../models/User");
const { password } = require("../../config/database");

module.exports = class UserController {
  async store(request, response) {
    const { email } = request.body;

    if (await User.findOne({ where: { email } }))
      return response.status(400).send({ error: "User already registred." });

    const user = await User.create(request.body);

    response.status(200).json(user);
  }

  async update(request, response) {
    const { name, password } = request.body;

    const user = await User.findByPk(request.params.id);

    if (!user) return response.status(400).send({ error: "User not found." });

    user.name = name;
    user.password = password;

    await user.save();

    response.json(user);
  }
};
