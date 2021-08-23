import Header from "./comps/Header";
import { useState } from "react";
import Tasks from "./comps/Tasks";

import "./styles/resets.scss";
import "./styles/main.scss";
import AddTask from "./comps/AddTask";

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Appointment-1',
      day: 'Feb 4th at 2:30pm',
      complete: false,
    },
    {
      id: 2,
      text: 'Appointment-2',
      day: 'Feb 6th at 2:30pm',
      complete: true,
    },
    {
      id: 3,
      text: 'Appointment-3',
      day: 'Feb 8th at 2:30pm',
      complete: false,
    }
  ]);

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
