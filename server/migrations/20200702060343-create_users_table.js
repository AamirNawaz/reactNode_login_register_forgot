"use strict";

const sequelize = require("../config/dbConnections");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
