const Task = require("../models/Task");
const List = require("../models/List");

module.exports = class TaskController {
  async index(request, response) {
    const { list_id } = request.params;
    const userId = request.userId;

    try {
      const list = await List.findOne({
        where: { id: list_id, user_id: userId },
        include: { association: "tasks" },
      });

      if (!list) return response.status(400).send({ error: "List not found" });
      if (!list.tasks.length)
        return response.status(400).send({ error: "No tasks in this list" });

      return response.status(200).send(list.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  async show(request, response) {
    const { list_id, task_id } = request.params;
    const userId = request.userId;

    try {
      const list = await List.findOne({
        where: { id: list_id, user_id: userId },
        include: { association: "tasks", where: { id: task_id } },
      });

      if (!list) return response.status(400).send({ error: "Task not found" });

      return response.status(200).send(list.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  async store(request, response) {
    const { list_id } = request.params;
    const { title } = request.body;
    const userId = request.userId;

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
    const { list_id, task_id } = request.params;
    const { title } = request.body;
    const userId = request.userId;

    try {
      const task = await Task.findOne({
        where: { id: task_id },
        include: {
          association: "list",
          where: { id: list_id, user_id: userId },
        },
      });

      if (!task) return response.status(400).send({ error: "Task not found" });

      task.title = title;

      await task.save();

      return response
        .status(200)
        .send({ success: true, message: "Task updated", task: task });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(request, response) {
    const { list_id, task_id } = request.params;
    const userId = request.userId;

    try {
      const list = await List.findOne({
        where: { id: list_id, user_id: userId },
        include: { association: "tasks", where: { id: task_id } },
      });

      if (!list.tasks.length)
        return response.status(400).send({ error: "Task not found" });

      const taskIdToDestroy = list.tasks[0].id;

      await Task.destroy({ where: { id: taskIdToDestroy } });

      return response
        .status(200)
        .send({ success: true, message: "Task deleted" });
    } catch (error) {
      console.log(error);
    }
  }
};
