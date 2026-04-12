const fs = require("fs");
const path = "./data.json";

function readData() {
  return JSON.parse(fs.readFileSync(path));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

exports.getTasks = () => readData();

exports.createTask = (task) => {
  const data = readData();
  const newTask = { id: Date.now(), task };
  data.push(newTask);
  writeData(data);
  return newTask;
};

exports.updateTask = (id, newTask) => {
  const data = readData();
  const index = data.findIndex(t => t.id == id);
  if (index !== -1) {
    data[index].task = newTask;
    writeData(data);
  }
};

exports.deleteTask = (id) => {
  let data = readData();
  data = data.filter(t => t.id != id);
  writeData(data);
};