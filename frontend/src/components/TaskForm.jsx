import { useState } from "react"

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("Low")
  const [dueDate, setDueDate] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (title.trim() === "") {
      alert("Please enter a task title")
      return
    }

    const task = {
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      completed: false
    }

    addTask(task)

    setTitle("")
    setDescription("")
    setPriority("Low")
    setDueDate("")
  }

  return (
    <div>
      <h2>Add Task</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Task Title</label>

          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label>Due Date</label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <button type="submit">
          Add Task
        </button>
      </form>
    </div>
  )
}

export default TaskForm