// const { Model } = require("objection");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./UserModel");

const TaskModel = sequelize.define(
  "task",
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { timestamps: true }
);

UserModel.hasMany(TaskModel, { foreignKey: "user_id" });
TaskModel.belongsTo(UserModel, { foreignKey: "user_id" });

// class TaskModel extends Model {
//   static get tableName() {
//     return "tasks";
//   }
// }

module.exports = TaskModel;
