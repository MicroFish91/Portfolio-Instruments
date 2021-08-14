"use strict";
import { Model, Optional, Sequelize } from "sequelize";

export interface HoldingAttributes {
  id?: number;
  title: string;
  ticker: string;
  category: string;
  total: number;
  expenseRatio: number;
  accountId: number;
}

interface HoldingCreationAttributes extends Optional<HoldingAttributes, "id"> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Holdings
    extends Model<HoldingAttributes, HoldingCreationAttributes>
    implements HoldingAttributes
  {
    public id!: number;
    public title!: string;
    public ticker!: string;
    public category!: string;
    public total!: number;
    public expenseRatio!: number;
    public accountId!: number;

    static associate(models: any) {
      Holdings.belongsTo(models.Accounts, { foreignKey: "accountId" });
    }
  }
  Holdings.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ticker: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      expenseRatio: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Holdings",
    }
  );
  return Holdings;
};
