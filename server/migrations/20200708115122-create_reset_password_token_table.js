"use strict";

const sequelize = require("../config/dbConnections");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "reset_password_token", {
        type: Sequelize.BLOB("long"),
        allowNull: true,
      }),
      queryInterface.addColumn("users", "reset_password_expires", {
        type: Sequelize.STRING(25),
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("users", "reset_password_token"),
      queryInterface.removeColumn("users", "reset_password_expires"),
    ]);
  },
};
