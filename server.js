app.get("/", (req, res) => {
  res.send("<h1>Task List</h1>");
});

app.get("/add", (req, res) => {
  res.send("<form method='POST' action='/tasks'>...</form>");
});


const dataModule = require("./modules/dataModule");

app.get("/tasks", (req, res) => {
  res.json(dataModule.getTasks());
});

app.post("/tasks", (req, res) => {
  res.json(dataModule.createTask(req.body.task));
});

app.put("/tasks/:id", (req, res) => {
  dataModule.updateTask(req.params.id, req.body.task);
  res.send("Updated");
});

app.delete("/tasks/:id", (req, res) => {
  dataModule.deleteTask(req.params.id);
  res.send("Deleted");
});



const express = require("express");
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});