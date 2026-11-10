const tasks = [];
let nextId = 1;

function addTask(title) {
  if (typeof title !== "string" || title.trim() === "") {
    return null;
  }
  const task = { id: nextId, title: title.trim(), done: false };
  nextId++;
  tasks.push(task);
  return task;
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return null;
  }
  task.done = !task.done;
  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return false;
  }
  tasks.splice(index, 1);
  return true;
}

function getTasks(filter = "all") {
  if (filter === "done") {
    return tasks.filter((t) => t.done);
  }
  if (filter === "pending") {
    return tasks.filter((t) => !t.done);
  }
  return [...tasks];
}

module.exports = { addTask, toggleTask, deleteTask, getTasks };