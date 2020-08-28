const User = require("../models/User");

module.exports = class UserController {
  async store(request, response) {
    const { email, password, name } = request.body;

    if (!email)
      return response.status(400).send({ error: "email is required" });
    if (!password)
      return response.status(400).send({ error: "password is required" });
    if (!name) return response.status(400).send({ error: "name is required" });

    try {
      if (await User.findOne({ where: { email } }))
        return response.status(400).send({ error: "User already registred." });

      const user = await User.create(request.body);

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).send({ error: "Something went wrong." });
    }
  }

  async update(request, response) {
    const { name, password } = request.body;

    try {
      const user = await User.findByPk(request.params.id);

      if (!user) return response.status(400).send({ error: "User not found." });

      user.name = name;
      user.password = password;

      await user.save();

      return response.status(200).json(user);
    } catch (error) {
      return response.status(400).send({ error: "Something went wrong." });
    }
  }
};
