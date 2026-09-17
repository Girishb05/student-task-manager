const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dns = require("dns")
require("dotenv").config()

const Task = require("./models/Task")

const app = express()

app.use(cors())
app.use(express.json())

dns.setServers(["8.8.8.8", "1.1.1.1"])

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully")
  })
  .catch((error) => {
    console.log("MongoDB connection failed")
    console.log(error.message)
  })

app.get("/", (req, res) => {
  res.json({
    message: "Student Task Manager API is running"
  })
})

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })

    res.json(tasks)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      dueDate: req.body.dueDate,
      completed: false
    })

    const savedTask = await newTask.save()

    res.status(201).json(savedTask)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found"
      })
    }

    res.json({
      message: "Task deleted successfully",
      task: deletedTask
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})