const Sequelize = require("sequelize");
const sequelize = require("../config/dbConnections");

module.exports = sequelize.define("User", {
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
    type: Sequelize.STRING(32),
    allowNull: false,
  },
});
