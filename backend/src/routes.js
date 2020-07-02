const routes = require("express").Router();

const UserController = require('./controllers/UserController');
const ListController = require('./controllers/ListController');
const TaskController = require('./controllers/TaskController');


routes.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});


//UserController Routes
routes.post('/user', UserController.create);
routes.patch('/user/:id', UserController.update);


//ListController Routes
routes.get('/lists', ListController.index);
routes.get('/lists/:id', ListController.show);
routes.post('/lists', ListController.create);
routes.patch('/lists/:id', ListController.update);
routes.delete('/lists/:id', ListController.delete);


//TaskController Routes
routes.get('/tasks', TaskController.index);
routes.get('/tasks/:id', TaskController.show);
routes.post('/tasks', TaskController.create);
routes.patch('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete);


module.exports = routes;
