module.exports = {
  create(request, response) {
    response.json({
        message: "Hello create UserController",
      });
  },

  update(request, response) {
    response.json({
        message: "Hello update UserController",
      });
  },
};
