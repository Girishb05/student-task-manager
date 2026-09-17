const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const tasks = [
  {
    id: 1,
    title: "Practice Java",
    description: "Learn Java concepts",
    priority: "High",
    dueDate: "2026-09-22",
    completed: false
  },
  {
    id: 2,
    title: "Complete Assignment",
    description: "Finish web development assignment",
    priority: "Medium",
    dueDate: "2026-09-24",
    completed: true
  }
]

app.get("/", (req, res) => {
  res.json({
    message: "Student Task Manager API is running"
  })
})

app.get("/api/tasks", (req, res) => {
  res.json(tasks)
})

app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    dueDate: req.body.dueDate,
    completed: false
  }

  tasks.push(newTask)

  res.status(201).json(newTask)
})

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id)

  const task = tasks.find((task) => task.id === id)

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  task.title = req.body.title ?? task.title
  task.description = req.body.description ?? task.description
  task.priority = req.body.priority ?? task.priority
  task.dueDate = req.body.dueDate ?? task.dueDate
  task.completed = req.body.completed ?? task.completed

  res.json(task)
})

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id)

  const taskIndex = tasks.findIndex((task) => task.id === id)

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found"
    })
  }

  const deletedTask = tasks.splice(taskIndex, 1)

  res.json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})