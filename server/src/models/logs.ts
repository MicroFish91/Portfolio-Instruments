"use strict";
import { Model, Optional, Sequelize } from "sequelize";

export interface LogAttributes {
  id?: number;
  level: string;
  message: JSON;
  meta: JSON;
}

interface LogCreationAttributes extends Optional<LogAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Logs
    extends Model<LogAttributes, LogCreationAttributes>
    implements LogAttributes
  {
    public id!: number;
    public level!: string;
    public message!: JSON;
    public meta!: JSON;

    static associate(_models: any) {}
  }
  Logs.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      level: {
        type: DataTypes.STRING(),
        allowNull: false,
      },
      message: {
        type: DataTypes.JSON(),
        allowNull: false,
      },
      meta: {
        type: DataTypes.JSON(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Logs",
    }
  );
  return Logs;
};
