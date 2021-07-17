"use strict";
import { Model, Optional, Sequelize } from "sequelize";

interface AccountAttributes {
  id: number;
  location: string;
  type: string;
  total: number;
  snapshotId: number;
}

interface AccountCreationAttributes extends Optional<AccountAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Accounts
    extends Model<AccountAttributes, AccountCreationAttributes>
    implements AccountAttributes
  {
    public id!: number;
    public location!: string;
    public type!: string;
    public total!: number;
    public snapshotId!: number;

    static associate(models: any) {
      Accounts.belongsTo(models.Snapshots, { foreignKey: "snapshotId" });
      Accounts.hasMany(models.Holdings, { foreignKey: "accountId" });
    }
  }
  Accounts.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      snapshotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Accounts",
    }
  );
  return Accounts;
};
