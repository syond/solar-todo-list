const routes = require("express").Router();

const authenticate = require('./app/middlewares/authenticate');

const SessionController = require('./app/controllers/SessionController');
const UserController    = require('./app/controllers/UserController');
const ListController    = require('./app/controllers/ListController');
const TaskController    = require('./app/controllers/TaskController');

const Session = new SessionController;
const User    = new UserController;
const List    = new ListController;
const Task    = new TaskController;

routes.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});


//SessionController Routes
routes.post('/login', Session.login);


//UserController Routes
routes.post('/register', User.store);
routes.put('/users/:id', User.update);


//ListController Routes
routes.get('/lists', authenticate, List.index);
routes.get('/lists/:id', authenticate, List.show);
routes.post('/lists', authenticate, List.store);
routes.put('/lists/:id', authenticate, List.update);
routes.delete('/lists/:id', authenticate, List.delete);


//TaskController Routes
routes.get('/lists/:list_id/tasks', authenticate, Task.index);
routes.get('/lists/:list_id/tasks/:task_id', authenticate, Task.show);
routes.post('/lists/:list_id/tasks', authenticate, Task.store);
routes.put('/lists/:list_id/tasks/:task_id', authenticate, Task.update);
routes.delete('/lists/:list_id/tasks/:task_id', authenticate, Task.delete);


module.exports = routes;
