const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Transaction = sequelize.define(
  "Transaction",
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
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Transaction;
