module.exports = {
  index(request, response) {
    response.json({
      message: "Hello INDEX ListController",
    });
  },

  show(request, response) {
    response.json({
      message: "Hello SHOW ListController",
    });
  },

  create(request, response) {
    response.json({
      message: "Hello CREATE ListController",
    });
  },

  update(request, response) {
    response.json({
      message: "Hello UPDATE ListController",
    });
  },

  delete(request, response) {
    response.json({
      message: "Hello DELETE ListController",
    });
  },
};
