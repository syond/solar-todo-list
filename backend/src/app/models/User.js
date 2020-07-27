const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        password_testHash: Sequelize.VIRTUAL,
      },
      {
        sequelize,
        modelName: "User",
      }
    );

    async function hashUserPassword(user) {
      if (user.password_testHash) {
        user.password = await bcrypt.hash(user.password_testHash, 10);
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
      }
    }

    this.beforeCreate(hashUserPassword);
    this.beforeUpdate(hashUserPassword);

    return this;
  }
}

module.exports = User;
