const { Model } = require("sequelize");
const constants = require("../constants");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("initiated", "pending", "successful", "declined"),
        allowNull: false,
        defaultValue: "initiated",
      },
      gateway: {
        type: DataTypes.ENUM(...constants.PAYMENT_GATEWAYS),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "transaction",
      tableName: "transactions",
      timestamps: true,
      paranoid: true,
    }
  );
  return transaction;
};
