("use strict");
import { Model, Optional, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  benchmark?: string | null;
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
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(30),
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
    },
    {
      tableName: "Users",
      sequelize,
    }
  );
  return Users;
};
