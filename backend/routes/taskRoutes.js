const express = require("express");
const taskController = require("../controllers/taskController");
const requireAuth = require("../middleware/requireAuth");
const { createTaskRules, listTaskRules, idRule, handleValidation } = require("../middleware/validators");

const router = express.Router();

router.use(requireAuth);

router.get("/", listTaskRules, handleValidation, taskController.listTasks);
router.post("/", createTaskRules, handleValidation, taskController.createTask);
router.patch("/:id/toggle", idRule, handleValidation, taskController.toggleTask);
router.delete("/:id", idRule, handleValidation, taskController.deleteTask);

module.exports = router;
