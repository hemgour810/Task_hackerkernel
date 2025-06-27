const ExcelJs = require("exceljs");
const UserModel = require("./models/UserModel");
const TaskModel = require("./models/TaskModel");
const path = require("path");
const fs = require("fs");

const exportUsersToExcel = async (req, res) => {
  try {
    const users = await UserModel.findAll({ include: TaskModel });
    const workbook = new ExcelJs.workbook();
    const worksheet = workbook.addWorksheet("Users & Task");

    worksheet.colums = [
      { Headers: "user ID", key: "userid", width: 10 },
      { Headers: "Name", key: "name", width: 25 },
      { Headers: "Email", key: "email", width: 30 },
      { Headers: "Contact", key: "contact", width: 30 },
      { Headers: "task title", key: "taskTitle", width: 35 },
      { Headers: "task description", key: "taskdescription", width: 40 },
    ];

    users.forEach((user) => {
      if (user.Tasks && user.Tasks.length > 0) {
        user.Tasks.forEach((task) => {
          worksheet.addRow({
            userid: user.id,
            name: user.name,
            email: user.email,
            taskTitle: task.title,
            taskDesc: task.description,
          });
        });
      } else {
        worksheet.addRow({
          userid: user.id,
          name: user.name,
          email: user.email,
          taskTitle: "",
          taskDesc: "",
        });
      }
    });
    const exportDir = path.join(__dirname, "exports");
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    const filePath = path.json(exportDir, "user-tasks.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, "user-tasks.xlsx");
  } catch (error) {
    console.error("excel export erro ", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { exportUserToExcel: exportUsersToExcel };
