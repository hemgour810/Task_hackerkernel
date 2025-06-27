// const { Model } = require("objection");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Joi = require("joi");

// const TaskModel = require("./TaskModel");
// const { join, from } = require("../../db");

const UserModel = sequelize.define("User", {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
});

UserModel.validateUser = (data) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    contact: Joi.string().min(10).required(),
  });
  return Schema.validate(data);
};
console.log(UserModel, "user model----");
// class UserModel extends Model {
//   static get tableName() {
//     return "users";
//   }

//   static get relationMappings() {
//     return {
//       tasks: {
//         relation: Model.HasManyRelation,
//         modelClass: Task,
//         join: {
//           from: "users.id",
//           to: "tasks.user_id",
//         },
//       },
//     };
//   }
// }

module.exports = UserModel;
