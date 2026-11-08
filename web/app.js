const titleInput = document.getElementById("titleInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
let currentFilter = "all";

function render() {
  taskList.innerHTML = "";
  getTasks(currentFilter).forEach((task) => {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = task.title;
    if (task.done) {
      label.style.textDecoration = "line-through";
    }

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.done ? "Undo" : "Done";
    toggleBtn.addEventListener("click", () => {
      toggleTask(task.id);
      render();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
      render();
    });

    li.append(label, toggleBtn, deleteBtn);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  addTask(titleInput.value);
  titleInput.value = "";
  render();
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();