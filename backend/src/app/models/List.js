const { Model, DataTypes } = require("sequelize");

class List extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        userId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: "List",
      }
    );
  }
}

module.exports = List;
