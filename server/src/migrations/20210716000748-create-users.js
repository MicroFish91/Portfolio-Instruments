"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(45),
      },
      password: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING(20),
      },
      lastName: {
        type: Sequelize.STRING(20),
      },
      benchmark: {
        type: Sequelize.STRING(20),
      },
      customBenchmark: {
        type: Sequelize.JSON(),
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
      },
      rebalanceThreshold: {
        type: Sequelize.INTEGER,
      },
      vpThreshold: {
        type: Sequelize.INTEGER,
      },
      lastLoggedIn: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
