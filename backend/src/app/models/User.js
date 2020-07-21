const { Model, Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_testHash: Sequelize.VIRTUAL,
        password: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "User",
      }
    );

    this.beforeCreate(async user => {
      if(user.password_testHash){
        user.password = await bcrypt.hash(user.password_testHash, 10);
      }

      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    });

    return this;
  }
}

module.exports = User;
