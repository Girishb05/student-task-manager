const mongoose = require("mongoose")
const dns = require("dns")
const Task = require("./models/Task")
require("dotenv").config()

dns.setServers(["8.8.8.8", "1.1.1.1"])

const createTask = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("MongoDB connected successfully")

    const task = new Task({
      title: "Practice MongoDB",
      description: "Learn MongoDB with Mongoose",
      priority: "High",
      dueDate: "2026-09-25",
      completed: false
    })

    const savedTask = await task.save()

    console.log("Task saved successfully")
    console.log(savedTask)

    await mongoose.connection.close()
  } catch (error) {
    console.log("Error:", error.message)
  }
}

createTask()