const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");
const taskController = require("../controllers/task");

router.post("/addTask", isAuth, taskController.addTask);

router.get("/getUserTasks", isAuth, taskController.getTasks);

router.post("/makeTaskCompleted", isAuth, taskController.MakeTaskCompleted);

module.exports = router;
