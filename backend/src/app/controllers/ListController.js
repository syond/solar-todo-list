const List = require("../models/List");

module.exports = class ListController {
  index(request, response) {
    response.send({
      userID: request.userId,
    });
  }

  show(request, response) {
    response.json({
      message: "Hello SHOW ListController",
    });
  }

  async store(request, response) {
    const title = request.body;
    const userId = request.userId;

    try {
      if (!title) return response.status(400).send({ error: "Invalid title" });

      const list = await List.create({ title, userId });

      console.log(title)

      response.status(200).send({ list });
    } catch (error) {
      console.log(error);
    }
  }

  update(request, response) {
    response.json({
      message: "Hello UPDATE ListController",
    });
  }

  delete(request, response) {
    response.json({
      message: "Hello DELETE ListController",
    });
  }
};
