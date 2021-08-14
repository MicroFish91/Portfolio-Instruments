"use strict";
import { Model, Optional, Sequelize } from "sequelize";

export interface AccountAttributes {
  id?: number;
  location: string;
  type: string;
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
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(15),
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
