module.exports = class TaskController {
  index(request, response) {
    response.json({
      message: "Hello INDEX TaskController",
    });
  }

  show(request, response) {
    response.json({
      message: "Hello SHOW TaskController",
    });
  }

  store(request, response) {
    response.json({
      message: "Hello CREATE TaskController",
    });
  }

  update(request, response) {
    response.json({
      message: "Hello UPDATE TaskController",
    });
  }

  delete(request, response) {
    response.json({
      message: "Hello DELETE TaskController",
    });
  }
};
