const taskModel = require("../models/taskModel");

function listTasks(req, res) {
  const filter = req.query.filter || "all";
  if (!["all", "done", "pending"].includes(filter)) {
    return res.status(400).json({ error: "filter must be all, done or pending" });
  }
  res.json(taskModel.getTasks(filter));
}

function createTask(req, res) {
  const { title } = req.body || {};
  const task = taskModel.addTask(title);
  if (!task) {
    return res.status(400).json({ error: "title is required" });
  }
  res.status(201).json(task);
}

function toggleTask(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }
  const task = taskModel.toggleTask(id);
  if (!task) {
    return res.status(404).json({ error: "task not found" });
  }
  res.json(task);
}

function deleteTask(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "id must be a number" });
  }
  if (!taskModel.deleteTask(id)) {
    return res.status(404).json({ error: "task not found" });
  }
  res.status(204).send();
}

module.exports = { listTasks, createTask, toggleTask, deleteTask };