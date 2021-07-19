"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Holdings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(50),
      },
      ticker: {
        type: Sequelize.STRING(10),
      },
      category: {
        type: Sequelize.STRING(20),
      },
      total: {
        type: Sequelize.DECIMAL,
      },
      expenseRatio: {
        type: Sequelize.DECIMAL,
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
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
    await queryInterface.dropTable("Holdings");
  },
};
