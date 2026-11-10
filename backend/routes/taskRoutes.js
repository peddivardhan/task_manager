const express = require("express");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.get("/", taskController.listTasks);
router.post("/", taskController.createTask);
router.patch("/:id/toggle", taskController.toggleTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;