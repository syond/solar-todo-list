const { Sequelize } = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../app/models/User");
const List = require("../app/models/List");

const connection = new Sequelize(dbConfig);

User.init(connection);
List.init(connection);

module.exports = connection;
