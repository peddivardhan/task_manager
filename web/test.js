const { addTask, toggleTask, deleteTask, getTasks } = require("./tasks");

addTask("learn JavaScript");
addTask("build task manager");
addTask("   ");
toggleTask(1);

console.log(getTasks());
console.log(getTasks("done"));
console.log(getTasks("pending"));

deleteTask(2);
console.log(getTasks());
console.log(toggleTask(99));