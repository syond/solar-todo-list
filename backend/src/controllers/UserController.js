const User = require("../models/User");

module.exports = {
  async store(request, response) {
    const { name, email, password } = request.body;

    try {
      if (await User.findOne({ where: { email } }))
        return response.status(400).send({ error: "User already registred." });

      const user = await User.create({ name, email, password });

      response.json(user);
    } catch (error) {
      return response.status(400).send({ error: "Registration failed." });
    }
  },

  update(request, response) {
    response.json({
      message: "Hello update UserController",
    });
  },
};
