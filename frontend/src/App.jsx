import { useState } from "react"
import Dashboard from "./components/Dashboard"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App() {
  const [tasks, setTasks] = useState([
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
    },
    {
      id: 3,
      title: "Practice LeetCode",
      description: "Solve 5 array problems",
      priority: "Low",
      dueDate: "2026-09-25",
      completed: false
    }
  ])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now()
    }

    setTasks([...tasks, newTask])
  }

  return (
    <div>
      <h1>Student Task Manager</h1>
      <p>Manage your daily tasks in one place.</p>

      <Dashboard />

      <TaskForm addTask={addTask} />

      <TaskList tasks={tasks} />
    </div>
  )
}

export default App