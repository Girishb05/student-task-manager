function TaskList({ tasks }) {
  return (
    <div>
      <h2>My Tasks</h2>

      {tasks.length === 0 && (
        <p>No tasks available.</p>
      )}

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>
            Priority: {task.priority}
          </p>

          <p>
            Due Date: {task.dueDate}
          </p>

          <p>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>

          <button>
            {task.completed ? "Mark Pending" : "Mark Complete"}
          </button>

          <button>
            Edit
          </button>

          <button>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default TaskList