import winston, { createLogger, format } from "winston";
// @ts-ignore
import WinstonTransportSequelize from "winston-transport-sequelize";
import { database } from "../config";
import { DatabaseConnection } from "../config/database";

const { combine, timestamp } = format;

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
// @ts-ignore
const config: DatabaseConnection = database[env];

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const options = {
  sequelize: sequelize, // sequelize instance [required]
  tableName: "Logs", // default name
  meta: { project: "primaryService" }, // meta object defaults
  fields: { meta: Sequelize.JSONB }, // merge model fields
  modelOptions: { timestamps: true }, // merge model options
};

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), format.json()),
  transports: [
    new winston.transports.Console({
      format: combine(format.colorize(), format.simple()),
    }),
    new winston.transports.File({ filename: "combined.log" }),
    new WinstonTransportSequelize(options),
  ],
});

export default logger;
