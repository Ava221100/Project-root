const express = require("express");
const app = express();

const dataModule = require("./modules");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home Page
app.get("/", (req, res) => {
  const tasks = dataModule.getTasks();

  let html = `
    <h1>Task List</h1>

    <form method="POST" action="/tasks">
      <input type="text" name="task" placeholder="Enter task" required>
      <button type="submit">Add Task</button>
    </form>

    <hr>
  `;

  tasks.forEach(task => {
    html += `
      <div>
        <p>
          <strong>${task.task}</strong>
          - Completed: ${task.completed}
        </p>
      </div>
    `;
  });

  res.send(html);
});

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(dataModule.getTasks());
});

// Create task
app.post("/tasks", (req, res) => {
  const task = req.body.task;

  if (!task) {
    return res.status(400).send("Task is required");
  }

  const newTask = dataModule.createTask(task);

  res.redirect("/");
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const updated = dataModule.updateTask(
    req.params.id,
    req.body.task
  );

  if (!updated) {
    return res.status(404).send("Task not found");
  }

  res.send("Task updated");
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const deleted = dataModule.deleteTask(req.params.id);

  if (!deleted) {
    return res.status(404).send("Task not found");
  }

  res.send("Task deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});