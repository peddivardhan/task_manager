const Task = require("../models/Task");

async function listTasks(req, res) {
  const filter = req.query.filter || "all";
  const query = { user: req.userId };
  if (filter === "done") query.done = true;
  if (filter === "pending") query.done = false;

  const tasks = await Task.find(query).sort({ createdAt: 1 });
  res.json(tasks);
}

async function createTask(req, res) {
  const task = await Task.create({ title: req.body.title, user: req.userId });
  res.status(201).json(task);
}

async function toggleTask(req, res) {
  const task = await Task.findOne({ _id: req.params.id, user: req.userId });
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  task.done = !task.done;
  await task.save();
  res.json(task);
}

async function deleteTask(req, res) {
  const result = await Task.deleteOne({ _id: req.params.id, user: req.userId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "task not found" });
  }
  res.status(204).send();
}

module.exports = { listTasks, createTask, toggleTask, deleteTask };