const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "User",
      }
    );
  }
}

module.exports = User;
