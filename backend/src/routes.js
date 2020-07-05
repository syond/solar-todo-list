const routes = require("express").Router();

const authenticate = require('./middlewares/authenticate');

const SessionController = require('./controllers/SessionController');
const UserController    = require('./controllers/UserController');
const ListController    = require('./controllers/ListController');
const TaskController    = require('./controllers/TaskController');

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
routes.post('/users', User.store);
routes.patch('/users/:id', authenticate, User.update);


//ListController Routes
routes.get('/lists', authenticate, List.index);
routes.get('/lists/:id', authenticate, List.show);
routes.post('/lists', authenticate, List.store);
routes.patch('/lists/:id', authenticate, List.update);
routes.delete('/lists/:id', authenticate, List.delete);


//TaskController Routes
routes.get('/tasks', authenticate, Task.index);
routes.get('/tasks/:id', authenticate, Task.show);
routes.post('/tasks', authenticate, Task.store);
routes.patch('/tasks/:id', authenticate, Task.update);
routes.delete('/tasks/:id', authenticate, Task.delete);


module.exports = routes;
