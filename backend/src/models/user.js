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

    super.beforeCreate(async (user, options) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    })
  }
}




module.exports = User;
