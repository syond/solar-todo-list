const { Model, Sequelize } = require("sequelize");

class List extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        modelName: "List",
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: "list_id", as: "tasks" });
  }
}

module.exports = List;
