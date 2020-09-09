const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const List = require("../app/models/List");
const Task = require("../app/models/Task");

const connection = new Sequelize(dbConfig);

User.init(connection);
List.init(connection);
Task.init(connection);

Task.associate(connection.models);

module.exports = connection;
