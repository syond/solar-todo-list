const { Model, Sequelize } = require("sequelize");

class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      {
        sequelize,
        modelName: "Task",
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.List, { foreignKey: "list_id", as: "list" });
  }
}

module.exports = Task;
