("use strict");
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import { Model, Optional, Sequelize } from "sequelize";

export interface UserAttributes {
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
    },
    {
      tableName: "Users",
      sequelize,
    }
  );
  return Users;
};

module.exports.validate = (user: UserAttributes) => {
  const schema = Joi.object({
    email: Joi.string().email().min(8).max(45).required(),
    password: passwordComplexity({
      min: 5,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      requirementCount: 4,
    }),
    firstName: Joi.string()
      .pattern(/^[a-zA-Z]*$/)
      .min(2)
      .max(20)
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z]*$/)
      .min(2)
      .max(20)
      .required(),
  });

  return schema.validate(user);
};
