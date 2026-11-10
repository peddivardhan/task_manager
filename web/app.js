const API_URL = "http://localhost:3000/tasks";

const titleInput = document.getElementById("titleInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const errorMsg = document.getElementById("errorMsg");
let currentFilter = "all";

async function loadTasks() {
  const response = await fetch(`${API_URL}?filter=${currentFilter}`);
  const tasks = await response.json();
  render(tasks);
}

function render(tasks) {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = task.title;
    if (task.done) {
      label.style.textDecoration = "line-through";
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.done ? "Undo" : "Done";
    toggleBtn.addEventListener("click", async () => {
      await fetch(`${API_URL}/${task.id}/toggle`, { method: "PATCH" });
      loadTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", async () => {
      await fetch(`${API_URL}/${task.id}`, { method: "DELETE" });
      loadTasks();
    });

    li.append(label, toggleBtn, deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", async () => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: titleInput.value }),
  });
  if (!response.ok) {
    const data = await response.json();
    errorMsg.textContent = data.error;
    return;
  }
  errorMsg.textContent = "";
  titleInput.value = "";
  loadTasks();
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    loadTasks();
  });
});

loadTasks();