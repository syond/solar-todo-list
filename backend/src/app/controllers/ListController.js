const List = require("../models/List");

module.exports = class ListController {
  async index(request, response) {
    const userId = request.userId;

    if (!userId) return response.status(400).send({ error: "Invalid ID" });

    try {
      const lists = await List.findAll({ where: { user_id: userId } });

      return response.status(200).send(lists);
    } catch (error) {
      console.log(error);
    }
  }

  async show(request, response) {
    const listId = request.params.id;
    const userId = request.userId;

    try {
      const list = await List.findOne({ where: { id: listId, user_id: userId } });

      if (!list) return response.status(400).send({ error: "List not found" });

      return response.status(200).send(list);
    } catch (error) {
      console.log(error);
    }
  }

  async store(request, response) {
    const { title } = request.body;
    const userId = request.userId;

    if (!title) return response.status(400).send({ error: "Invalid title" });

    try {
      const list = await List.create({ title: title, user_id: userId });

      return response.status(201).send(list);
    } catch (error) {
      console.log(error);
    }
  }

  async update(request, response) {
    const listId = request.params.id;
    const { title } = request.body;
    const userId = request.userId;

    try {
      const list = await List.findOne({ where: { id: listId, user_id: userId } });

      if (!list) return response.status(400).send({ error: "List not found" });

      list.title = title;

      await list.save();

      return response.status(200).send(list);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(request, response) {
    const listId = request.params.id;
    const userId = request.userId;

    try {
      const list = await List.destroy({ where: { id: listId, user_id: userId } });

      if (!list) return response.status(400).send({ error: "List not found" });

      return response
        .status(200)
        .send({ success: true, message: "List deleted" });
    } catch (error) {
      console.log(error);
    }
  }
};
