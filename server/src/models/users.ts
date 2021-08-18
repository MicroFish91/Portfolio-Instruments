("use strict");
import { Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  benchmark?: string | null;
  confirmed: boolean;
  rebalanceThreshold: number;
  vpThreshold: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Users
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public benchmark?: string | null;
    public confirmed!: boolean;
    public rebalanceThreshold: number;
    public vpThreshold: number;

    static associate(models: any) {
      Users.hasMany(models.Snapshots, { foreignKey: "userId" });
    }
  }

  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      benchmark: {
        type: DataTypes.STRING(20),
        defaultValue: null,
        allowNull: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      rebalanceThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
        allowNull: false,
      },
      vpThreshold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      tableName: "Users",
      sequelize,
    }
  );
  return Users;
};
