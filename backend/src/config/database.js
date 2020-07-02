const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: '123456',
    database: 'solar-todo-list',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    }
  },
};
