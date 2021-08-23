import Header from "./comps/Header";
import { useState, useEffect} from "react";
import Tasks from "./comps/Tasks";

import "./styles/resets.scss";
import "./styles/main.scss";
import AddTask from "./comps/AddTask";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    
    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('https://pintask-server.herokuapp.com/tasks')
    const data = await res.json()

    return data
  }

  // Fetch single Task
  const fetchTask = async (id) => {
    const res = await fetch(`https://pintask-server.herokuapp.com/tasks/${id}`)
    const data = await res.json()

    return data
  }
  
  // Adding Tasks
  const addTask = async (task) => {
    const res = await fetch('https://pintask-server.herokuapp.com/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }
  
  // Deleting Tasks
  const deleteTask = async (id) => {
    await fetch(`https://pintask-server.herokuapp.com/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Completed Tasks
  const toggleComplete = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, complete: !taskToToggle.complete }

    const res = await fetch(`https://pintask-server.herokuapp.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => 
      task.id === id ? {...task, complete: data.complete } : task
    ))
  }

  return (
    <div className="app">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleComplete}/> : <p className="msg">No tasks added yet.</p>}
    </div>
  );
}

export default App;
