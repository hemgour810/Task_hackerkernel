const express = require("express");
const router = express.Router();
const TaskModel = require("../models/TaskModel");

router.get("new", (req, res) => {
  res.render("addTask");
});

router.post("/", async (req, res) => {
  try {
    const { title, description, user_id } = req.body;
    await TaskModel.create({ title, description, user_id });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating task" + error.message);
  }
});

module.exports = router;
