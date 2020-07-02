const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

//TODO - Define routes 

module.exports = routes;
