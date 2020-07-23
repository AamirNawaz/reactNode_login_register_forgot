const Sequelize = require("sequelize");

const sequelize = new Sequelize("node_react_dashboard", "root", "", {
  host: "localhost",
  dialect: "mysql",
  operatorsAliases: 0,
});

module.exports = sequelize;
global.sequelize = sequelize;
