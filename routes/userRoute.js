const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
// const TaskModel = require("../models/TaskModel");
const Excel = require("../Excel");

router.get("/new", (req, res) => {
  res.render("addUser");
});

router.post("/", async (req, res) => {
  try {
    // const { error } = UserModel.validateUser(req.body);
    // if (error) {
    //   return res.status(400).send("validate error:" + error.datails[0].message);
    // }

    const { name, email, contact } = req.body;
    if (!name || !email || !contact) {
      return res.status(400).send("missing any fields please check-");
    }
    await UserModel.create({ name, email, contact });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user" + error.message);
  }
});

router.get("/export/excel", Excel.exportUserToExcel);

module.exports = router;
