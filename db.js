// const knex = require("knex");
const { Sequelize } = require("sequelize");
require("dotenv").config();
// const { Model } = require("objection");

// const sequelize = new Sequelize("hackerkernel_task", "root", null, {
//   host: "localhost",
//   dialect: "mysql",
// });
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);
console.log(sequelize, "data sequelize -----");
sequelize
  .authenticate()
  .then(() => console.log("mysql connected sequelize--"))
  .catch((err) => console.log("error with connection", err));

module.exports = sequelize;

// const connectDb = knex({
//   client: "mysql2",
//   connection: {
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hackerkernel_task",
//   },
// });

// Model.knex(connectDb);

// module.exports = connectDb;
