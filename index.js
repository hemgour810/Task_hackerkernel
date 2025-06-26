const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const { model } = require("objection");
const hbs = require("express-handlebars");

const app = express();
const PORT = 8000;

const sequelize = require("./src/config/db");

require("./src/models/UserModel");
require("./src/models/TaskModel");

const userRoute = require("./src/routes/userRoute");
const taskRoute = require("./src/routes/taskRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", userRoute);
app.use("/tasks", taskRoute);

app.get("/", async (req, res) => {
  const { userRoute } = require("./src/models/UserModel");
  const { TaskModel } = require("./src/models/TaskModel");

  const users = await userRoute.findAll({ include: TaskModel });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
