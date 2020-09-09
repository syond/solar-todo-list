const Task = require("../models/Task");
const List = require("../models/List");

module.exports = class TaskController {
  async index(request, response) {
    response.json({
      message: "Hello INDEX TaskController",
    });
  }

  async show(request, response) {
    response.json({
      message: "Hello SHOW TaskController",
    });
  }

  async store(request, response) {
    const { list_id } = request.params;
    const { title } = request.body;
    const userId = request.userId;

    if (!title) return response.status(400).send({ error: "Invalid title" });
    if (!list_id) return response.status(400).send({ error: "Invalid list" });

    try {
      const listIdChecked = await List.findOne({
        where: { id: list_id, user_id: userId },
      });

      if (!listIdChecked)
        return response.status(400).send({ error: "List not found" });

      const task = await Task.create({
        title: title,
        list_id: listIdChecked.id,
      });

      return response.status(201).send(task);
    } catch (error) {
      console.log(error);
    }
  }

  async update(request, response) {
    response.json({
      message: "Hello UPDATE TaskController",
    });
  }

  async delete(request, response) {
    response.json({
      message: "Hello DELETE TaskController",
    });
  }
};
