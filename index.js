const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { TaskModel } = require('./database')

app.use(bodyParser.json());

app.post("/tasks", async (req, res) => {
    try {
      const task = new TaskModel(req.body);
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
});

app.get("/tasks", async (req, res) => {
    try {
      const tasks = await TaskModel.find();
      res.send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.get("/tasks/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const task = await TaskModel.findById(id);
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.send(task);
    } catch (error) {
      res.status(500).send(error);
    }
});

app.put("/tasks/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const task = await TaskModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.send(task);
    } catch (error) {
      res.status(400).send(error);
    }
});
  
app.delete("/tasks/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const task = await TaskModel.findByIdAndDelete(id);
      if (!task) {
        return res.status(404).send("Task not found");
      }
      res.send(task);
    } catch (error) {
      res.status(500).send("Task not found");
    }
});
  
app.listen(8000, () => {
    console.log('Starting the server on port 8000');
});

module.exports = app;