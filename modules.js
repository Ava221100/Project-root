const fs = require("fs");

const path = "./data.json";

// Read data
function readData() {
  try {
    const data = fs.readFileSync(path, "utf8");

    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Write data
function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

// Get all tasks
exports.getTasks = () => {
  return readData();
};

// Create task
exports.createTask = (task) => {
  const data = readData();

  const newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };

  data.push(newTask);

  writeData(data);

  return newTask;
};

// Update task
exports.updateTask = (id, newTask) => {
  const data = readData();

  const index = data.findIndex(
    task => task.id == id
  );

  if (index !== -1) {
    data[index].task = newTask;

    writeData(data);

    return true;
  }

  return false;
};

// Delete task
exports.deleteTask = (id) => {
  const data = readData();

  const filteredData = data.filter(
    task => task.id != id
  );

  if (filteredData.length === data.length) {
    return false;
  }

  writeData(filteredData);

  return true;
};