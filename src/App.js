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
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Adding Tasks
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }
  
  // Deleting Tasks
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Completed Tasks
  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, complete: !task.complete } : task
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
